"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";

export default function NavbarWrapper() {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
}
