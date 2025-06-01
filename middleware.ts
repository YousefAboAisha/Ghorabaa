import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; // Requires next-auth >=4.10.0
import { Role } from "./app/enums";

const ADMIN_PATH = "/admin";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth") ||
    pathname === "/signin" ||
    pathname === "/signup";

  const isAdminRoute = pathname.startsWith(ADMIN_PATH);

  // User not authenticated
  if (!token) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // Authenticated user on auth pages
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Authenticated but not admin trying to access admin route
  if (isAdminRoute && token.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/unauthorized", request.url)); // You can customize this page
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/addStory/:path*",
    "/savedStories",
    "/auth/:path*",
    "/notifications",
    "/signin",
    "/signup",
    "/admin/:path*", // Add admin path
  ],
};
