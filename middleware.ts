import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "./app/enums";

const ADMIN_PATH = "/admin";
const RESTRICTED_EDITOR_PATHS = [
  "/admin/dashboard/users", // Block this specific route for EDITORS
  // Add more restricted paths if needed
];
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware token:", token); // Add this for debugging

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth") ||
    pathname === "/signin" ||
    pathname === "/signup";

  const isUserPage =
    pathname.startsWith("/profile") ||
    pathname === "/savedStories" ||
    pathname === "/addStory";

  const isAdminPage = pathname.startsWith(ADMIN_PATH);

  // User not authenticated
  if (!token) {
    if (isUserPage || isAdminPage) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // Block EDITORS from restricted paths
  if (
    RESTRICTED_EDITOR_PATHS.some((path) => pathname.startsWith(path)) &&
    token.role === Role.EDITOR
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Authenticated user visiting an auth page — redirect based on role
  if (isAuthPage) {
    const redirectUrl =
      token.role === Role.ADMIN || token.role === Role.EDITOR
        ? "/admin/dashboard"
        : `/profile/${token.id}`;

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Handle auth-redirect route
  if (pathname === "/auth-redirect") {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const redirectUrl =
      token.role === Role.ADMIN || token.role === Role.EDITOR
        ? "/admin/dashboard"
        : `/profile/${token.id}`;

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Authenticated but not admin or editor trying to access admin route
  if (isAdminPage && token.role !== Role.ADMIN && token.role !== Role.EDITOR) {
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
    "/auth-redirect", // 👈 Add this line
  ],
};
