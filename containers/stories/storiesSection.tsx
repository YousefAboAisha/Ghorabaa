import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const StoriesSection = async () => {
  await sleep(3000); // Simulate 3 seconds server delay

  const fetchStoriesData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/fetch`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch data");
    }

    return res.json();
  };
  const { data } = await fetchStoriesData();

  console.log("recentlyAdded data", data);

  return (
    <div className="relative min-h-[70vh] mb-12 mt-8">
      <div className="cards-grid-4">
        {data?.map((martyr: StoryInterface) => (
          <StoryCard key={martyr._id as string} data={martyr} />
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
