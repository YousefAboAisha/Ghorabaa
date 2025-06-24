"use client";
import { StoryStatus } from "@/app/enums";
import React, { useEffect, useState } from "react";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import StoryPendingCard from "@/components/UI/cards/storyPendingCard";
import StoryRejectedCard from "@/components/UI/cards/storyRejectedCard";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { Session } from "next-auth";
import { StoryTabsData } from "@/data/storyTabsData";
import RejectAndPendingCardSkeltonLoader from "@/components/UI/loaders/rejectAndPendingCardSkeltonLoader";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/responseMessages/errorMessage";

type StoryCounts = {
  [key in StoryStatus]: number;
};

type SubmittedStoriesProps = {
  session: Session | null;
};

const StoryTabs = ({ session }: SubmittedStoriesProps) => {
  const user_id = session?.user.id;
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log("Front-end USER_ID ", user_id);

  const [currentTap, setCurrentTap] = useState<StoryStatus>(
    () => (searchParams.get("activeTap") as StoryStatus) || StoryStatus.APPROVED
  );

  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [storyCounts, setStoryCounts] = useState<StoryCounts>({
    [StoryStatus.APPROVED]: 0,
    [StoryStatus.PENDING]: 0,
    [StoryStatus.REJECTED]: 0,
    [StoryStatus.IMPORTED]: 0,
  });

  const fetchStories = async (status: StoryStatus) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/userStories/fetch/${user_id}?status=${status}`,
        {
          credentials: "include", // 👈 THIS IS CRITICAL
        }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء جلب القصص";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      const fetchedStories = data.data || [];

      setStories(fetchedStories);
      setStoryCounts((prev) => ({ ...prev, [status]: fetchedStories.length }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Error fetching stories:", message);
      setError(message);
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

  useEffect(() => {
    router.push(`/profile?activeTap=${currentTap}`);
  }, []);

  const searchParamsHandler = (status: StoryStatus) => {
    setCurrentTap(status);
    router.push(`/profile?activeTap=${status}`);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const timer = setTimeout(() => {
          const yOffset = -300;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const getBorderColor = (status: StoryStatus) => {
    if (status !== currentTap) return ""; // ✅ Only add color to active tab
    switch (status) {
      case StoryStatus.APPROVED:
        return "border-approved";
      case StoryStatus.PENDING:
        return "border-pending";
      case StoryStatus.REJECTED:
        return "border-rejected";
      default:
        return "";
    }
  };

  const renderStoryContainer = () => {
    if (error) {
      return <ErrorMessage error={error} />;
    }

    switch (currentTap) {
      case StoryStatus.APPROVED:
        return loading ? (
          <StoryCardSkeletonLoader length={4} />
        ) : stories.length > 0 ? (
          <div className="cards-grid-4">
            {stories?.map((story: StoryInterface) => (
              <StoryCard
                key={story._id as string}
                data={story}
                session={session}
              />
            ))}
          </div>
        ) : (
          <NoDataMessage />
        );

      case StoryStatus.PENDING:
        return loading ? (
          <RejectAndPendingCardSkeltonLoader length={3} />
        ) : stories.length > 0 ? (
          <div className="cards-grid-3">
            {stories?.map((story: StoryInterface) => (
              <StoryPendingCard key={story._id as string} data={story} />
            ))}
          </div>
        ) : (
          <NoDataMessage />
        );

      case StoryStatus.REJECTED:
        return loading ? (
          <RejectAndPendingCardSkeltonLoader length={3} />
        ) : stories.length > 0 ? (
          <div className="cards-grid-3">
            {stories?.map((story: StoryInterface) => (
              <StoryRejectedCard key={story._id as string} data={story} />
            ))}
          </div>
        ) : (
          <NoDataMessage />
        );
    }
  };

  console.log("currentTap", currentTap);

  return (
    <div className="section relative">
      {/* Tabs */}
      <div className="flex items-center gap-4 text-sm overflow-auto scrollbar-hidden">
        {StoryTabsData.map(({ label, status, color }) => (
          <div
            key={status}
            className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit select-none ${getBorderColor(
              status
            )}`}
            onClick={() => searchParamsHandler(status)}
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
      <div
        id={"storyContainer"}
        className="relative flex flex-col gap-3 mt-8 min-h-[30vh]"
      >
        {renderStoryContainer()}
      </div>
    </div>
  );
};

export default StoryTabs;
