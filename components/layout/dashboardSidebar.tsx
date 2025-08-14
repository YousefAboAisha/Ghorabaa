"use client";
import { Role } from "@/app/enums";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { BiLineChart } from "react-icons/bi";
import { BsCalendar4Week } from "react-icons/bs";
import { FiHome, FiUsers } from "react-icons/fi";
import { GiBlood } from "react-icons/gi";
import { MdOutlineReport } from "react-icons/md";
import Logo from "../UI/logo";
import { getRoleColor, getRoleInArabic } from "@/utils/text";
import AdminProfileMenu from "../UI/menues/adminProfileMenu";

type Props = {
  session: Session | null;
};

const DashboardSidebar = ({ session }: Props) => {
  const pathname = usePathname(); // Get the current route
  const role = session?.user.role || "غير معرف";
  const isEditor = role === Role.EDITOR;
  const isAdmin = role === Role.ADMIN;
  const name = session?.user.name.split(" ").slice(0, 1) || "غير معرف";
  const roleLabel = getRoleInArabic(role as Role);

  const menuItems = [
    {
      title: "كافة القصص",
      href: "/admin/dashboard",
      icon: <FiHome size={20} />,
      show: true,
    },
    {
      title: "المستخدمون",
      href: "/admin/dashboard/users",
      icon: <FiUsers size={20} />,
      show: !isEditor && isAdmin,
    },
    {
      title: "المجازر الصهيونية",
      href: "/admin/dashboard/massacres",
      icon: <GiBlood size={20} />,
      show: true,
    },
    {
      title: "الفعاليات",
      href: "/admin/dashboard/events",
      icon: <BsCalendar4Week size={20} />,
      show: true,
    },
    {
      title: "الإبلاغات",
      href: "/admin/dashboard/reports",
      icon: <MdOutlineReport size={20} />,
      show: true,
    },
    {
      title: "التحليلات والإحصاءات",
      href: "/admin/dashboard/analytics",
      icon: <BiLineChart size={20} />,
      show: true,
    },
  ];

  const renderredTabs = () => (
    <ul className="flex flex-col gap-3 w-full p-4 mt-8 list">
      {menuItems
        .filter((item) => item.show)
        .map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
              pathname === item.href
                ? "bg-secondary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            dir="rtl"
          >
            <span className="ml-3">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}

      <div className="relative flex items-center mt-6 gap-2 bg-background_light rounded-lg border p-2">
        <AdminProfileMenu session={session} />

        <div className="flex flex-col gap-1 text-xs">
          <p className="truncate">{name}</p>
          <p
            className="font-semibold truncate"
            style={{
              color: getRoleColor(Role.ADMIN),
            }}
          >
            {roleLabel}
          </p>
        </div>
      </div>
    </ul>
  );

  return (
    <div className="fixed top-0 bg-white shadow-sm h-full w-56 z-10 border-l hidden md:block">
      <div className="relative mt-16">
        <div className="w-fit mx-auto">
          <Link href="/admin/dashboard?page=1">
            <Logo className="text-xl" />
          </Link>
        </div>

        {renderredTabs()}
      </div>
    </div>
  );
};

export default DashboardSidebar;
