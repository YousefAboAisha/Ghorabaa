"use client";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import StoriesGrowthLineChart from "@/components/UI/charts/storiesGrowthLineChart";
import StoriesResolutionPieChart from "@/components/UI/charts/storiesResolutionPieChart";
import { useEffect, useState } from "react";

interface StoriesGrowthData {
  date: string;
  stories: number;
}

interface ResolutionData {
  label: string;
  count: number;
}

const StoriesAnalytics = () => {
  const [storiesGrowthLoader, setStoriesGrowthLoader] = useState(true);
  const [storiesResolutionLoader, setStoriesResolutionLoader] = useState(true);

  const [storiesGrowthError, setStoriesGrowthError] = useState<string | null>(
    null
  );

  const [storiesResolutionError, setStoriesResolutionError] = useState<
    string | null
  >(null);

  const [storiesGrowthData, setStoriesGrowthData] = useState<
    StoriesGrowthData[]
  >([]);
  const [storiesResolutionData, setStoriesResolutionData] = useState<
    ResolutionData[]
  >([]);

  const fetchStoriesGrowthStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/stories/stories-growth/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setStoriesGrowthLoader(false);
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
      setStoriesGrowthData(data);
    } catch (error) {
      setStoriesGrowthLoader(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setStoriesGrowthError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setStoriesGrowthLoader(false);
    }
  };

  const fetchStoriesResolutionStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/stories/resolution/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setStoriesResolutionLoader(false);
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
      setStoriesResolutionData(data);
    } catch (error) {
      setStoriesResolutionLoader(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setStoriesResolutionError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setStoriesResolutionLoader(false);
    }
  };

  useEffect(() => {
    fetchStoriesGrowthStatistics();
    fetchStoriesResolutionStatistics();
  }, []);

  const renderStoriesGrowthContent = () => {
    if (storiesGrowthError)
      return (
        <ErrorMessage
          error={storiesGrowthError}
          className="min-h-[40vh] !border-none"
        />
      );

    if (storiesGrowthLoader)
      return (
        <div className="relative w-full h-full rounded-xl bg-gray-300 animate-pulse"></div>
      );

    if (storiesGrowthData.length > 0)
      return <StoriesGrowthLineChart data={storiesGrowthData} />;
    return null;
  };

  const renderStoriesResolutionContent = () => {
    if (storiesResolutionLoader)
      return (
        <div className="relative w-full h-full rounded-xl bg-gray-300 animate-pulse"></div>
      );

    if (storiesResolutionError)
      return (
        <ErrorMessage
          error={storiesGrowthError as string}
          className="min-h-[40vh] !border-none"
        />
      );

    if (storiesResolutionData.length > 0)
      return <StoriesResolutionPieChart data={storiesResolutionData} />;
    return null;
  };

  return (
    <div className="relative mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="relative flex items-center min-h-[40vh] justify-center p-4 bg-white border rounded-lg">
        {renderStoriesGrowthContent()}
      </div>

      <div className="relative flex items-center min-h-[40vh] justify-center p-4 bg-white border rounded-lg">
        {renderStoriesResolutionContent()}
      </div>
    </div>
  );
};

export default StoriesAnalytics;
