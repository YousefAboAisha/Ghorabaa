import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const token =
  //   request.cookies.get("next-auth.session-token")?.value ||
  //   request.cookies.get("__Secure-next-auth.session-token")?.value;

  // const isAuthPage =
  //   request.nextUrl.pathname.startsWith("/auth") ||
  //   request.nextUrl.pathname === "/signin" ||
  //   request.nextUrl.pathname === "/signup";

  // if (!token && !isAuthPage) {
  //   // Not logged in, trying to access protected route
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // if (token && isAuthPage) {
  //   // Already logged in, trying to access login/register
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/addStory/:path*",
    "/editProfile/:path*",
    "/savedStories",
    "/auth/:path*",
    "/signin",
    "/signup",
  ],
};
