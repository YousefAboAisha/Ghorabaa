import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
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

  // Authenticated user visiting an auth page — redirect based on role
  if (isAuthPage || pathname === "/") {
    const redirectUrl =
      token.role === Role.ADMIN ? "/admin/dashboard" : "/profile";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Authenticated but not admin trying to access admin route
  if (isAdminRoute && token.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Add root route for role-based redirection
    "/profile/:path*",
    "/addStory/:path*",
    "/savedStories",
    "/auth/:path*",
    "/notifications",
    "/signin",
    "/signup",
    "/admin/:path*",
  ],
};
