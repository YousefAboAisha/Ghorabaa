import ImagesSwiper from "@/components/UI/imagesSwiper";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const RecentlyAddedStories = async () => {
  await sleep(2000); // Simulate 3 seconds server delay

  const fetchRecentlyAddedStories = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/recentlyAdded`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    return res.json();
  };

  const { data } = await fetchRecentlyAddedStories();

  console.log("recentlyAdded data", data);

  return <ImagesSwiper data={data} />;
};

export default RecentlyAddedStories;
