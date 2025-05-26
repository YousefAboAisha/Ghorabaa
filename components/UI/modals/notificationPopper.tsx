"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GrNotification } from "react-icons/gr";
import NotificationCard from "../cards/notificationCard";
import Link from "next/link";
import { Session } from "next-auth";
import { useEffect, useState, useCallback } from "react";
import {
  CommentNotificationInterface,
  StoryNotificationInterface,
} from "@/app/interfaces";
import NotificationSkeletonLoader from "../loaders/notificationSkeletonLoader";
import { NotificationTypes } from "@/app/enums";

type NotificationPopperProps = {
  session: Session | null;
};

type MixedNotification =
  | StoryNotificationInterface
  | CommentNotificationInterface;

function NotificationPopper({ session }: NotificationPopperProps) {
  const [notifications, setNotifications] = useState<MixedNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      setLoading(true);
      const res = await fetch("/api/notification/fetch", {
        credentials: "include",
      });
      const result = await res.json();

      if (res.ok) {
        setNotifications(result.data || []);
        setHasUnread(result.hasUnread);
      } else {
        console.error("Failed to fetch notifications:", result.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const markAsRead = async () => {
    try {
      await fetch("/api/notification/patch", {
        method: "PATCH",
        credentials: "include",
      });
      setHasUnread(false);
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Menu as="div">
      <MenuButton
        as="button"
        disabled={loading}
        className="relative group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
        onClick={markAsRead}
      >
        {({ active }) => (
          <div className="flex items-center gap-1">
            <p
              title="الإشعارات"
              className={`flex items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full ${
                active && "bg-gray_light"
              }`}
            >
              <GrNotification size={17} />
              {hasUnread && !active && (
                <span className="absolute top-2 left-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </p>
          </div>
        )}
      </MenuButton>

      <MenuItems
        anchor={{ to: "bottom start", gap: "4px" }}
        transition
        className="flex flex-col gap-2 min-w-[400px] bg-background_light z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none pb-4"
      >
        <div className="flex flex-col gap-1 p-1.5 max-h-[50vh] overflow-y-auto">
          {loading ? (
            <NotificationSkeletonLoader length={1} />
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <MenuItem key={index}>
                <Link
                  href={`/stories/${notification.story_id}${
                    notification.notification_type === NotificationTypes.COMMENT
                      ? `#comment`
                      : ""
                  }`}
                  className="w-full"
                >
                  <NotificationCard
                    type={notification.notification_type}
                    createdAt={notification.createdAt}
                    author_name={
                      "author_name" in notification
                        ? notification.author_name
                        : ""
                    }
                    name={"name" in notification ? notification.name : ""}
                  />
                </Link>
              </MenuItem>
            ))
          ) : (
            <div className="w-full h-32 bg-white flex items-center justify-center p-2 rounded-lg border">
              <p className="text-[11px]">لا توجد إشعارات جديدة!</p>
            </div>
          )}

          <MenuItem>
            <Link
              href="/notifications"
              className="flex items-center gap-2 text-primary text-[11px] hover:underline cursor-pointer font-bold mt-2 w-fit mx-auto"
            >
              <p>كافة الإشعارات</p>
              <GrNotification size={12} className="rotate-[30deg]" />
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default NotificationPopper;
