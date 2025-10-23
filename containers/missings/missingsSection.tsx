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
  const fetching = useRef(false); // ✅ prevent double-fetching
  const searchParams = useSearchParams();

  // Search params
  const gender = searchParams.get("gender");
  const ageFrom = searchParams.get("ageFrom");
  const ageTo = searchParams.get("ageTo");
  const city = searchParams.get("city");
  const neighborhood = searchParams.get("neighborhood");
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const fetchMissings = async (pageToFetch: number) => {
    if (!hasMore || fetching.current) return;

    fetching.current = true;
    setError(null);

    const params = new URLSearchParams({
      status: MissingStatus.APPROVED,
      page: pageToFetch.toString(),
      limit: "8",
    });

    // Add search query if exists
    if (searchQuery) params.set("query", searchQuery);

    // Add filter params
    if (gender) params.set("gender", gender);
    if (ageFrom) params.set("ageFrom", ageFrom);
    if (ageTo) params.set("ageTo", ageTo);
    if (city) params.set("city", city);
    if (neighborhood) params.set("neighborhood", neighborhood);
    if (day) params.set("day", day);
    if (month) params.set("month", month);
    if (year) params.set("year", year);

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
        if (pageToFetch === 1) return data;

        const existingIds = new Set(prev.map((m) => m._id));
        const unique = data.filter(
          (m: MissingInterface) => !existingIds.has(m._id)
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

  // Reset everything when search params or search query changes
  useEffect(() => {
    setMissings([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), searchQuery]);

  // Fetch data when page or initialLoading changes
  useEffect(() => {
    if (page === 1 && initialLoading) {
      fetchMissings(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, initialLoading]);

  // Search query debounce effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!initialLoading) {
        setMissings([]);
        setPage(1);
        setHasMore(true);
        setInitialLoading(true);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

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
          fetchMissings(page); // use latest page
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, initialLoading, page]
  );

  if (error) {
    return (
      <>
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ErrorMessage error={error} className="mt-8" />
      </>
    );
  }

  return (
    <>
      <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="relative mb-12 mt-8">
        {initialLoading ? (
          <StoryCardSkeletonLoader length={8} className="!mt-8" />
        ) : missings.length > 0 ? (
          <>
            <div className="cards-grid-4">
              {missings.map((missing: MissingInterface) => (
                <MissingCard key={missing._id as string} data={missing} />
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

// Extracted search header component for better readability
const SearchHeader = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  return (
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
  );
};

export default MissingsSection;
