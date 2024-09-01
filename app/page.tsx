"use client";

import Image from "next/image";
import dbConnect from "@/lib/dbConnect";

export default function Home() {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    fetch("/api/auth/token", { method: "POST" })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <main className="w-full h-full pt-32">
      {" "}
      <button onClick={onClick}>click me</button>{" "}
    </main>
  );
}
