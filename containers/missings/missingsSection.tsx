"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { MissingStatus } from "@/app/enums";
import { MissingInterface } from "@/app/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { useSearchParams } from "next/navigation";
import MissingCard from "@/components/UI/cards/missingCard";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const MissingsSection = () => {
  const [stories, setStories] = useState<MissingInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string | "">("");

  const observer = useRef<IntersectionObserver | null>(null);
  const fetching = useRef(false); // ✅ prevent double-fetching
  const searchParams = useSearchParams();

  const fetchStories = async (pageToFetch: number) => {
    if (!hasMore || fetching.current) return;

    fetching.current = true;
    setError(null);

    const params = new URLSearchParams({
      status: MissingStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/missings/fetch?query=${searchQuery}&${params.toString()}`,
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
          (s: MissingInterface) => !existingIds.has(s._id)
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
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="البحث عن مفقود"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<CiSearch size={20} className="text-gray-500" />}
            className="border bg-white focus:border-secondary"
          />
        </div>

        <Link className="relative min-w-fit" href={"/addMissing"}>
          <div className="md:w-fit w-full">
            <Button
              title="مفقود جديد"
              className="px-6 w-full bg-secondary text-white"
              icon={<BsPlus size={20} />}
            />
          </div>
        </Link>
      </div>

      <div className="relative mb-12 mt-8">
        {initialLoading ? (
          <StoryCardSkeletonLoader length={8} className="!mt-8" />
        ) : stories.length > 0 ? (
          <>
            <div className="cards-grid-4">
              {stories.map((story: MissingInterface) => (
                <MissingCard key={story._id as string} data={story} />
              ))}
            </div>

            {/* Observed loader div for infinite scroll */}
            <div ref={lastElementRef} className="h-10 mt-10 bg-transparent" />

            {!hasMore ? null : (
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

export default MissingsSection;
