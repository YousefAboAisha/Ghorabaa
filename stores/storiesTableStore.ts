import { create } from "zustand";

interface StatisticsData {
  // Define your expected data structure here
  approved: number;
  pending: number;
  rejected: number;
  [key: string]: any; // optional for flexibility
}

interface StatisticsState {
  data: StatisticsData | null;
  loading: boolean;
  error: string | null;
  fetchStatistics: () => Promise<void>;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  data: null,
  loading: true,
  error: null,

  fetchStatistics: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/stories/count/fetch`,
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
      console.log("📊 Statistics data from store:", data);
      set({ data, error: null, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطأ غير معروف";
      console.error("Error fetching statistics:", error);
      set({ error: message, loading: false });
    }
  },
}));
