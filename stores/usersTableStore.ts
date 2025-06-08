import { UserInterface } from "@/app/interfaces";
import { create } from "zustand";

interface usersTableState {
  data: UserInterface[] | [];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useUsersTableData = create<usersTableState>((set) => ({
  data: [],
  loading: true,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/fetch`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء جلب البيانات");
      }

      const data = await res.json();
      console.log("Users table data are fetched: ", data);
      set({ data, error: null, loading: false });
    } catch (error: any) {
      console.error("حدث خطأ أثناء جلب بيانات المستخدمين:", error);
      set({ error: error.message || "خطأ غير معروف", loading: false });
    }
  },
}));
