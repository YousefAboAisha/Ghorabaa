"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/visits/fetch`,
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

  const renderVisitsData = () => {
    if (loading)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    if (error)
      return (
        <ErrorMessage error={error} className="!min-h-full !border-none" />
      );
    if (data.length > 0) return <VisitsLineChart data={data} />;
    return null;
  };

  return <div>{renderVisitsData()}</div>;
};

export default VisitsAnalytics;
