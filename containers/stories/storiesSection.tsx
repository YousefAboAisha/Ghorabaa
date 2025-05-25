"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { StoryStatus } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { Session } from "next-auth";
import NoDataMessage from "@/components/errorMessages/noDataMessage";

type StoriesSectionProps = {
  session: Session | null;
};

const StoriesSection = ({ session }: StoriesSectionProps) => {
  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetching = useRef(false); // ✅ prevent double-fetching

  const fetchStories = async (pageToFetch: number) => {
    if (!hasMore || fetching.current) return;

    fetching.current = true;
    console.log("Fetching page", pageToFetch);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/fetch/?status=${StoryStatus.APPROVED}&page=${pageToFetch}&limit=8`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Network error");

      const json = await res.json();

      setStories((prev) => {
        const existingIds = new Set(prev.map((s) => s._id));
        const unique = json.data.filter(
          (s: StoryInterface) => !existingIds.has(s._id)
        );
        return [...prev, ...unique];
      });

      setHasMore(json.hasMore);
      setPage((prev) => prev + 1); // ✅ increment after success
    } catch (err) {
      console.error(err);
    } finally {
      fetching.current = false;
      setInitialLoading(false);
    }
  };

  // Initial load (page 1)
  useEffect(() => {
    fetchStories(1);
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !initialLoading &&
          !fetching.current
        ) {
          fetchStories(page); // use latest page
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, initialLoading, page]
  );

  return (
    <div className="relative mb-12 mt-8">
      {initialLoading ? (
        <StoryCardSkeletonLoader length={8} className="!mt-8" />
      ) : stories.length > 0 ? (
        <>
          <div className="cards-grid-4">
            {stories.map((story: StoryInterface) => (
              <StoryCard
                key={story._id as string}
                data={story}
                session={session}
              />
            ))}
          </div>

          {/* Observed loader div for infinite scroll */}
          <div ref={lastElementRef} className="h-10 mt-10 bg-transparent" />

          {!hasMore ? (
            <p className="text-center text-sm text-gray-500">
              لا توجد قصص إضافية!
            </p>
          ) : (
            <div className="mt-4 flex justify-center gap-2 text-gray_dark text-[14px]">
              جارٍ جلب البيانات
              <AiOutlineLoading3Quarters size={16} className="animate-spin" />
            </div>
          )}
        </>
      ) : (
        <NoDataMessage className="min-h-[50vh]" />
      )}
    </div>
  );
};

export default StoriesSection;
