"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronDown } from "react-icons/bi";

const DropdownMenu = () => {
  const pathname = usePathname();

  return (
    <Menu as={"div"}>
      <MenuButton
        as={"button"}
        className={`group flex items-center gap-0.5 cursor-pointer min-w-fit text-sm font-primary outline-none `}
      >
        <BiChevronDown size={17} />
        <p className="group-hover:text-primary duration-500">الأقسام</p>
      </MenuButton>

      <MenuItems
        anchor={{ to: "bottom start", gap: "25px" }}
        transition
        className="flex flex-col w-48 bg-white z-[100000] rounded-b-md border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
      >
        <div className="p-1 flex flex-col gap-2 text-sm">
          <MenuItem>
            <Link
              href={"/massacres"}
              className={`flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 rounded-sm ${
                pathname === "/massacres" ? "text-primary font-normal" : ""
              }`}
              prefetch
            >
              <span>المجازر الصهيونية </span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href={"/statistics"}
              className={`flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 rounded-sm ${
                pathname === "/statistics" ? "text-primary font-normal" : ""
              }`}
              prefetch
            >
              <span>الإحصائيات</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href={`/events`}
              className={`flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 rounded-sm ${
                pathname === "/events" ? "text-primary font-normal" : ""
              }`}
              prefetch
            >
              <span>الفعاليات</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href={`/about`}
              className={`flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 rounded-sm ${
                pathname === "/about" ? "text-primary font-normal" : ""
              }`}
              prefetch
            >
              <span>من نحن</span>
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
