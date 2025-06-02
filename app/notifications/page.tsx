import PageTitles from "@/components/UI/typography/pageTitles";
import NotificationsList from "@/containers/notifications/notificationsList";
import { Suspense } from "react";
import NotificationSkeletonLoader from "@/components/UI/loaders/notificationSkeletonLoader";

const Page = async () => {
  return (
    <div className="container mt-24">
      <div className="w-full md:container">
        <PageTitles />
        <div className="relative w-full mt-12">
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
      </div>
    </div>
  );
};

export default Page;
