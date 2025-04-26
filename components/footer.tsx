"use client";
// import logo from "@/public/zad-logo.svg";
// import Link from "next/link";
// import Image from "next/image";
// import { Routes } from "@/data/routes";
// import { usePathname } from "next/navigation";
// import { useMemo } from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  // const pathname = usePathname();

  // const renderedRoutes = useMemo(
  //   () =>
  //     Routes.map(({ title, href }, index) => (
  //       <Link
  //         key={index}
  //         href={href}
  //         className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-md outline-none ${
  //           pathname === `${href}` ? "text-primary font-semibold" : ""
  //         }`}
  //         title={title}
  //       >
  //         <h2 className="text-sm">{title}</h2>
  //       </Link>
  //     )),
  //   [pathname]
  // );

  return (
    <footer className="relative container mt-24 mb-12 p-6 gap-4 border rounded-md bg-white ">
      {/* <div className="flex gap-4 justify-center items-center">
        {renderedRoutes}
      </div> */}

      <div className="flex items-center justify-center gap-1">
        <p>
          هذه المنصة صدقة جارية عن روح الشهيد المهندس/ محمد عبد الله حسب الله
        </p>
        {date} 🧡
      </div>
    </footer>
  );
};

export default Footer;
