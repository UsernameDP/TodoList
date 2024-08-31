"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "next/";
import { register } from "module";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  // Make sure the component name is capitalized
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: User = {
      username: username,
      password: password
    };
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      const errorData = await response.json();
      setMessage(errorData.message);
    } else {
      setMessage("success");
      router.push("/login");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="  bg-zinc-800 rounded-md p-10 flex flex-col gap-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className=" justify-center text-4xl font-bold flex">Register</h1>

        <section className="flex flex-col gap-3">
          <input
            name="username"
            type="text"
            placeholder="Enter Username"
            className="placeholder:opacity-90 px-2 py-3 outline-0 rounded-md  transition-all duration-300 bg-zinc-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="text"
            placeholder="Enter Password"
            className="placeholder:opacity-90 px-2 py-3 outline-0 rounded-md  transition-all duration-300 bg-zinc-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        <button
          className="bg-zinc-700 text-white rounded-md py-2"
          type="submit"
        >
          Login
        </button>

        {message && (
          <h3
            className={`text-sm text-center ${
              message === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </h3>
        )}

        <h3 className="text-xs text-center hover:scale-105 transition-all duration-150 ">
          <a href="/login">Login Here</a>
        </h3>
      </form>
    </div>
  );
};

export default Page; // Ensure the export matches the capitalized component name
