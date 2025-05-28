"use client";
import Link from "next/link";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CiEdit, CiLogout, CiUser } from "react-icons/ci";
import Logo from "@/components/UI/logo";

const Header = () => {
  return (
    <nav
      className={`fixed h-[70px] top-0 w-[83%] mr-[17%] z-10 items-center bg-white text-black duration-500 shadow-sm `}
    >
      <div className="flex flex-row justify-between items-center h-full px-8">
        <Menu as={"div"} className={"relative"}>
          <MenuButton as={"div"} className="cursor-pointer">
            {() => (
              <div className="flex items-center gap-1">
                <p className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full cursor-pointer text-lg shadow-md capitalize">
                  Z
                </p>
              </div>
            )}
          </MenuButton>

          <MenuItems
            anchor={{ to: "bottom start", gap: "4px" }}
            className="flex flex-col gap-2 min-w-48 bg-white z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
          >
            <div className="p-1 flex flex-col gap-2">
              <MenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 p-3 hover:bg-gray-300 cursor-pointer duration-100 text-sm rounded-lg"
                  prefetch
                >
                  <CiUser size={20} />
                  <span>الصفحة الشخصية</span>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  href={"/edit"}
                  className="flex items-center gap-2 p-3 hover:bg-gray-300 cursor-pointer duration-100 text-sm rounded-lg"
                >
                  <CiEdit size={20} />
                  <span>تعديل البيانات</span>
                </Link>
              </MenuItem>

              <MenuItem>
                <div className="flex items-center gap-2 p-3 cursor-pointer text-sm rounded-lg bg-[red] text-white">
                  <CiLogout size={20} />
                  <p>تسجيل الخروج</p>
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <Logo />
      </div>
    </nav>
  );
};

export default Header;
