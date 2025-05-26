import NetworkErrorPage from "@/components/responseMessages/networkErrorPage";
import ImagesSwiper from "@/components/UI/imagesSwiper";
import { Session } from "next-auth";
import { cookies } from "next/headers"; // App Router only

type RecentlyAddedStories = {
  session: Session | null;
};

const RecentlyAddedStories = async ({ session }: RecentlyAddedStories) => {
  const fetchRecentlyAddedStories = async () => {
    const cookieStore = await cookies(); // Access current cookies

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/recentlyAdded/fetch`,
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

  const { data } = await fetchRecentlyAddedStories();

  return data ? (
    <ImagesSwiper data={data} session={session} />
  ) : (
    <NetworkErrorPage />
  );
};

export default RecentlyAddedStories;
