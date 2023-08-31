import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import verifyJWT from "./utilities/verifyJWT";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isProtectedPath =
    path === "/dashboard" ||
    path === "/dashboard/category" ||
    path === "/dashboard/menu-items" ||
    path === "/dashboard/settings";

    
  const isPublicPath = path === "/login" || path === "/sign-up";

  try {
    const token =
      request.cookies.get(process.env.LOGIN_COOKIE_NAME)?.value || "";
    const verifiedToken = await verifyJWT(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    // console.log("Middleware::",verifiedToken)
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

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/dashboard",
    "/dashboard/category",
    "/dashboard/menu-items",
    "/dashboard/settings",
  ],
};
