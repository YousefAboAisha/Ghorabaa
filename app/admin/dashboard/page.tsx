"use client";
import { allStoriesStatisticsInterface } from "@/app/interfaces";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import StatisticCard from "@/components/UI/cards/statisticCard";
import StatisticsCardSkeletonLoader from "@/components/UI/loaders/statisticsCardSkeletonLoader";
import AllStoriesTable from "@/components/UI/tables/allStoriesTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState<allStoriesStatisticsInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    APPROVED: "#16a34a", // Green
    PENDING: "#f59e0b", // Yellow
    REJECTED: "#ef4444", // Red
  };

  const statusLabels: Record<string, string> = {
    APPROVED: "القصص المقبولة",
    PENDING: "القصص قيد المراجعة",
    REJECTED: "القصص المرفوضة",
  };

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    console.log("Fetching statistics...");

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/allStories/fetch`,
      {
        cache: "no-store",
      }
    )
      .then((res) => {
        if (!res.ok) {
          setLoading(false);
          throw new Error("حدث خطأ أثناء جلب الإحصائيات");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Statistics data:", data);
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching statistics:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <div className="relative">
      {renderContent()}

      <div className="mt-12">
        <AllStoriesTable />
      </div>
    </div>
  );
};

export default Dashboard;
