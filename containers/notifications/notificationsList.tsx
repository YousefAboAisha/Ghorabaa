import { CommentNotificationInterface } from "@/app/interfaces";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import NotificationCard from "@/components/UI/cards/notificationCard";
import { cookies } from "next/headers";
import Link from "next/link";

const NotificationsList = async () => {
  const cookieStore = await cookies(); // Access current cookies

  const notificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/fetchAll`,
    {
      headers: {
        Cookie: cookieStore.toString(), // ⬅️ Forward cookies
      },
    }
  );

  const result = await notificationResponse.json();
  const notificationData: CommentNotificationInterface[] = result.data;

  console.log("notification Data", notificationData);

  return (
    <div className="flex flex-col gap-2 pb-4 mt-6">
      {notificationData.length > 0 ? (
        notificationData.map((notification, index) => {
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
  );
};

export default NotificationsList;
