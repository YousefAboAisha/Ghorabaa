"use client";

import { MdKeyboardArrowLeft } from "react-icons/md";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Arabic labels for path segments
const pathTranslations: Record<string, string> = {
  dashboard: "لوحة التحكم",
  settings: "الإعدادات",
  profile: "الملف الشخصي",
  martyrs: "شهداؤنا",
  donationCampaigns: "حملات التبرع",
  events: "الفعاليات",
};

const PageTitles = () => {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const title =
        pathTranslations[segment] ||
        decodeURIComponent(segment.replace(/-/g, " "));
      return { title, href };
    });

  return (
    <div className="flex items-center mb-2 text-sm">
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:underline"
      >
        الرئيسية
        {segments.length > 0 && <MdKeyboardArrowLeft size={20} />}
      </Link>

      {segments.map((seg, i) => (
        <React.Fragment key={seg.href}>
          {i < segments.length - 1 ? (
            <Link
              href={seg.href}
              className="flex items-center text-gray-500 hover:underline"
            >
              {seg.title}
              <MdKeyboardArrowLeft size={20} />
            </Link>
          ) : (
            <p className="mr-1">{seg.title}</p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PageTitles;
