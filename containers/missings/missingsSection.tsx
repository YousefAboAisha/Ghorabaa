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
  const [missings, setMissings] = useState<MissingInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);
  const fetching = useRef(false);
  const searchParams = useSearchParams();

  // Refs to track initial loads
  const initialMount = useRef(true);
  const searchQueryInitial = useRef(true);

  const fetchMissings = async (
    pageToFetch: number,
    isSearch: boolean = false
  ) => {
    if (fetching.current) return;

    fetching.current = true;
    setError(null);

    const params = new URLSearchParams({
      status: MissingStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    if (searchQuery) {
      params.set("query", searchQuery);
    }

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/missings/fetch?${params.toString()}`,
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
      setMissings((prev) => {
        if (pageToFetch === 1 || isSearch) return data;

        const existingIds = new Set(prev.map((m) => m._id));
        const unique = data.filter(
          (m: MissingInterface) => !existingIds.has(m._id)
        );
        return [...prev, ...unique];
      });

      setHasMore(newHasMore);
      setPage(pageToFetch + 1);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      setInitialLoading(false);
    } finally {
      fetching.current = false;
    }
  };

  // **SINGLE SOURCE OF TRUTH FOR INITIAL LOAD**
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetchMissings(1);
    }
  }, []);

  // Handle search params changes (only after initial mount)
  useEffect(() => {
    if (initialMount.current) return; // Skip on initial mount

    setMissings([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchMissings(1, true);
  }, [searchParams]);

  // Handle search query changes (only after initial mount)
  useEffect(() => {
    if (searchQueryInitial.current) {
      searchQueryInitial.current = false;
      return; // Skip initial mount
    }

    const delayDebounce = setTimeout(() => {
      setMissings([]);
      setPage(1);
      setHasMore(true);
      setInitialLoading(true);
      fetchMissings(1, true);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Infinite scroll
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
          fetchMissings(page);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, initialLoading, page]
  );

  const renderContent = () => {
    if (error) {
      return <ErrorMessage error={error} className="mt-8" />;
    }

    if (initialLoading && missings.length === 0) {
      return <StoryCardSkeletonLoader length={8} className="!mt-8" />;
    }

    if (missings.length > 0) {
      return (
        <>
          <div className="cards-grid-4">
            {missings.map((missing: MissingInterface, index: number) => {
              const isLast = index === missings.length - 1;
              return isLast ? (
                <div key={missing._id as string} ref={lastElementRef}>
                  <MissingCard data={missing} />
                </div>
              ) : (
                <MissingCard key={missing._id as string} data={missing} />
              );
            })}
          </div>

          {hasMore && !initialLoading && (
            <div className="mt-4 flex justify-center gap-2 text-gray_dark text-[14px]">
              جارٍ جلب البيانات
              <AiOutlineLoading3Quarters size={16} className="animate-spin" />
            </div>
          )}
        </>
      );
    }

    return <NoDataMessage className="min-h-[50vh]" />;
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="البحث عن مفقود"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<CiSearch size={20} className="text-gray-500" />}
            className="bg-white focus:border-secondary border !rounded-xl"
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

      <div className="relative mb-12 mt-8">{renderContent()}</div>
    </>
  );
};

export default MissingsSection;
