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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/allStories/fetch`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء جلب الإحصائيات");
      }

      const data = await res.json();
      console.log("📊 Statistics data from store:", data);
      set({ data, error: null, loading: false });
    } catch (error: any) {
      console.error("Error fetching statistics:", error);
      set({ error: error.message || "خطأ غير معروف", loading: false });
    }
  },
}));
