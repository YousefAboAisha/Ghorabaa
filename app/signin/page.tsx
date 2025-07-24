import SigninForm from "@/components/UI/forms/signinForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - موقع غرباء",
  description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
  keywords: ["تسجيل دخول", "حساب غرباء", "دخول الأعضاء", "موقع غرباء"],
  robots: {
    index: false, // Prevent search engines from indexing sign-in page
    follow: true,
  },
  openGraph: {
    title: "تسجيل الدخول - موقع غرباء",
    description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
    url: "https://ghorabaa.vercel.app/signin",
    type: "website",
  },
};

const Page = async () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SigninForm />
    </div>
  );
};

export default Page;
