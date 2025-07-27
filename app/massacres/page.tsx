import Hero from "@/components/layout/hero";
import Heading from "@/components/UI/typography/heading";
import MassacresSection from "@/containers/masscares/massacresSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
  description:
    "توثيق شامل للمجازر الصهيونية بحق الشعب الفلسطيني مع تفاصيل الضحايا والأحداث والتواريخ",
  keywords: [
    "مجازر صهيونية",
    "جرائم الاحتلال",
    "شهداء فلسطين",
    "توثيق المجازر",
    "جرائم الحرب",
    "غرباء",
  ],
  openGraph: {
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description:
      "أرشيف كامل لمجازر الاحتلال الصهيوني ضد الفلسطينيين مع صور وتفاصيل الضحايا",
    url: "https://ghorabaa.vercel.app/massacres",
    images: [
      {
        url: "/images/massacres-og.jpg",
        width: 1200,
        height: 630,
        alt: "توثيق المجازر الصهيونية بحق الشعب الفلسطيني",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description: "توثيق كامل لمجازر الاحتلال الصهيوني ضد الشعب الفلسطيني",
    images: ["/images/massacres-og.jpg"],
  },
  alternates: {
    canonical: "/massacres",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:language": "ar",
    "dc:title": "المجازر الصهيونية ضد الفلسطينيين",
    "dc:description": "توثيق تاريخي للمجازر الصهيونية بحق الشعب الفلسطيني",
  },
};

const Page = () => {
  return (
    <div className="container mt-24 min-h-screen">
      <Hero pattern="bg-massacres-pattern" className="bg-top" />

      <div className="flex flex-col gap-2 mt-16">
        <Heading title="المجازر الصهيونية" />

        <MassacresSection />
      </div>
    </div>
  );
};

export default Page;
