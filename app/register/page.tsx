import React from "react";
import Form from "next/";

const Page = () => {
  // Make sure the component name is capitalized
  const handleSubmit = async (formData: FormData) => {
    "use server";
    //Do authentication here
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="bg-white rounded-md p-10 flex flex-col gap-10 text-black"
        action={handleSubmit}
      >
        <h1 className=" justify-center text-4xl font-bold flex">Register</h1>

        <section className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter Username"
            className="placeholder:opacity-90 px-2 py-3 outline-0 rounded-md border-b-2 focus:shadow-lg transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Enter Password"
            className="placeholder:opacity-90 px-2 py-3 outline-0 rounded-md border-b-2 focus:shadow-lg transition-all duration-300"
          />
        </section>

        <button
          className="bg-black text-white rounded-md py-2"
          type="submit"
        >
          Register
        </button>

        <h3 className="text-xs text-center hover:scale-105 transition-all duration-150 ">
          <a href="/login">Login Here</a>
        </h3>
      </form>
    </div>
  );
};

export default Page; // Ensure the export matches the capitalized component name