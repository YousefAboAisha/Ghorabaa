import { CommentNotificationInterface } from "@/app/interfaces";
import NotificationCard from "@/components/UI/cards/notificationCard";
import { getNotificationHrefPath } from "@/utils/text";
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
      {notificationData.map((notification, index) => {
        const hrefPath = getNotificationHrefPath(
          notification.notification_type,
          notification.story_id as string
        );
        return (
          <Link key={index} href={hrefPath as string}>
            <NotificationCard
              type={notification.notification_type}
              createdAt={notification.createdAt}
              author_name={
                "author_name" in notification ? notification.author_name : ""
              }
              story_name={
                "story_name" in notification ? notification.story_name : ""
              }
              is_read={notification.is_read}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default NotificationsList;
