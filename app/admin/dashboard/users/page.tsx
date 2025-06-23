"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UserGrowthLineChart from "@/components/UI/charts/UserGrowthLineChart";
import UsersTable from "@/components/UI/tables/usersTable";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);

  const fetchStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/fetch`,
        {
          cache: "no-store",
        }
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
      console.log("📊 Users Statistics data:", data);
      setData(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    }

    if (error) {
      return (
        <ErrorMessage
          error="حدث خطأ أثناء جلب الإحصائيات"
          className="!min-h-full !border-none"
        />
      );
    }

    if (data && data.length > 0) {
      return <UserGrowthLineChart data={data} />;
    }
  };

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[60vh]">
        <div className="relative p-4 bg-white border rounded-lg">
          <p>Line chart OR Pie chart</p>
          <p>
            توضيح عدد المستخدمين للمنصة ومدى الإقبال عليها ونسبة الزيادة فيها من
            ناحية المستخدمين
          </p>
        </div>

        <div className="relative bg-white border rounded-lg p-3">
          {renderContent()}
        </div>
      </div>

      <div className="mt-12">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
