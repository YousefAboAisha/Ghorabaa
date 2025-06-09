"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GrNotification } from "react-icons/gr";
import NotificationCard from "../cards/notificationCard";
import Link from "next/link";
import { Session } from "next-auth";
import { useEffect } from "react";

import NotificationSkeletonLoader from "../loaders/notificationSkeletonLoader";
import { useNotificationStore } from "@/stores/notificationStore";

type NotificationPopperProps = {
  session: Session | null;
};

function NotificationPopper({ session }: NotificationPopperProps) {
  const user_id = session?.user?.id as string;

  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const notifications = useNotificationStore((state) => state.notifications);
  const loading = useNotificationStore((state) => state.loading);
  const hasUnread = useNotificationStore((state) => state.hasUnread);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

  useEffect(() => {
    if (user_id) fetchNotifications(user_id);
  }, [fetchNotifications]);

  return (
    <Menu as="div">
      <MenuButton
        as="button"
        disabled={loading}
        className="relative group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
        onClick={markAllAsRead}
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
        className="flex flex-col gap-2 w-10/12 md:w-[450px] bg-background_light z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none pb-4"
      >
        <div className="flex flex-col gap-1 p-1.5 max-h-[50vh] overflow-y-auto">
          {loading ? (
            <NotificationSkeletonLoader length={1} />
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <MenuItem key={index} as={Link} href={notification.href || "#"}>
                <NotificationCard
                  type={notification.notification_type}
                  createdAt={notification.createdAt}
                  is_read={notification.is_read}
                  message={notification.message}
                />
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
