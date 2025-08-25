"use client";
import Link from "next/link";
import Logo from "../UI/logo";
import AdminProfileMenu from "../UI/menues/adminProfileMenu";
import Hamburger from "hamburger-react";
import { useState } from "react";
import Sidebar from "./sidebar";
import { DashboardRoutes } from "@/data/dashboardRoutes";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const DashboardHeader = ({ session }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 border-b border-r h-[70px] block md:hidden">
      <div className="flex items-center justify-between px-8 w-full h-full">
        <div className="flex items-center gap-4">
          <div className="lg:hidden cursor-pointer border rounded-xl bg-secondary/10">
            <Hamburger
              toggled={sidebarIsOpen}
              toggle={setSidebarIsOpen}
              size={23}
              aria-label="Toggle sidebar"
            />
          </div>
          <AdminProfileMenu session={session} />
        </div>

        <Link href="/admin/dashboard/stories?page=1">
          <Logo className="text-xl" />
        </Link>
      </div>

      <Sidebar
        isOpen={sidebarIsOpen}
        setIsOpen={() => setSidebarIsOpen(false)}
        routes={DashboardRoutes}
      />
    </div>
  );
};

export default DashboardHeader;
