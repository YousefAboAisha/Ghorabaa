import Hero from "@/components/layout/hero";
import AboutCards from "@/containers/about/aboutCards";
import ContactForm from "@/containers/about/contactForm";
import PlatformDescription from "@/containers/about/platformDescription";
import PlatformVideo from "@/containers/about/platformVideo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين - قصص وإحصائيات",
  description:
    "منصة غرباء توثق قصص الشهداء الفلسطينيين وتقدم بيانات موثقة عن جرائم الاحتلال",
  keywords: [
    "منصة غرباء",
    "توثيق الشهداء",
    "قصص الشهداء الفلسطينيين",
    "عن الموقع",
    "رسالة غرباء",
    "رؤية المنصة",
  ],
  openGraph: {
    title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين",
    description:
      "تعرف على رؤية ورسالة منصة غرباء في توثيق قصص الشهداء وإحصاءات الجرائم الصهيونية",
    url: "https://ghorabaa.vercel.app/about",
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "عن منصة غرباء لتوثيق الشهداء الفلسطينيين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين",
    description: "الرؤية والرسالة وراء منصة غرباء لتوثيق جرائم الاحتلال",
    images: ["/images/about-og.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:publisher": "منصة غرباء",
    "dc:type": "InteractiveResource",
    "og:video": "/videos/platform-overview.mp4",
  },
};

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      {/* Hero section */}
      <Hero />

      {/* About us grid Cards */}
      <AboutCards />

      <PlatformVideo />

      <PlatformDescription />

      <ContactForm />
    </div>
  );
};

export default SupportUs;
