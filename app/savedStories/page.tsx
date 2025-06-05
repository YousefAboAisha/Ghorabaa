"use client";
import FavoriteCard from "@/components/UI/cards/favoriteCard";
import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";
import { useEffect, useState } from "react";
import { StoryInterface } from "../interfaces";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";

const Page = () => {
  const [favorites, setFavorites] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavoriteStories = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/favorites/fetch`,
      {
        credentials: "include", // needed for session auth
      }
    )
      .then((res) => {
        if (!res.ok) {
          setLoading(false);
          throw new Error("حدث خطأ أثناء جلب البيانات");
        }

        return res.json();
      })
      .then(({ data }) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message as string);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = () => {
    if (loading)
      return <StoryCardSkeletonLoader length={4} className="cards-grid-4" />;

    if (error) return <ErrorMessage error={error} />;

    if (favorites)
      return favorites.length > 0 ? (
        <div className="cards-grid-4">
          {favorites.map((data) => {
            return (
              <FavoriteCard
                key={data._id as string}
                data={data}
                refetchData={fetchFavoriteStories}
              />
            );
          })}
        </div>
      ) : (
        <NoDataMessage className="min-h-[60vh]" />
      );
  };

  useEffect(() => {
    fetchFavoriteStories();
  }, []);

  console.log("Favorites data", favorites);

  return (
    <div className="container mt-24">
      <PageTitles />

      <div className="relative w-full mt-12">
        <div className="flex items-center justify-between">
          <Heading title="" highLightText="القصص المحفوظة" className="" />

          <div className="flex items-center gap-2 min-w-fit bg-white p-2 border rounded-xl text-sm h-[52px] px-4">
            <h2>عدد القصص: </h2>
            <h2>{favorites?.length}</h2>
          </div>
        </div>

        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Page;
