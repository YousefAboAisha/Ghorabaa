"use client";
import FavoriteCard from "@/components/UI/cards/favoriteCard";
import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";
import { useEffect, useState } from "react";
import { StoryInterface } from "../interfaces";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";

const Page = () => {
  const [favorites, setFavorites] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavoriteStories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/story/favorites/fetch", {
        credentials: "include", // needed for session auth
      });

      const response = await res.json();

      if (!res.ok) {
        setLoading(false);
        console.error("Error:", response.error);
        return [];
      }

      setFavorites(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch favorite stories:", error);
      return [];
    }
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

        <div className="mt-4">
          {loading ? (
            <StoryCardSkeletonLoader length={4} className="cards-grid-3" />
          ) : (
            <div className="relative">
              {favorites.length > 0 ? (
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
                <div className="relative w-full bg-white border rounded-md h-[50vh]">
                  <p className="abs-center text-sm">لا يوجد قصص محفوظة</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
