// stores/notificationStore.ts
import { create } from "zustand";
import {
  CommentNotificationInterface,
  StoryNotificationInterface,
} from "@/app/interfaces";

type MixedNotification =
  | StoryNotificationInterface
  | CommentNotificationInterface;

type NotificationState = {
  notifications: MixedNotification[];
  hasUnread: boolean;
  loading: boolean;
  error: string | null;
  fetchNotifications: (userId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  hasUnread: false,
  loading: false,
  error: null,

  fetchNotifications: async (userId: string) => {
    if (!userId) return;
    set({ loading: true });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/notifications/fetch`,
        { credentials: "include" }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء جلب الإشعارات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const { data, hasUnread } = await res.json();
      console.log("[data, hasUnread]", [data, hasUnread]);

      set({
        notifications: data.slice(0, 7),
        hasUnread,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Notification fetch error:", message);
      set({ error: message, loading: false });
    }
  },

  markAllAsRead: async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/notifications/patch`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      set({ hasUnread: false });
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  },
}));
