import { NotificationInterface } from "@/app/interfaces";
import NotificationCard from "@/components/UI/cards/notificationCard";
import { cookies } from "next/headers";
import Link from "next/link";

const NotificationsList = async () => {
  const cookieStore = await cookies(); // Access current cookies
  await new Promise((res) => setTimeout(res, 3000)); // simulate 3 sec delay

  const notificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/fetchAll`,
    {
      cache: "no-store", // optional but recommended if dynamic
      headers: {
        Cookie: cookieStore.toString(), // ⬅️ Forward cookies
      },
    }
  );

  const result = await notificationResponse.json();
  const notificationData: NotificationInterface[] = result.data;

  console.log("notification Data", notificationData);

  return (
    <div className="flex flex-col gap-2 pb-4 mt-6">
      {notificationData?.map((elem, index) => {
        return (
          <Link
            key={index}
            href={`/stories/${elem.story_id}`}
            className="w-full"
          >
            <NotificationCard
              type={elem.notification_type}
              title={elem.title}
              createdAt={elem.createdAt}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default NotificationsList;
