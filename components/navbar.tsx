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
import { FiPlus } from "react-icons/fi";

export interface NavbarProps {
  session: {
    userId: string;
    expiresAt: Date;
    email: string;
  } | null;
}

const Navbar = ({ session }: NavbarProps) => {
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

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[1000] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-1 md:gap-6 lg:gap-8`}>
          <div className="flex md:hidden cursor-pointer">
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
                title="إضافة قصة"
                className="bg-primary text-sm px-3 md:px-1"
                icon={<FiPlus />}
                hasShiningBar={false}
              />
            </Link>
          ) : (
            <ProfilePopper session={session} />
          )}

          {/* Routes */}
          <div className="hidden md:flex gap-6">{renderedRoutes}</div>
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
