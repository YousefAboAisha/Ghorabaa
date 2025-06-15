"use client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { BiDonateHeart } from "react-icons/bi";
import { BsCalendar4Week } from "react-icons/bs";
import { FiHome, FiUsers } from "react-icons/fi";
import { MdOutlineReport } from "react-icons/md";

type DashboardSidebarProps = {
  session: Session | null;
};

const DashboardSidebar = ({ session }: DashboardSidebarProps) => {
  const pathname = usePathname(); // Get the current route
  const image = session?.user.image;

  return (
    <div className="bg-white shadow-sm h-full fixed w-[17%] z-10">
      <div className="mt-24">
        <div>
          <Image
            src={image || "/notFound.png"}
            width={70}
            height={70}
            alt="صورة الملف الشخصي"
            className="rounded-full mx-auto"
          />
        </div>

        <ul className="flex flex-col gap-3 w-full p-4 mt-8">
          <Link href={"/admin/dashboard"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              <p className="hidden lg:block text-[13px] ">كافة القصص</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/users"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/users"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiUsers size={18} />
              <p className="hidden lg:block text-[13px] ">المستخدمون</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/events"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/events"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <BsCalendar4Week size={18} />
              <p className="hidden lg:block text-[13px] ">الفعاليات</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/donationCampaigns"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/donationCampaigns"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <BiDonateHeart size={20} />
              <p className="hidden lg:block text-[13px] ">حملات التبرع</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/reports"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/reports"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <MdOutlineReport size={20} />
              <p className="hidden lg:block text-[13px] ">الإبلاغات</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
