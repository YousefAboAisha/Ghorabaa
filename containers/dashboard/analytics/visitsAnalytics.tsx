"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import VisitsLineChart from "@/components/UI/charts/visitsLineChart";
import { useEffect, useState } from "react";

interface DataPoint {
  date: string;
  visits: number;
}

const VisitsAnalytics = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisitsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/visits/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل في تحميل البيانات");
      }

      const { data } = await res.json();
      console.log("Fetched visits data:", data);

      setData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitsData();
  }, []);

  const renderVisits = () => {
    if (error) return <ErrorMessage error={error} className="min-h-[40vh]" />;
    if (loading)
      return (
        <div className="relative bg-white border rounded-md min-h-[40vh] p-4 flex items-center justify-center">
          <div className="relative w-full min-h-[40vh] rounded-xl bg-gray-300 animate-pulse"></div>
        </div>
      );

    if (data.length === 0) return <NoDataMessage className="min-h-[40vh]" />;

    if (data.length > 0) return <VisitsLineChart data={data} />;
  };

  return <div className="relative w-full mt-6">{renderVisits()}</div>;
};

export default VisitsAnalytics;
