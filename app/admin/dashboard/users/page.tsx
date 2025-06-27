"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UsersTable from "@/components/UI/tables/usersTable";
import UserGrowthLineChart from "@/components/UI/charts/UserGrowthLineChart";

interface ActiveUserData {
  user_id: string;
  name: string;
  email: string;
  image?: string;
  stories: number;
  comments: number;
  total: number;
}

interface UserGrowthData {
  date: string;
  users: number;
}

const Users = () => {
  const [usersCountLoader, setUsersCountLoader] = useState(true);
  const [activeUsersCount, setActiveUsersCount] = useState(true);

  const [userCountsError, setUserCountsError] = useState<string | null>(null);
  const [activeUsersError, setActiveUsersError] = useState<string | null>(null);

  const [usersData, setUsersData] = useState<UserGrowthData[]>([]);
  const [activeUsersData, setActiveUsersData] = useState<ActiveUserData[]>([]);

  const fetchUserCountStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/fetch`,
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
      console.log("📊 Users Statistics data:", data);
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

  const fetchActiveUsersStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/active/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
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
      console.log("🔥 Most Active Users data:", data);
      setActiveUsersData(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setActiveUsersError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setActiveUsersCount(false);
    }
  };

  useEffect(() => {
    fetchUserCountStatistics();
    fetchActiveUsersStatistics();
  }, []);

  const renderUsersCountContent = () => {
    if (usersCountLoader)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    if (userCountsError)
      return (
        <ErrorMessage
          error={userCountsError}
          className="!min-h-full !border-none"
        />
      );
    if (usersData.length > 0) return <UserGrowthLineChart data={usersData} />;
    return null;
  };

  const renderActiveUsersContent = () => {
    if (activeUsersCount)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    if (activeUsersError)
      return (
        <ErrorMessage
          error={activeUsersError}
          className="!min-h-full !border-none"
        />
      );
    if (activeUsersData.length === 0) return null;

    return (
      <div className="relative cards-grid-2 p-4 bg-white rounded-lg max-h-[60vh] overflow-auto">
        {activeUsersData.map((user, index) => (
          <div
            key={user.user_id}
            className="relative min-w-fit h-fit bg-background_light border rounded-md hover:shadow-sm duration-150"
          >
            <div className="absolute top-1 right-1 flex items-center justify-center rounded-md p-1.5 text-[13px] text-white bg-primary font-semibold">
              #{index + 1}
            </div>

            <div className="flex flex-col w-fit items-center gap-2 p-6 py-4 mx-auto">
              <Image
                alt="صورة المستخدم"
                src={user.image || "/notFound.png"}
                width={75}
                height={75}
                className="rounded-full object-cover"
              />

              <div className="flex flex-col flex-wrap gap-1 items-center justify-center text-center">
                <Link
                  href={`/profile/${user.user_id}`}
                  target="_blank"
                  className="text-[13px] font-normal hover:underline"
                >
                  {user.name || "مستخدم غير معروف"}
                </Link>
                <p className="font-light text-[12px] break-words">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center border-t">
              <div className="flex flex-col justify-center items-center gap-1 w-full h-full p-6 py-4 border-l">
                <h4 className="text-[13px] font-light">القصص</h4>
                <p className="text-lg font-bold">{user.stories}</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-1 w-full h-full p-6 py-4">
                <h4 className="text-sm font-light">التعليقات</h4>
                <p className="text-lg font-bold">{user.comments}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[60vh]">
        <div className="relative bg-white border rounded-lg">
          {renderActiveUsersContent()}
        </div>

        <div className="relative bg-white border rounded-lg p-3">
          {renderUsersCountContent()}
        </div>
      </div>

      <div className="mt-12">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
