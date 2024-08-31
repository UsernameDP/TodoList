import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full h-full">{children}</main>
    </>
  );
}
