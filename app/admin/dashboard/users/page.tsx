"use client";
import React, { useEffect, useState } from "react";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UsersTable from "@/components/UI/tables/usersTable";
import UserGrowthLineChart from "@/components/UI/charts/userGrowthLineChart";

interface UserGrowthData {
  date: string;
  users: number;
}

const Users = () => {
  const [usersCountLoader, setUsersCountLoader] = useState(true);

  const [userCountsError, setUserCountsError] = useState<string | null>(null);

  const [usersData, setUsersData] = useState<UserGrowthData[]>([]);

  const fetchUserCountStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/users/users-growth/fetch`,
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
      setUsersData(data);
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
    fetchUserCountStatistics();
  }, []);

  const renderUsersCountContent = () => {
    if (usersCountLoader)
      return (
        <div className="relative w-full h-[40vh] rounded-xl bg-gray-300 animate-pulse"></div>
      );

    if (userCountsError)
      return (
        <ErrorMessage
          error={userCountsError}
          className="!border-none !min-h-[40vh]"
        />
      );
    if (usersData.length > 0) return <UserGrowthLineChart data={usersData} />;
    return null;
  };

  return (
    <div className="relative">
      <div className="relative bg-white border rounded-lg p-4 min-h-[40vh]">
        {renderUsersCountContent()}
      </div>

      <div className="mt-12">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
