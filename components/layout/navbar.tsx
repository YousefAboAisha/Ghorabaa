"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Routes } from "../../data/routes";
import Link from "next/link";
import Sidebar from "./sidebar";
import { Fade as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import Button from "../UI/inputs/button";
import { FiUser } from "react-icons/fi";
import Logo from "../UI/logo";
import NotificationPopper from "../UI/modals/notificationPopper";
import { BsBookmark, BsPersonAdd, BsSearch } from "react-icons/bs";
import { Session } from "next-auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useFavoriteStore } from "@/stores/favoriteStore";
import ProfileMenu from "../UI/menues/profileMenu";
import DropdownMenu from "../UI/menues/dropdownMenu";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();

  const { count, fetchAndUpdateCount } = useFavoriteStore();

  const hiddenRoutes = ["/massacres", "/statistics", "/events", "/about"];

  // Memoize the routes to avoid unnecessary re-renders
  const renderedRoutes = useMemo(
    () =>
      Routes.map(({ title, href }, index) => {
        if (hiddenRoutes.includes(href)) return;
        return (
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
        );
      }),
    [pathname]
  );

  useEffect(() => {
    setLoading(true);
    fetchAndUpdateCount();
    setLoading(false);
  }, []);

  // Only render the navbar if it's not an admin page
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[50] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-1`}>
          <div className="flex lg:hidden cursor-pointer m-0">
            <Hamburger
              toggled={sidebarIsOpen}
              toggle={setSidebarIsOpen}
              size={24}
              aria-label="Toggle sidebar"
            />
          </div>

          {/* Conditionally render Sign In or Profile Icon */}
          {!session ? (
            <div className="flex items-center gap-2">
              <Link
                href={"/signin"}
                className="outline-none hidden lg:flex !min-w-fit"
                prefetch
              >
                <Button
                  title="تسجيل الدخول"
                  className="bg-primary px-4 lg:px-3 !min-w-fit"
                  icon={<FiUser />}
                  hasShiningBar={false}
                />
              </Link>

              <Link
                title="تسجيل الدخول"
                prefetch
                href={"/signin"}
                className="flex lg:hidden items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <BsPersonAdd size={24} />
              </Link>

              <Link
                title="البحث عن الشهداء"
                prefetch
                href={"/search"}
                className="flex lg:hidden items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <BsSearch size={18} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              {/* Profile popper */}
              <ProfileMenu session={session} />

              {/* Notifications popper */}
              <NotificationPopper session={session} />

              {/* Search page */}
              <Link
                title="البحث عن الشهداء"
                prefetch
                href={"/search"}
                className="flex lg:hidden items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <BsSearch />
              </Link>

              {/* Saved Stories page */}
              <Link
                title="القصص المحفوظة"
                prefetch
                href={"/savedStories"}
                className="relative flex items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                {count > 0 && (
                  <p className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] p-1 bg-primary text-white  flex items-center justify-center rounded-full text-[10px]">
                    {count}
                  </p>
                )}

                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <BsBookmark />
                )}
              </Link>
              <span className="hidden lg:flex">|</span>
            </div>
          )}

          {/* Routes */}
          <div className="hidden lg:flex gap-6 mr-4">
            {renderedRoutes} <DropdownMenu />
          </div>
        </div>

        {/* Logo */}
        <Link href={"/"} className="text-xl">
          <Logo />
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
