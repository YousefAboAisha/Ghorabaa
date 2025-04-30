import { Routes } from "@/data/routes";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/zad-logo.svg";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
// import { useRouter } from "next/router";

type SidebarTypes = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarTypes) => {
  const date = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <div
      className={`fixed rtl h-full w-full md:w-6/12 md:hidden sm:fixed right-0 top-[70px] z-[100000000] bg-white duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="flex flex-col gap-4 mt-6">
        {Routes.map(({ href, title }, index) => {
          return (
            <Link
              key={index}
              href={href}
              className={`cursor-pointer p-4 border-b duration-300 hover:text-primary `}
              title={title}
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`font-secondary ${
                  pathname == `${href}` ? "text-primary font-normal" : ""
                }`}
              >
                {title}
              </p>
            </Link>
          );
        })}

        <Image
          src={logo}
          width={130}
          height={130}
          alt="Zad logo"
          className="mx-auto bottom-2 opacity-5 mt-6"
        />

        <p className="text-sm font-light text-grey mt-6 text-center">
          جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة© {date}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
