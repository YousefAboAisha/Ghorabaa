"use client";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pathTranslations: Record<string, string> = {
  dashboard: "لوحة التحكم",
  addStory: "إضافة قصة جديدة",
  profile: "الملف الشخصي",
  stories: "شهداؤنا",
  donationCampaigns: "حملات التبرع",
  events: "الفعاليات",
  search: "البحث عن الشهداء",
  editProfile: "تعديل الملف الشخصي",
  notifications: "الإشعارات",
  savedStories: "القصص المحفوظة",
  massacres: "المجازر الصهيونية",
};

type PageTitlesProps = {
  content_title?: string;
};

const PageTitles = ({ content_title }: PageTitlesProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isStoryDetailsPage =
    segments[0] === "stories" ||
    segments[0] === "massacres" ||
    (segments[0] === "events" && segments.length === 2);

  return (
    <div className="flex items-center mb-2 text-sm">
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:underline"
      >
        الرئيسية
        {segments.length > 0 && <MdKeyboardArrowLeft size={20} />}
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        if (isStoryDetailsPage && index === 1) {
          return (
            <React.Fragment key={href}>
              <span className="text-black">{content_title}</span>
            </React.Fragment>
          );
        }

        const title =
          pathTranslations[segment] ||
          decodeURIComponent(segment.replace(/-/g, " "));

        return (
          <React.Fragment key={href}>
            <Link
              href={href}
              className="flex items-center text-gray-500 hover:underline"
            >
              {title}
            </Link>
            {!isLast && (
              <MdKeyboardArrowLeft size={20} className="text-gray-500" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PageTitles;
