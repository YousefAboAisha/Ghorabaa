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
    <footer className="relative container mt-24 mb-12 p-6 gap-4 border rounded-md bg-white ">
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
