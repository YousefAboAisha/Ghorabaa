"use client";
import React, { useState, useMemo } from "react";
import { Routes } from "../data/routes";
import Link from "next/link";
import Sidebar from "./sidebar";
import { Fade as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import Button from "./UI/inputs/button";
import ProfilePopper from "./UI/modals/profilePopper";
import { FiUser } from "react-icons/fi";
import Logo from "./UI/logo";
import NotificationPopper from "./UI/modals/notificationPopper";
import { BsBookmark } from "react-icons/bs";
import { Session } from "next-auth";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const pathname = usePathname();

  console.log("Session values [Navbar]", session);

  // Memoize the routes to avoid unnecessary re-renders
  const renderedRoutes = useMemo(
    () =>
      Routes.filter(
        ({ href }) => href !== "/donationCampaigns" && href !== "/events"
      ).map(({ title, href }, index) => (
        <Link
          key={index}
          href={href}
          className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-sm font-primary outline-none font-noto_kufi ${
            pathname === href ? "text-primary font-normal" : ""
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
      className={`fixed w-full h-[70px] top-0 left-0 z-[50] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
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
            <Link href={"/signin"} className="h-full outline-none" prefetch>
              <Button
                title="تسجيل الدخول"
                className="bg-primary px-4 md:px-3"
                icon={<FiUser />}
                hasShiningBar={false}
              />
            </Link>
          ) : (
            <div className="flex items-center">
              <ProfilePopper session={session} />

              <NotificationPopper />
              <Link
                title="القصص المحفوظة"
                prefetch
                href={"/savedStories"}
                className="flex items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <BsBookmark />
              </Link>
              <span className="hidden md:flex">|</span>
            </div>
          )}

          {/* Routes */}
          <div className="hidden md:flex gap-6 mr-4">{renderedRoutes}</div>
        </div>

        {/* Logo */}
        <Logo className="text-xl" />
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
