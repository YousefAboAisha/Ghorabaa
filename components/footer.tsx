"use client";
// import logo from "@/public/zad-logo.svg";
// import Link from "next/link";
// import Image from "next/image";
// import { Routes } from "@/data/routes";
// import { usePathname } from "next/navigation";
// import { useMemo } from "react";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="relative container max-w-fit mt-24 mb-12 p-6 gap-4 border rounded-md bg-white ">
      <h2 className="text-center text-sm">
        هذه المنصة صدقة جارية عن روح الشهيد المهندس/ محمد عبد الله حسب الله{" "}
        {date} 🧡
      </h2>
    </footer>
  );
};

export default Footer;
