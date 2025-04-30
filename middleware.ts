import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

// Define protected routes
const protectedRoutes = ["/edit", "/profile", "/complete-profile"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Get the session cookie
  const cookie = (await cookies()).get("session")?.value;
  let session;

  try {
    // Decrypt the session
    session = await decrypt(cookie);
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    // If session decryption fails, treat it as no session
    session = null;
  }

  // Redirect logic for protected routes
  if (isProtectedRoute && !session?.userId) {
    // Redirect to the sign-in page if the user is not authenticated
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // Redirect logic for authenticated users
  if (session?.userId) {
    if (path === "/signin" || path === "/signup") {
      // Redirect authenticated users away from sign-in/sign-up pages
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
