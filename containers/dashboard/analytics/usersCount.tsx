"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UsersCountCard from "@/components/UI/cards/usersCountCard";
import UserCountSkeletonLoader from "@/components/UI/loaders/userCountSkeletonLoader";
import { useEffect, useState } from "react";
import { FaUser, FaUserCheck, FaUserGear, FaUsers } from "react-icons/fa6";

const UsersCount = () => {
  const [usersCountLoader, setUsersCountLoader] = useState(true);
  const [usersData, setUsersData] = useState<{
    TOTAL: number;
    USER: number;
    EDITOR: number;
    ADMIN: number;
  }>({
    TOTAL: 0,
    USER: 0,
    EDITOR: 0,
    ADMIN: 0,
  });

  const [userCountsError, setUserCountsError] = useState<string | null>(null);

  const fetchUserRoleCount = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/users/count/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setUsersCountLoader(false);
        let errorMsg = "حدث خطأ أثناء جلب البيانات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const { data } = await res.json();
      setUsersCountLoader(false);

      // Convert keys to uppercase
      const formattedData = {
        TOTAL: data.total || 0,
        USER: data.USER ?? data.user ?? 0,
        EDITOR: data.EDITOR ?? data.editor ?? 0,
        ADMIN: data.ADMIN ?? data.admin ?? 0,
      };

      setUsersData(formattedData);
    } catch (error) {
      setUsersCountLoader(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setUserCountsError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setUsersCountLoader(false);
    }
  };

  useEffect(() => {
    fetchUserRoleCount();
  }, []);

  const renderUserCounts = () => {
    if (userCountsError)
      return <ErrorMessage error={userCountsError} className="min-h-[30vh]" />;

    if (usersCountLoader) return <UserCountSkeletonLoader length={4} />;

    return (
      <div className="relative w-full flex items-center flex-wrap gap-4">
        <UsersCountCard
          title="كافة المستخدمين"
          count={usersData.TOTAL}
          icon={<FaUsers size={22} className="text-rejected font-bold z-10" />}
          classname="bg-[#c2361620]"
        />

        <UsersCountCard
          title={"المشرفون"}
          count={usersData.ADMIN}
          icon={<FaUserGear size={22} className="text-primary font-bold" />}
          classname="bg-[#5b913b20]"
        />

        <UsersCountCard
          title={"المحررون"}
          count={usersData.EDITOR}
          icon={<FaUserCheck size={22} className="text-blueColor font-bold" />}
          classname="bg-[#2980b920]"
        />

        <UsersCountCard
          title={"المستخدمون العاديون"}
          count={usersData.USER}
          icon={<FaUser size={18} className="text-secondary font-bold" />}
          classname="bg-[#1e272e20]"
        />
      </div>
    );
  };

  return <div className="relative w-full mt-6">{renderUserCounts()}</div>;
};

export default UsersCount;
