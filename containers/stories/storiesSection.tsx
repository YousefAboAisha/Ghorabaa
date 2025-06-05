"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { StoryStatus } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { Session } from "next-auth";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import Modal from "@/components/UI/modals/modal";
import SearchFilters from "@/components/UI/modals/searchFilters";
import ErrorMessage from "@/components/responseMessages/errorMessage";

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchStories = async (pageToFetch: number) => {
    if (!hasMore || fetching.current) return;

    fetching.current = true;
    setError(null);
    console.log("Fetching page", pageToFetch);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/fetch/?status=${StoryStatus.APPROVED}&page=${pageToFetch}&limit=8`,
      { cache: "no-store" }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("حدث خطأ أثناء جلب البيانات");
        }

        return res.json();
      })
      .then(({ data }) => {
        setInitialLoading(false);
        setStories((prev) => {
          const existingIds = new Set(prev.map((s) => s._id));
          const unique = data.filter(
            (s: StoryInterface) => !existingIds.has(s._id)
          );
          return [...prev, ...unique];
        });

        setHasMore(data.hasMore);
        setPage((prev) => prev + 1); // ✅ increment after success
      })
      .catch((error) => {
        setError(error.message);
        fetching.current = false;
        setInitialLoading(false);
      });
  };

  // Initial load (page 1)
  useEffect(() => {
    fetchStories(1);
  }, []);

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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        containerClassName="lg:w-[32%]"
      >
        <SearchFilters />
      </Modal>

      <div onClick={() => setIsOpen(true)}>Open Modal</div>

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
