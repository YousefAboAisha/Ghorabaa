"use client";
import { allStoriesStatisticsInterface } from "@/app/interfaces";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import StatisticCard from "@/components/UI/cards/statisticCard";
import StatisticsCardSkeletonLoader from "@/components/UI/loaders/statisticsCardSkeletonLoader";
import AllStoriesTable from "@/components/UI/tables/allStoriesTable";
import { useStatisticsStore } from "@/stores/storiesTableStore";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data, loading, error, fetchStatistics } = useStatisticsStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

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
        <AllStoriesTable refetchData={fetchStatistics} />
      </div>
    </div>
  );
};

export default Dashboard;
