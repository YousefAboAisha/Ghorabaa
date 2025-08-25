import { Role } from "@/app/enums";
import Link from "next/link";
import Logo from "../UI/logo";
import { getRoleColor, getRoleInArabic } from "@/utils/text";
import AdminProfileMenu from "../UI/menues/adminProfileMenu";
import { Session } from "next-auth";
import SidebarMenuItems from "./sidebarMenuItems";

import { FiHome, FiUsers } from "react-icons/fi";
import { GiBlood } from "react-icons/gi";
import { BsCalendar4Week } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { BiLineChart } from "react-icons/bi";

type Props = {
  session: Session | null;
};

const DashboardSidebar = ({ session }: Props) => {
  const role = session?.user.role || "غير معرف";
  const isEditor = role === Role.EDITOR;
  const isAdmin = role === Role.ADMIN;
  const name = session?.user.name.split(" ")[0] || "غير معرف";
  const roleLabel = getRoleInArabic(role as Role);

  // 👇 icons stay with items
  const menuItems = [
    {
      title: "كافة القصص",
      href: "/admin/dashboard/stories",
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

  return (
    <div className="fixed top-0 bg-white shadow-sm h-full w-56 z-10 border-l hidden md:block">
      <div className="relative mt-16">
        <div className="w-fit mx-auto">
          <Link href="/admin/dashboard/stories?page=1">
            <Logo className="text-xl" />
          </Link>
        </div>

        <SidebarMenuItems menuItems={menuItems} />

        {session && (
          <div className="relative flex items-center mt-6 gap-2 bg-background_light rounded-lg border p-2 mx-4">
            <AdminProfileMenu session={session} />
            <div className="flex flex-col gap-1 text-xs">
              <p className="truncate">{name}</p>
              <p
                className="font-semibold truncate"
                style={{ color: getRoleColor(Role.ADMIN) }}
              >
                {roleLabel}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
