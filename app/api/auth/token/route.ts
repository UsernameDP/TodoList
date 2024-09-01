import UserSchema from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { generateAccessToken, getREFRESH_TOKEN_SECRET } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("jwt")?.value;
  if (!refreshToken) {
    return new Response(
      JSON.stringify({ message: "You do not have a jwt refreshtoken" }),
      { status: 400 }
    );
  }

  try {
    const results = jwt.verify(refreshToken, getREFRESH_TOKEN_SECRET());

    const { username } = results as User; //decoded username
    const foundUser = await UserSchema.findOne({ username: username });

    if (username !== foundUser.username)
      return new Response(JSON.stringify({ message: "JWt Token is invalid" }), {
        status: 400
      });

    const accessToken = generateAccessToken(foundUser);
    return new Response(JSON.stringify({ accessToken: accessToken }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "JWt Token is invalid" }), {
      status: 400
    });
  }
}
