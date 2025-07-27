import Hero from "@/components/layout/hero";
import Categories from "@/containers/statistics/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
  description:
    "أحدث الإحصائيات والبيانات الموثقة عن شهداء فلسطين مع تحليلات وتقارير مفصلة",
  keywords: [
    "إحصائيات الشهداء",
    "بيانات الشهداء الفلسطينيين",
    "تقارير إحصائية",
    "أرقام الشهداء",
    "توثيق إحصائي",
    "غرباء",
  ],
  openGraph: {
    title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
    description: "بيانات رقمية موثقة وتقارير إحصائية عن شهداء فلسطين",
    url: "https://ghorabaa.vercel.app/statistics",
    images: [
      {
        url: "/images/statistics-og.jpg",
        width: 1200,
        height: 630,
        alt: "إحصائيات وتقارير عن شهداء فلسطين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
    description: "أحدث البيانات الإحصائية الموثقة عن شهداء فلسطين",
    images: ["/images/statistics-og.jpg"],
  },
  alternates: {
    canonical: "/statistics",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:format": "dataset",
    "dc:publisher": "غرباء",
    "dc:date": new Date().toISOString(),
  },
};

const Statistics = () => {
  return (
    <div className="container min-h-screen mt-24">
      <Hero pattern="bg-statistics-pattern" className="bg-top" />
      <Categories />
    </div>
  );
};

export default Statistics;
