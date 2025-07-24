"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { MassacreInterface } from "@/app/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import MassacreCard from "@/components/UI/cards/massacreCard";
import { MassacreStatus } from "@/app/enums";
import { useSearchParams } from "next/navigation";
import MassacreSkeletonLoader from "@/components/UI/loaders/massacreSkeletonLoader";

const MassacresSection = () => {
  const [stories, setStories] = useState<MassacreInterface[]>([]);
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
      status: MassacreStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/massacres/fetch?${params.toString()}`,
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
          (s: MassacreInterface) => !existingIds.has(s._id)
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
          <MassacreSkeletonLoader length={6} />
        ) : stories.length > 0 ? (
          <>
            <div className="cards-grid-3">
              {stories.map((massacre: MassacreInterface) => (
                <MassacreCard key={massacre._id as string} data={massacre} />
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

export default MassacresSection;
