import React from "react";
import Heading from "@/components/UI/typography/heading";
import StorySearchSection from "@/containers/addStory/storySearchSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة قصة شهيد جديد | توثيق قصص الشهداء - غرباء",
  description:
    "ساهم معنا في توثيق قصة شهيد فلسطيني عبر منصة غرباء لضمان بقاء الذكرى خالدة",
  keywords: [
    "إضافة قصة شهيد",
    "توثيق الشهداء",
    "نموذج إضافة قصة",
    "سجل الشهداء",
    "منصة غرباء",
    "قصص الشهداء الفلسطينيين",
  ],
  openGraph: {
    title: "إضافة قصة شهيد جديد | منصة غرباء",
    description:
      "ساهم في توثيق تاريخ الشهداء الفلسطينيين عبر إضافة قصصهم على منصة غرباء",
    url: "https://ghorabaa.vercel.app/addStory",
    images: [
      {
        url: "/images/add-story-og.jpg",
        width: 1200,
        height: 630,
        alt: "نموذج إضافة قصة شهيد على منصة غرباء",
      },
    ],
  },
  alternates: {
    canonical: "/addStory",
  },
  robots: {
    index: false, // Recommended for form pages
    follow: true,
  },
  other: {
    privacy: "form-submission", // Indicates this is a form page
    "cache-control": "private, no-store", // Sensitive form handling
    "dc:rights": "جميع الحقوق محفوظة للمساهمين",
  },
};

const Page = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mt-32">
      <Heading
        title="إضافة قصة جديدة"
        details="قم بالبحث عن الشهيد المُراد إضافة قصة عنه"
        className="text-center"
      />

      <StorySearchSection />
    </div>
  );
};

export default Page;
