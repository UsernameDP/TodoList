import UserSchema from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  const { username, password } = data;

  if (!username || !password)
    return new Response(
      JSON.stringify({
        message: "Both username and password are required!"
      }),
      { status: 400 }
    );

  const salt = 10;
  try {
    const newUser = await UserSchema.create({
      username: username,
      password: await bcrypt.hash(password, salt)
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "There is already someone with that username"
      }),
      {
        status: 400
      }
    );
  }

  return Response.json("success", { status: 200 });
}
