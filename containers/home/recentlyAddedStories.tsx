import NetworkErrorPage from "@/components/networkErrorPage";
import ImagesSwiper from "@/components/UI/imagesSwiper";
import { cookies } from "next/headers"; // App Router only

const RecentlyAddedStories = async () => {
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

  return data ? <ImagesSwiper data={data} /> : <NetworkErrorPage />;
};

export default RecentlyAddedStories;
