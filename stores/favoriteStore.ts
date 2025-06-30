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
  toggleFavorite: (
    storyId: string,
    currentFavoriteState: boolean,
    onStateChange?: (newState: boolean) => void
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

      await get().fetchAndUpdateCount();

      if (onSuccess) onSuccess();
      toast.warn("تمت إزالة القصة من قائمة المحفوظات");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      toast.error("حدث خطأ أثناء إزالة القصة من المحفوظات");
    }
  },

  toggleFavorite: async (storyId, currentFavoriteState, onStateChange) => {
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
            isFavorite: !currentFavoriteState,
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        const errorMsg = data?.message || "حدث خطأ أثناء تحديث حالة القصة";
        console.error("Server responded with an error:", errorMsg);
        toast.error(errorMsg);
        return;
      }

      const isFavorited = data.favorited;
      if (onStateChange) onStateChange(isFavorited);

      await get().fetchAndUpdateCount();

      if (isFavorited) {
        toast.success("تمت إضافة القصة إلى قائمة المحفوظات");
      } else {
        toast.warn("تمت إزالة القصة من قائمة المحفوظات");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث حالة القصة";
      console.error("Failed to toggle favorite:", error);
      toast.error(message);
    }
  },
}));
