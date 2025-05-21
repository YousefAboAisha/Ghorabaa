"use client";
import { StoryStatus } from "@/app/enums";
import React, { useEffect, useState } from "react";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import StoryPendingCard from "@/components/UI/cards/storyPendingCard";
import StoryRejectedCard from "@/components/UI/cards/storyRejectedCard";
import { StoryTapsData } from "@/data/storyTapsData";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { Session } from "next-auth";

type StoryCounts = {
  [key in StoryStatus]: number;
};

type SubmittedStoriesProps = {
  session: Session | null;
};

const StoryTabs = ({ session }: SubmittedStoriesProps) => {
  const [currentTap, setCurrentTap] = useState<StoryStatus>(
    StoryStatus.APPROVED
  );
  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [storyCounts, setStoryCounts] = useState<StoryCounts>({
    APPROVED: 0,
    PENDING: 0,
    REJECTED: 0,
  });

  const fetchStories = async (status: StoryStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/story/userStories/fetch?status=${status}`);
      if (!res.ok) throw new Error("Failed to fetch stories");

      const data = await res.json();
      const fetchedStories = data.data || [];

      setStories(fetchedStories);
      setStoryCounts((prev) => ({ ...prev, [status]: fetchedStories.length }));
    } catch (error) {
      console.error("Error:", error);
      setStories([]);
      setStoryCounts((prev) => ({ ...prev, [status]: 0 }));
    } finally {
      setLoading(false);
    }
  };

  console.log("All Stories data", stories);

  useEffect(() => {
    fetchStories(currentTap);
  }, [currentTap]);

  const renderStoryContainer = () => {
    if (loading) return <StoryCardSkeletonLoader length={4} />;
    if (stories.length === 0)
      return <p className="abs-center text-sm">لا يوجد بيانات لعرضها!</p>;

    switch (currentTap) {
      case StoryStatus.APPROVED:
        return (
          <div className="cards-grid-4">
            {stories?.map((story: StoryInterface) => (
              <StoryCard
                key={story._id as string}
                data={story}
                session={session}
              />
            ))}
          </div>
        );

      case StoryStatus.PENDING:
        return (
          <div className="cards-grid-3">
            {stories?.map((story: StoryInterface) => (
              <StoryPendingCard key={story._id as string} data={story} />
            ))}
          </div>
        );

      case StoryStatus?.REJECTED:
        return (
          <div className="cards-grid-3">
            {stories.map((story: StoryInterface) => (
              <StoryRejectedCard key={story._id as string} data={story} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="section relative">
      {/* Tabs */}
      <div className="flex items-center gap-4 text-sm overflow-auto scrollbar-hidden">
        {StoryTapsData.map(({ label, status, color }) => (
          <div
            key={status}
            title={status}
            className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit ${
              currentTap === status ? `border-${color}` : ""
            } select-none`}
            onClick={() => setCurrentTap(status)}
          >
            <p>{label}</p>
            <p
              className={`text-gray_dark text-[13px] font-semibold ${
                currentTap === status ? `text-${color}` : ""
              }`}
            >
              +{storyCounts[status] ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-3 mt-8 min-h-[40vh]">
        {renderStoryContainer()}
      </div>
    </div>
  );
};

export default StoryTabs;
