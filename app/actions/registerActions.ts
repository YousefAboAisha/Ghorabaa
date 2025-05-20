"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import { Session } from "next-auth";

export const loginAction = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    return { user: session.user };
  } else {
    throw new Error("Authentication failed");
  }
};

export const logoutAction = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return { message: "Logged out successfully" };
  } else {
    throw new Error("Logout failed");
  }
};

export async function getSessionAction(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  if (session) {
    return session;
  } else {
    return null;
  }
}
