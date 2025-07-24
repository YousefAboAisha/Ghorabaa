import Hero from "@/components/layout/hero";
import EventsCards from "@/containers/events/eventsCards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفعاليات والأحداث | أنشطة ونشاطات تضامنية مع فلسطين - غرباء",
  description:
    "أحدث الفعاليات والأنشطة التضامنية مع القضية الفلسطينية وتوثيق الأحداث الجارية",
  keywords: [
    "فعاليات فلسطين",
    "أحداث تضامنية",
    "أنشطة دعم فلسطين",
    "تقويم الأحداث",
    "فعاليات غرباء",
    "نشاطات فلسطينية",
  ],
  openGraph: {
    title: "الفعاليات والأحداث | أنشطة تضامنية مع فلسطين - غرباء",
    description:
      "تقويم الفعاليات والأنشطة التضامنية مع الشعب الفلسطيني حول العالم",
    url: "https://ghorabaa.vercel.app/events",
    images: [
      {
        url: "/images/events-og.jpg",
        width: 1200,
        height: 630,
        alt: "فعاليات وأنشطة تضامنية مع فلسطين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الفعاليات والأحداث | أنشطة تضامنية مع فلسطين",
    description: "أحدث الفعاليات التضامنية والأنشطة الداعمة للقضية الفلسطينية",
    images: ["/images/events-og.jpg"],
  },
  alternates: {
    canonical: "/events",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:title": "فعاليات دعم فلسطين",
    "dc:creator": "غرباء",
    "event:type": "PoliticalActivity",
  },
};

const page = () => {
  return (
    <div className="relative container mt-24">
      <Hero />
      <EventsCards />
    </div>
  );
};

export default page;
