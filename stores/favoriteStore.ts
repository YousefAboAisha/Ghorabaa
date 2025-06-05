import { create } from "zustand";

type FavoriteStore = {
  count: number;
  setCount: (count: number) => void;
  fetchAndUpdateCount: () => Promise<void>;
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  fetchAndUpdateCount: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/favorites/fetch`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      set({ count: data?.data?.length || 0 });
    } catch (err) {
      console.error("Failed to fetch favorites count", err);
    }
  },
}));
