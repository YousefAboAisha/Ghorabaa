import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import RecentlyAddedMassacresSwiper from "@/components/UI/swipers/massacres/recentlyAddedMassacresSwiper";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const RecentlyAddedMasscares = async () => {
  // Fetch the data of recently added stories
  const fetchRecentlyMassacres = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/recentlyAdded/fetch`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };

  const { data, error } = await fetchRecentlyMassacres();

  if (error) {
    return <ErrorMessage error={error} className="mt-4" />;
  }

  if (data.length == 0) {
    return <NoDataMessage className="mt-8" />;
  }

  return (
    <div className="flex flex-col">
      <RecentlyAddedMassacresSwiper data={data} />;
      <Link
        href={"/massacres"}
        className="text-secondary flex items-center gap-2 justify-center hover:underline text-sm w-fit mx-auto"
      >
        <p>كافة المجازر</p>
        <BsArrowLeft />
      </Link>
    </div>
  );
};

export default RecentlyAddedMasscares;
