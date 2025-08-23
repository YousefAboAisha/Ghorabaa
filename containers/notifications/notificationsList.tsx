import {
  CommentNotificationInterface,
  NotificationInterface,
} from "@/app/interfaces";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import NotificationCard from "@/components/UI/cards/notificationCard";
import { cookies } from "next/headers";
import Link from "next/link";

const NotificationsList = async () => {
  const cookieStore = await cookies(); // Access current cookies

  const notificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/notifications/fetch`,
    {
      headers: {
        Cookie: cookieStore.toString(), // ⬅️ Forward cookies
      },
    }
  );

  const result = await notificationResponse.json();
  const notificationData: CommentNotificationInterface[] = result.data;

  return (
    <div className="flex flex-col gap-2 pb-4 mt-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">كافة الإشعارات</h2>
        <h2 className="text-xl font-semibold">({notificationData?.length})</h2>
      </div>

      <div className="relative flex flex-col gap-2 mt-4">
        {notificationData.length > 0 ? (
          notificationData.map((notification: NotificationInterface, index) => {
            return (
              <Link key={index} href={notification.href || "#"}>
                <NotificationCard
                  type={notification.notification_type}
                  createdAt={notification.createdAt}
                  is_read={notification.is_read}
                  message={notification.message}
                />
              </Link>
            );
          })
        ) : (
          <NoDataMessage className="h-[60vh]" />
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
