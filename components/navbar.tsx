"use client";
import React, { useState, useMemo } from "react";
import { Routes } from "../data/routes";
import Link from "next/link";
import Sidebar from "./sidebar";
import { Fade as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/zad-logo.svg";
import Button from "./UI/inputs/button";
import ProfilePopper from "./UI/modals/profilePopper";
import { FiUser } from "react-icons/fi";

export interface SessionProps {
  session?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN";
    expiresAt: Date;
  } | null;
}

const Navbar = ({ session }: SessionProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const pathname = usePathname();

  // Memoize the routes to avoid unnecessary re-renders
  const renderedRoutes = useMemo(
    () =>
      Routes.map(({ title, href }, index) => (
        <Link
          key={index}
          href={href}
          className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-md font-primary outline-none ${
            pathname === `${href}` ? "text-primary font-normal" : ""
          }`}
          title={title}
        >
          {title}
        </Link>
      )),
    [pathname]
  );

  // Only render the navbar if it's not an admin page
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[1000] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-1`}>
          <div className="flex md:hidden cursor-pointer m-0">
            <Hamburger
              toggled={sidebarIsOpen}
              toggle={setSidebarIsOpen}
              size={24}
              aria-label="Toggle sidebar"
            />
          </div>

          {/* Conditionally render Sign In or Profile Icon */}
          {!session ? (
            <Link
              href={"/signin"}
              className="h-full w-full outline-none"
              prefetch
            >
              <Button
                title="تسجيل الدخول"
                className="bg-primary text-sm px-4 md:px-0"
                icon={<FiUser />}
                hasShiningBar={false}
              />
            </Link>
          ) : session?.role == "ADMIN" ? (
            <ProfilePopper session={session} />
          ) : null}

          {/* Routes */}
          <div className="hidden md:flex gap-6 mr-4">{renderedRoutes}</div>
        </div>

        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={logo}
            width={25}
            alt="Zad logo"
            className="h-auto"
            priority // Optimize for above-the-fold images
          />
        </Link>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarIsOpen}
        setIsOpen={() => setSidebarIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
