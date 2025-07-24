import SignupForm from "@/components/UI/forms/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد - موقع غرباء",
  description:
    "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري",
  keywords: [
    "تسجيل جديد",
    "إنشاء حساب",
    "تسجيل عضو جديد",
    "موقع غرباء",
    "انضم إلينا",
  ],
  robots: {
    index: false, // Recommended to prevent indexing of signup pages
    follow: true,
  },
  openGraph: {
    title: "إنشاء حساب جديد - موقع غرباء",
    description:
      "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري",
    url: "https://ghorabaa.vercel.app/signup",
    type: "website",
    images: [
      {
        url: "/images/og-signup.jpg", // Your custom signup OG image
        width: 1200,
        height: 630,
        alt: "إنشاء حساب في موقع غرباء",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إنشاء حساب جديد - موقع غرباء",
    description: "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي",
    images: ["/images/og-signup.jpg"],
  },
  alternates: {
    canonical: "https://ghorabaa.vercel.app/signup",
  },
};

const Page = async () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default Page;
