"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  title: string;
  href: string;
  icon: React.ReactNode; // 👈 icon comes directly
  show: boolean;
};

export default function SidebarMenuItems({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-3 w-full p-4 mt-8 list">
      {menuItems
        .filter((item) => item.show)
        .map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
              pathname === item.href
                ? "bg-secondary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            dir="rtl"
          >
            <span className="ml-3">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
    </ul>
  );
}
