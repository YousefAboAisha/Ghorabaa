"use client";
import { usePathname } from "next/navigation";
import Logo from "../UI/logo";
import RenderredRoutes from "./renderredRoutes";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const date = new Date().getFullYear();

  const pathname = usePathname();

  // Only render the navbar if it's not an admin page
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="container flex flex-col mt-24 mb-12">
      <div className="relative p-6 gap-4 border rounded-md rounded-b-none border-b-0 bg-white">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Logo className="text-2xl" />

          <div className="flex flex-wrap justify-center gap-4">
            <RenderredRoutes />
          </div>

          <div className="text-[12px] font-light">
            جميع الحقوق محفوظة لدى{" "}
            <Link
              href={"https://portfolio-neon-delta-76.vercel.app/"}
              target="_blank"
              className="font-normal hover:underline"
            >
              {" "}
              يوسف رشاد أبو عيشة
            </Link>{" "}
            {date}
          </div>

          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              href={"https://www.instagram.com/ghorabaa_gaza"}
            >
              <FaInstagram size={17} />
            </Link>

            <Link target="_blank" href={"https://www.x.com/ghorabaa_gaza"}>
              <FaXTwitter  size={17} />
            </Link>

            <Link
              target="_blank"
              href={"https://www.facebook.com/ghorabaa_gaza"}
            >
              <FaFacebookF size={17} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center bg-secondary text-white p-2 border rounded-b-md">
        <div
          style={{
            lineHeight: "25px",
          }}
          className="self-center text-center text-[12px] w-full md:w-10/12"
        >
          هذه المنصّة صدقة جارية عن روح الشهيد المهندس/ محمد عبد الله حسب الله
          🧡
        </div>
      </div>
    </footer>
  );
};

export default Footer;
