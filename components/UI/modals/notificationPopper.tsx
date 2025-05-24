"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrNotification } from "react-icons/gr";
import NotificationCard from "../cards/notificationCard";
import Link from "next/link";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { NotificationInterface } from "@/app/interfaces";
import NotificationSkeletonLoader from "../loaders/notificationSkeletonLoader";

type NotificationPopperProps = {
  session: Session | null;
};

function NotificationPopper({ session }: NotificationPopperProps) {
  const [notificationsData, setNotificationsData] = useState<
    NotificationInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/notification/fetch", {
          credentials: "include",
        });

        const result = await res.json();

        if (res.ok) {
          setNotificationsData(result.data || []);
        } else {
          console.error("Failed to fetch notifications:", result.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [session?.user?.id]);

  console.log("notifications Data", notificationsData);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Menu as={"div"}>
        <MenuButton
          as={"button"}
          className="group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
          disabled={loading}
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
              </p>
            </div>
          )}
        </MenuButton>

        <MenuItems
          anchor={{ to: "bottom start", gap: "4px" }}
          transition
          className="flex flex-col gap-2 min-w-[400px] bg-background_light z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none pb-4 "
        >
          <div className="flex flex-col gap-1 p-1.5 max-h-[50vh] overflow-y-auto ">
            {loading ? (
              <NotificationSkeletonLoader length={1} />
            ) : notificationsData.length > 0 ? (
              notificationsData.map((elem, index) => {
                return (
                  <MenuItem key={index}>
                    <Link href={`/stories/${elem.story_id}`} className="w-full">
                      <NotificationCard
                        type={elem.notification_type}
                        title={elem.title}
                        createdAt={elem.createdAt}
                      />
                    </Link>
                  </MenuItem>
                );
              })
            ) : (
              <div className="w-full h-32 bg-white flex items-center justify-center p-2 rounded-lg border ">
                <p className="text-[11px]">لا توجد إشعارات جديدة!</p>
              </div>
            )}

            <MenuItem>
              <Link
                href={"/notifications"}
                className="flex items-center gap-2 text-primary text-[11px] hover:underline cursor-pointer font-bold mt-2 w-fit mx-auto"
              >
                <p> كافة الإشعارات </p>
                <GrNotification size={12} className="rotate-[30deg]" />
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default NotificationPopper;
