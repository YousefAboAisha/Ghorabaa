import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import RecentlyAddedStoriesSwiper from "@/components/UI/swipers/home/recentlyAddedStoriesSwiper";
import { Session } from "next-auth";
import { cookies } from "next/headers"; // App Router only
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

type RecentlyAddedStories = {
  session: Session | null;
};

const RecentlyAddedStories = async ({ session }: RecentlyAddedStories) => {
  // Fetch the data of recently added stories
  const fetchRecentlyAddedStories = async () => {
    const cookieStore = await cookies(); // Access current cookies

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/recentlyAdded/fetch`,
      {
        headers: {
          Cookie: cookieStore.toString(), // ⬅️ Forward cookies
        },
        cache: "no-store",
      }
    );

    return res.json();
  };

  const { data, error } = await fetchRecentlyAddedStories();

  if (error) {
    return <ErrorMessage error={error} className="mt-4" />;
  }

  if (data.length == 0) {
    return <NoDataMessage className="mt-8" />;
  }

  if (data) {
    return (
      <div className="flex flex-col">
        <RecentlyAddedStoriesSwiper data={data} session={session} />
        <Link
          href={"/stories"}
          className="text-primary flex items-center gap-2 justify-center hover:underline text-sm w-fit mx-auto"
        >
          <p>عرض الكل</p>
          <BsArrowLeft />
        </Link>
      </div>
    );
  }
};

export default RecentlyAddedStories;
