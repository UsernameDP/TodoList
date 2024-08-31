import Image from "next/image";
import dbConnect from "@/lib/dbConnect";

export default async function Home() {
  await dbConnect();
  return <main className="w-full h-full "></main>;
}
