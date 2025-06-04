import ErrorMessage from "@/components/responseMessages/errorMessage";
import ImagesSwiper from "@/components/UI/imagesSwiper";
import { Session } from "next-auth";
import { cookies } from "next/headers"; // App Router only

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

    if (!res.ok) {
      console.log("Failed to fetch data");
    }

    return res.json();
  };

  const { data, error } = await fetchRecentlyAddedStories();

  if (error) {
    return <ErrorMessage error={error} className="mt-4" />;
  }

  if (data) {
    return <ImagesSwiper data={data} session={session} />;
  }
};

export default RecentlyAddedStories;
