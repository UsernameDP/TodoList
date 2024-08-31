import UserSchema from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  await dbConnect();

  const data = await request.json();

  try {
    const newUser = await UserSchema.create({
      username: data.username,
      password: data.password
    });

    cookieStore.set("good", "true");
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
