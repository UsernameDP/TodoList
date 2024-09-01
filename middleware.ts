import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "./lib/dbConnect";
import { getREFRESH_TOKEN_SECRET, verifyJWT } from "./lib/auth";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  if (request.nextUrl.pathname === "/") {
    //Other than the neccesary routes for authentication, you must be redirected to /login

    if (!cookieStore.has("jwt"))
      return NextResponse.redirect(new URL("/login", request.url));
  }
}
