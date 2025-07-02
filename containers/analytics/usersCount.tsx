"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UsersCountCard from "@/components/UI/cards/usersCountCard";
import { useEffect, useState } from "react";

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
      console.log("📊 Users Role count data:", data);
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
      return <ErrorMessage error={userCountsError} className="min-h-[40vh]" />;

    if (usersCountLoader)
      return (
        <div className="relative bg-white border rounded-md min-h-[40vh] flex items-center justify-center">
          <p className="text-[12px]">جارٍ جلب التحليلات</p>
        </div>
      );

    return (
      <div className="relative w-full flex items-center flex-wrap gap-4">
        <UsersCountCard
          title="كافة المستخدمين"
          count={usersData.TOTAL}
          countClassname="text-gray_dark"
          classname="border-gray_dark border-b-8"
        />

        <UsersCountCard
          title={"مشرف"}
          count={usersData.ADMIN}
          countClassname="text-primary"
          classname="border-primary border-b-8"
        />

        <UsersCountCard
          title={"محرر"}
          count={usersData.EDITOR}
          countClassname="text-blueColor"
          classname="border-blueColor border-b-8"
        />

        <UsersCountCard
          title={"مستخدم عادي"}
          count={usersData.USER}
          countClassname="text-secondary"
          classname="border-secondary border-b-8"
        />
      </div>
    );
  };

  return <div className="relative w-full mt-6">{renderUserCounts()}</div>;
};

export default UsersCount;
