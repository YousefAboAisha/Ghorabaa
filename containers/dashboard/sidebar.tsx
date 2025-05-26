"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { FiBarChart2, FiGitPullRequest, FiHome, FiUsers } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="bg-white border border-l h-full fixed w-[17%] z-10">
      <ul className="flex flex-col gap-3 w-full p-4 mt-24">
        <Link href={"/admin/dashboard"}>
          <li
            className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
              pathname === "/admin/dashboard"
                ? "bg-primary text-white"
                : "bg-gray-100"
            }`}
          >
            <FiHome size={18} />
            <p className="hidden lg:block text-[13px] "> الرئيسية</p>
          </li>
        </Link>

        <Link href={"/admin/dashboard/addStory_requests"}>
          <li
            className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
              pathname === "/admin/dashboard/addStory_requests"
                ? "bg-primary text-white"
                : "bg-gray-100"
            }`}
          >
            <FiGitPullRequest size={18} />
            <p className="hidden lg:block text-[13px] "> طلبات الإضافة</p>
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
            <p className="hidden lg:block text-[13px] "> كافة المستخدمين</p>
          </li>
        </Link>

        <Link href={"/admin/dashboard/comments"}>
          <li
            className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
              pathname === "/admin/dashboard/comments"
                ? "bg-primary text-white"
                : "bg-gray-100"
            }`}
          >
            <FiBarChart2 size={18} />
            <p className="hidden lg:block text-[13px] ">التعليقات</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
