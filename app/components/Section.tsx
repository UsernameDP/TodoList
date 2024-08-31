import React from "react";

export default function Section({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative flex flex-col w-11/12 mx-auto max-w-7xl gap-5">
      {children}
    </section>
  );
}
