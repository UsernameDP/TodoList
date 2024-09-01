import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserSchema from "@/models/User";
import dbConnect from "./dbConnect";

export const getREFRESH_TOKEN_SECRET = () => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error(
      "Please define the REFRESH_TOKEN_SECRET environment variable inside .env.local"
    );
  }
  return REFRESH_TOKEN_SECRET;
};
export const getACCESS_TOKEN_SECRET = () => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  if (!ACCESS_TOKEN_SECRET)
    throw new Error(
      "Please define the ACCESS_TOKEN_SECRET environment variable inside .env.local"
    );
  return ACCESS_TOKEN_SECRET;
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign({ username: user.username }, getREFRESH_TOKEN_SECRET(), {
    expiresIn: "1d"
  });
};
export const generateAccessToken = (user: User) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  if (!ACCESS_TOKEN_SECRET)
    throw new Error(
      "Please define the ACCESS_TOKEN_SECRET environment variable inside .env.local"
    );

  return jwt.sign({ username: user.username }, getACCESS_TOKEN_SECRET(), {
    expiresIn: "15s"
  });
};

export const verifyJWT = async (refreshToken: string) => {
  return jwt.verify(refreshToken, getREFRESH_TOKEN_SECRET());
};
