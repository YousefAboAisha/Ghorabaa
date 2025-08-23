"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ReportsGrowthLineChart from "@/components/UI/charts/reportsGrowthLineChart";
import ReportsResolutionPieChart from "@/components/UI/charts/reportsResolutionPieChart";
import ReportsTable from "@/components/UI/tables/reportsTable";
import { useEffect, useState } from "react";

interface ReportGrowthData {
  date: string;
  reports: number;
}

interface ResolutionData {
  label: string;
  count: number;
}

const Reports = () => {
  const [reportsCountLoading, setReportsCountLoading] = useState(true);
  const [reportsCountsError, setReportsCountsError] = useState<string | null>(
    null
  );
  const [reportsData, setReportsData] = useState<ReportGrowthData[]>([]);

  const [resolutionData, setResolutionData] = useState<ResolutionData[]>([]);
  const [resolutionLoading, setResolutionLoading] = useState(true);
  const [resolutionError, setResolutionError] = useState<string | null>(null);

  const fetchReportsCountStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/reports/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setReportsCountLoading(false);
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
      setReportsData(data);
    } catch (error) {
      setReportsCountLoading(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setReportsCountsError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setReportsCountLoading(false);
    }
  };

  const fetchReportsResolutionStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/reports/resolution/fetch`,
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
      setResolutionData(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setResolutionError(message);
      console.error("Error fetching resolution statistics:", error);
    } finally {
      setResolutionLoading(false);
    }
  };

  const renderUsersCountContent = () => {
    if (reportsCountLoading)
      return (
        <div className="relative w-full h-full rounded-xl bg-gray-300 animate-pulse"></div>
      );

    if (reportsCountsError)
      return (
        <ErrorMessage
          error={reportsCountsError}
          className="!min-h-full !border-none"
        />
      );

    if (reportsData.length <= 0) {
      return (
        <NoDataMessage message="لا يوجد بيانات" className="!border-none" />
      );
    }

    if (reportsData.length > 0)
      return <ReportsGrowthLineChart data={reportsData} />;

    return null;
  };

  const renderReportsResolutionContent = () => {
    if (resolutionLoading)
      return (
        <div className="relative w-full h-full rounded-xl bg-gray-300 animate-pulse"></div>
      );

    if (resolutionError)
      return (
        <ErrorMessage
          error={resolutionError}
          className="!min-h-full !border-none"
        />
      );

    if (resolutionData.length <= 0) {
      return (
        <NoDataMessage message="لا يوجد بيانات" className="!border-none" />
      );
    }

    return <ReportsResolutionPieChart data={resolutionData} />;
  };

  useEffect(() => {
    fetchReportsCountStatistics();
    fetchReportsResolutionStatistics();
  }, []);

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[60vh]">
        <div className="relative bg-white border rounded-lg p-3">
          {renderUsersCountContent()}
        </div>

        <div className="relative bg-white border rounded-lg p-3">
          {renderReportsResolutionContent()}
        </div>
      </div>

      <div className="mt-12">
        <ReportsTable />
      </div>
    </div>
  );
};

export default Reports;
