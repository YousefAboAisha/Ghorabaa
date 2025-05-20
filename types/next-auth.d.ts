import { Role } from "@/app/enums";
// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: Role;
      createdAt: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    createdAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: Role;
    createdAt?: string;
  }
}
