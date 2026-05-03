import React from "react";
import { Footer, Header } from "@/components/home";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className=" min-h-[calc(100vh-84px-680px)] mx-auto ">
        {children}
      </main>

      <Footer />
    </>
  );
}
