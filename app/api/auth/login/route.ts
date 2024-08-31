import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserSchema from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
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

  const refreshToken = await jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const updateStatus = await UserSchema.updateOne(
    { username: foundUser.username },
    { refreshToken: refreshToken }
  );

  if (!updateStatus)
    return new Response(
      JSON.stringify({
        message: "Refresh token not updated"
      }),
      { status: 400 }
    );

  //Give the user a cookie
  cookies().set("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 10 * 1000
  });
  return new Response(
    JSON.stringify({
      message: "success"
    }),
    { status: 200 }
  );
}
