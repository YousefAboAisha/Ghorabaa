import { create } from "zustand";
import { toast } from "react-toastify";

type FavoriteStore = {
  count: number;
  setCount: (count: number) => void;
  fetchAndUpdateCount: () => Promise<void>;
  removeFromFavorites: (
    storyId: string,
    onSuccess?: () => void
  ) => Promise<void>;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
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
      const { data } = await res.json();
      set({ count: data?.length || 0 });
    } catch (err) {
      console.error("Failed to fetch favorites count", err);
    }
  },

  removeFromFavorites: async (storyId, onSuccess) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/updateFavorite/${storyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            isFavorite: false,
          }),
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      // Optionally refetch the count after removal
      await get().fetchAndUpdateCount();

      // Run callback (e.g., refetchData)
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      toast.error("حدث خطأ أثناء إزالة القصة من المحفوظات");
    }
  },
}));
