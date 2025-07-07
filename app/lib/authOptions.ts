import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("ghorabaa");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("البريد الإلكتروني غير مسجل");
        }

        if (!user.password) {
          throw new Error("يرجى تسجيل الدخول باستخدام Google");
        }

        if (!user.isVerified) {
          throw new Error("يرجى التحقق من الرمز المُرسل لبريدك الالكتروني!");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) {
          throw new Error("كلمة المرور غير صحيحة");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          provider: user.provider,
          createdAt: user.createdAt?.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log("SIGNIN CALLBACK TRIGGERED");
      console.log({ user, account });

      try {
        const client = await clientPromise;
        const db = client.db("ghorabaa");
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          const isGoogle = account?.provider === "google";

          const newUser = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
            role: Role.USER,
            isVerified: isGoogle ? true : false, // ✅ This line ensures Google users are verified
            favorites: [],
            createdAt: new Date(),
          };

          await usersCollection.insertOne(newUser);
          console.log("New user created:", newUser);
        }

        return true;
      } catch (error) {
        console.error("MongoDB user insertion error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      const client = await clientPromise;
      const db = client.db("ghorabaa");
      const usersCollection = db.collection("users");

      // First login (Google or Credentials)
      if (user) {
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        token.id = existingUser?._id.toString(); // ✅ use MongoDB _id here
        token.name = existingUser?.name;
        token.email = existingUser?.email;
        token.image = existingUser?.image;
        token.role = existingUser?.role || Role.USER;
        token.createdAt =
          existingUser?.createdAt?.toISOString() ?? new Date().toISOString();
        token.accessToken = account?.access_token;

        return token;
      }

      // Subsequent requests (from stored token)
      const existingUser = await usersCollection.findOne({
        email: token.email,
      });

      return {
        ...token,
        id: existingUser?._id?.toString(),
        name: existingUser?.name,
        email: existingUser?.email,
        image: existingUser?.image,
        role: existingUser?.role || Role.USER,
        createdAt: existingUser?.createdAt?.toISOString() ?? null,
        accessToken: token.accessToken,
      };
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role as Role;
        session.user.createdAt = token.createdAt as string;
      }

      // ✅ Safely append access token
      session.accessToken = token.accessToken;

      return session;
    },
  },
};
