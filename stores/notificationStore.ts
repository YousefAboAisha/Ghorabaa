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
  pollUnreadAndFetchIfChanged: (userId: string) => Promise<void>;
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
        notifications: data,
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

      set((state) => ({
        hasUnread: false,
        notifications: state.notifications.map((n) => ({
          ...JSON.parse(JSON.stringify(n)),
          is_read: true,
        })) as MixedNotification[],
      }));
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  },

  pollUnreadAndFetchIfChanged: async (userId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/notifications/unread/fetch?user_id=${userId}`
    );
    const { hasUnread } = await res.json();

    set((state) => {
      if (hasUnread && !state.hasUnread) {
        // fetch full notifications if new ones appeared
        state.fetchNotifications(userId);
      }
      return { hasUnread };
    });
  },
}));
