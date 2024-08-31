import React, { useState } from "react";
import Section from "./Section";

export default function Navbar() {
  const navigations: Navigation[] = [];

  return (
    <header className="w-full absolute shadow-sm shadow-gray-500 top-0">
      <Section>
        <section className="w-full flex flex-row justify-between items-center p-5 shadow-sm ">
          <div>
            <a
              href={"/"}
              className="text-2xl font-serif font-bold"
            >
              TodoList
            </a>
          </div>

          <div className="flex flex-row gap-5">
            {navigations.map((navigation: Navigation, index) => {
              return (
                <a
                  href={navigation.redirect}
                  key={index}
                  className={
                    "relative underline-props hover:underline-transition font-semibold after:bg-SECONDARY_LIGHT after:-bottom-[1.5px]  "
                  }
                >
                  {navigation.name}
                </a>
              );
            })}
          </div>
        </section>
      </Section>
    </header>
  );
}
