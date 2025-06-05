"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { StoryStatus } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { Session } from "next-auth";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { useSearchParams } from "next/navigation";

type StoriesSectionProps = {
  session: Session | null;
};

const StoriesSection = ({ session }: StoriesSectionProps) => {
  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetching = useRef(false); // ✅ prevent double-fetching
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender");
  const ageFrom = searchParams.get("ageFrom");
  const ageTo = searchParams.get("ageTo");
  const city = searchParams.get("city");
  const neighborhood = searchParams.get("neighborhood");

  const fetchStories = async (pageToFetch: number) => {
    console.log("hasMore: ", hasMore);
    console.log("fetching.current: ", fetching.current);

    if (!hasMore || fetching.current) return;

    fetching.current = true;
    setError(null);

    const params = new URLSearchParams({
      status: StoryStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    // ✅ Append filter params if present
    if (gender) params.set("gender", gender);
    if (ageFrom) params.set("ageFrom", ageFrom);
    if (ageTo) params.set("ageTo", ageTo);
    if (city) params.set("city", city);
    if (neighborhood) params.set("neighborhood", neighborhood);

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/stories/fetch?${params.toString()}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء جلب البيانات");
      }

      const { data, hasMore } = await res.json();

      setInitialLoading(false);
      setStories((prev) => {
        const existingIds = new Set(prev.map((s) => s._id));
        const unique = data.filter(
          (s: StoryInterface) => !existingIds.has(s._id)
        );
        return [...prev, ...unique];
      });

      setHasMore(hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError((error as Error).message);
      setInitialLoading(false);
    } finally {
      fetching.current = false;
    }
  };

  // Initial load (page 1)
  useEffect(() => {
    setStories([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
  }, [searchParams.toString()]);

  useEffect(() => {
    if (page === 1 && initialLoading) {
      fetchStories(1);
    }
  }, [page, initialLoading]);

  console.log("Error", error);

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

  if (error) {
    return <ErrorMessage error={error} className="mt-8" />;
  }

  return (
    <>
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
    </>
  );
};

export default StoriesSection;
