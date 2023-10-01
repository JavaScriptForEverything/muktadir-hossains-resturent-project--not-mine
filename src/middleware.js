import { NextResponse } from "next/server";
import verifyJWT from "./utilities/verifyJWT";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protected Path Array::
  const protectedPaths = [
    "/dashboard",
    "/dashboard/category",
    "/dashboard/menu-items",
    "/api/reports/all",
    "/dashboard/settings",
  ];
  const isProtectedPath = protectedPaths.includes(path);

  // =========== Public Paths =================
  // Public Path Array
  const publicPaths = ["/login", "/sign-up"];
  const isPublicPath = publicPaths.includes(path);
  // =========== Public Paths =================

  try {
    const token =
      request.cookies.get(process.env.LOGIN_COOKIE_NAME)?.value || "";
    const verifiedToken = await verifyJWT(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    // Check if the path is protected or not ::
    if (isPublicPath && verifiedToken) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    // Check if the user is authenticated Already::
    if (isProtectedPath && !verifiedToken) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {
    console.log(error);
  }
}

// See "Matching Paths" below to Apply Logic::
export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/dashboard",
    "/dashboard/category",
    "/dashboard/menu-items",
    "/dashboard/settings",
    "/api/reports/all",
  ],
};
