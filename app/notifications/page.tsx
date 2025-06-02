import NotificationsList from "@/containers/notifications/notificationsList";
import { Suspense } from "react";
import NotificationSkeletonLoader from "@/components/UI/loaders/notificationSkeletonLoader";

const Page = async () => {
  return (
    <div className="container lg:w-6/12 mt-32">
      <Suspense
        fallback={
          <NotificationSkeletonLoader
            length={3}
            className="mt-6 flex flex-col gap-4"
          />
        }
      >
        <NotificationsList />
      </Suspense>
    </div>
  );
};

export default Page;
