"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { EventStatus } from "@/app/enums";
import { useSearchParams } from "next/navigation";
import MassacreSkeletonLoader from "@/components/UI/loaders/massacreSkeletonLoader";
import { EventInterface } from "@/app/interfaces";
import EventCard from "@/components/UI/cards/eventCard";

const EventsSection = () => {
  const [stories, setStories] = useState<EventInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetching = useRef(false); // ✅ prevent double-fetching
  const searchParams = useSearchParams();

  const fetchStories = async (pageToFetch: number) => {
    console.log("hasMore: ", hasMore);
    console.log("fetching.current: ", fetching.current);

    if (!hasMore || fetching.current) return;

    fetching.current = true;
    setError(null);

    const params = new URLSearchParams({
      status: EventStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/events/fetch?${params.toString()}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء جلب البيانات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const { data, hasMore: newHasMore } = await res.json();

      setInitialLoading(false);
      setStories((prev) => {
        const existingIds = new Set(prev.map((s) => s._id));
        const unique = data.filter(
          (s: EventInterface) => !existingIds.has(s._id)
        );
        return [...prev, ...unique];
      });

      setHasMore(newHasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  useEffect(() => {
    if (page === 1 && initialLoading) {
      fetchStories(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasMore, initialLoading, page]
  );

  if (error) {
    return <ErrorMessage error={error} className="mt-8" />;
  }

  return (
    <>
      <div className="relative mb-12 mt-8">
        {initialLoading ? (
          <MassacreSkeletonLoader length={6} />
        ) : stories.length > 0 ? (
          <>
            <div className="cards-grid-3">
              {stories.map((event: EventInterface) => (
                <EventCard key={event._id as string} data={event} />
              ))}
            </div>

            {/* Observed loader div for infinite scroll */}
            <div ref={lastElementRef} className="h-10 mt-10 bg-transparent" />

            {hasMore && (
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

export default EventsSection;
