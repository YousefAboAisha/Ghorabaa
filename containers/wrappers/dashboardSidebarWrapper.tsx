"use client";
import DashboardHeader from "@/components/layout/dashboardHeader";
import { SessionProvider } from "next-auth/react";

export default function DashboardSidebarWrapper() {
  return (
    <SessionProvider>
      <DashboardHeader />
    </SessionProvider>
  );
}
