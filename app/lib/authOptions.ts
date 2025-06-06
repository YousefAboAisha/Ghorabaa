import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";

export const authOptions: AuthOptions = {
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
  ],

  secret: process.env.NEXTAUTH_SECRET,

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

    async jwt({ token, account }) {
      const client = await clientPromise;
      const db = client.db("ghorabaa");
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({
        email: token.email,
      });

      return {
        ...token, // 👈 preserve all default fields

        // ✅ only add/override your custom values
        id: existingUser?._id?.toString(),
        name: existingUser?.name,
        email: existingUser?.email,
        image: existingUser?.image,
        role: existingUser?.role || Role.USER,
        createdAt: existingUser?.createdAt?.toISOString?.() ?? null,

        // ✅ keep access token from OAuth provider
        accessToken: account?.access_token ?? token.accessToken,
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
