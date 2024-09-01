import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserSchema from "@/models/User";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(request: Request) {
  //Logging in should give you a refresh token (cookie) and access token (json)
  await dbConnect();
  const cookieStore = cookies();
  const data = await request.json();
  const { username, password } = data;
  if (!username || !password)
    return new Response(
      JSON.stringify({
        message: "Both username and password are required!"
      }),
      { status: 400 }
    );

  const foundUser = await UserSchema.findOne({ username: username });
  if (!foundUser)
    return new Response(
      JSON.stringify({
        message: "User not found"
      }),
      { status: 400 }
    );
  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch)
    return new Response(
      JSON.stringify({
        message: "Password is invalid"
      }),
      { status: 400 }
    );

  const refreshToken = generateRefreshToken(foundUser);
  //Give the user a cookie
  cookieStore.set("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  const accessToken = generateAccessToken(foundUser);

  return new Response(JSON.stringify({ accessToken: accessToken }), {
    status: 200
  });
}
