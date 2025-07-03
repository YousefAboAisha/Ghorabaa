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
          const newUser = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
            role: Role.USER,
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
      // On first login (Google or Credentials)
      if (user) {
        token.id = user.id;
        token.name = user.name ?? undefined;
        token.email = user.email ?? undefined;
        token.image = user.image ?? undefined;
        token.role = user.role || Role.USER;
        token.createdAt = user.createdAt ?? new Date().toISOString();
        token.accessToken = account?.access_token; // only for Google
        return token;
      }

      // On subsequent requests
      const client = await clientPromise;
      const db = client.db("ghorabaa");
      const usersCollection = db.collection("users");

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
