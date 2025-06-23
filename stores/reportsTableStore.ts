import { ReportWithUserDataInterface } from "@/app/interfaces";
import { create } from "zustand";

interface reportsTableSatate {
  data: ReportWithUserDataInterface[] | [];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useReportsTableData = create<reportsTableSatate>((set) => ({
  data: [],
  loading: true,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/fetch`,
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

      const data = await res.json();
      console.log("Users table data are fetched: ", data);
      set({ data, error: null, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطأ غير معروف";
      console.error("حدث خطأ أثناء جلب بيانات المستخدمين:", error);
      set({ error: message, loading: false });
    }
  },
}));
