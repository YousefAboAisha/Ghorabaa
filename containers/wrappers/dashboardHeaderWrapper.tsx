"use client";
import DashboardSidebar from "@/components/layout/dashboardSidebar";
import { SessionProvider } from "next-auth/react";

export default function NavbarWrapper() {
  return (
    <SessionProvider>
      <DashboardSidebar />
    </SessionProvider>
  );
}
