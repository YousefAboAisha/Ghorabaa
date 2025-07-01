"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UserAnalyticsCard from "@/components/UI/cards/userAnalyticsCard";
import { useEffect, useState } from "react";

const UserAnalytics = () => {
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/count/fetch`,
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

  const renderUserRoleCount = () => {
    if (usersCountLoader)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;

    if (userCountsError)
      return (
        <ErrorMessage
          error={userCountsError}
          className="!min-h-full !border-none"
        />
      );

    return (
      <div className="flex items-center flex-wrap gap-4">
        <UserAnalyticsCard
          title="كافة المستخدمين"
          count={usersData.TOTAL}
          className="bg-pending"
        />

        <UserAnalyticsCard
          title={"مشرف"}
          count={usersData.ADMIN}
          className="bg-primary"
        />

        <UserAnalyticsCard
          title={"محرر"}
          count={usersData.EDITOR}
          className="bg-blueColor"
        />

        <UserAnalyticsCard
          title={"مستخدم عادي"}
          count={usersData.USER}
          className="bg-secondary"
        />
      </div>
    );
  };

  return <div className="w-full">{renderUserRoleCount()}</div>;
};

export default UserAnalytics;
