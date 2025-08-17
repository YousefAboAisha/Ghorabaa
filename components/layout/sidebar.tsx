import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Logo from "../UI/logo";

type SidebarTypes = {
  isOpen: boolean;
  routes: { title: string; href: string }[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen, routes }: SidebarTypes) => {
  const date = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <div
      className={`fixed rtl h-full w-full lg:hidden sm:fixed right-0 top-[70px] z-[100000000] bg-white duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="flex flex-col gap-4 mt-6">
        {routes.map(({ href, title }, index) => {
          return (
            <Link
              key={index}
              href={href}
              className={`cursor-pointer p-4 border-b text-sm duration-300 hover:text-primary `}
              title={title}
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`font-secondary ${
                  pathname.startsWith(href) ? "text-primary font-normal" : null
                }`}
              >
                {title}
              </p>
            </Link>
          );
        })}

        <p className="text-sm font-light text-grey mt-6 text-center">
          جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة© {date}
        </p>

        <Logo className="mx-auto bottom-2 opacity-5 mt-6 !text-5xl" />
      </div>
    </div>
  );
};

export default Sidebar;
