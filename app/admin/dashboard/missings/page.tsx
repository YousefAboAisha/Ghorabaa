"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import StatisticCard from "@/components/UI/cards/statisticCard";
import StatisticsCardSkeletonLoader from "@/components/UI/loaders/statisticsCardSkeletonLoader";
import MissingsTable from "@/components/UI/tables/missingsTable";
import { StatisticsData } from "@/stores/storiesTableStore";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<StatisticsData | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const statusColors: Record<string, string> = {
    APPROVED: "#16a34a", // Green
    PENDING: "#f59e0b", // Yellow
    REJECTED: "#ef4444", // Red
  };

  const statusLabels: Record<string, string> = {
    APPROVED: "المقبولين",
    PENDING: " قيد المراجعة",
    REJECTED: " المرفوضين",
  };

  const fetchStatistics = async () => {
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/missings/count/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء جلب الإحصائيات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطأ غير معروف";
      setLoading(false);
      setError(message);
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <StatisticsCardSkeletonLoader length={3} className="mt-6" />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (data)
      return (
        <div className="cards-grid-3 mt-6 gap-4">
          {Object.entries(data).map(([status, data]) => (
            <StatisticCard
              key={status}
              label={statusLabels[status] || status}
              color={statusColors[status] || "#000"}
              data={data}
            />
          ))}
        </div>
      );
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="relative h-screen">
      {renderContent()}
      <div className="mt-12">
        <MissingsTable />
      </div>
    </div>
  );
};

export default Page;
