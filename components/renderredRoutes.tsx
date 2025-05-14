"use client";
import { Routes } from "@/data/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const RenderredRoutes = () => {
  const pathname = usePathname();

  const renderedRoutes = useMemo(
    () =>
      Routes.map(({ title, href }, index) => (
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

  return renderedRoutes;
};

export default RenderredRoutes;
