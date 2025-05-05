import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = [
  "/",
  "/categories",
  "/categories/dairy",
  "/categories/meat",
  "/categories/qurbani",
  "/signup",
  "/login",
  "/privacy",
  "/terms",
  "/contactus",
  "/about",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow image and static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/fonts/") ||
    /\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (
    publicPaths.some((path) => pathname === path || pathname.startsWith("/api/auth/"))
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret")
    );
    return NextResponse.next();
  } catch {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    url.searchParams.set("error", "session_expired");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static/|_next/image/|favicon.ico|images/|icons/|fonts/).*)",
  ],
};
