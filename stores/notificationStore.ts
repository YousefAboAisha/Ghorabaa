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
  fetchNotifications: (userId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  hasUnread: false,
  loading: false,

  fetchNotifications: async (userId: string) => {
    if (!userId) return;
    set({ loading: true });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/notifications/fetch`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("حدث خطأ أثناء جلب البيانات");

      const { data, hasUnread } = await res.json();
      console.log("[data, hasUnRead]", [data, hasUnread]);

      set({
        notifications: [...data],
        hasUnread,
        loading: false,
      });
    } catch (error) {
      console.error("Notification fetch error:", error);
      set({ loading: false });
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
