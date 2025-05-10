import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      try {
        const client = await clientPromise;
        const db = client.db("ghorabaa");
        const usersCollection = db.collection("users");

        console.log("User data:", user);
        console.log("Account data:", account);

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
    async jwt({ token }) {
      const client = await clientPromise;
      const db = client.db("ghorabaa");
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({
        email: token.email,
      });

      if (existingUser) {
        token.id = existingUser._id.toString();
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.image = existingUser.image;
        token.role = existingUser.role;
        token.createdAt = existingUser.createdAt?.toISOString?.() ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.profile_image as string;
        session.user.role = token.role as Role;
        session.user.createdAt = token.createdAt as string;
      }
      return session;
    },
  },
};
