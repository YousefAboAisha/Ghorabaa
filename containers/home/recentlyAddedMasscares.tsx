import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import RecentlyAddedSwiper from "@/components/UI/swipers/massacres/recentlyAddedSwiper";

const RecentlyAddedMasscares = async () => {
  // Fetch the data of recently added stories
  const fetchRecentlyAddedStories = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/recentlyAdded/fetch`,
      {
        cache: "force-cache",
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

  return <RecentlyAddedSwiper data={data} />;
};

export default RecentlyAddedMasscares;
