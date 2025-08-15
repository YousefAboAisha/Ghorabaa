"use client";
import Input from "@/components/UI/inputs/input";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import { Session } from "next-auth";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";

type SearchSectionProps = {
  session: Session | null;
};

const SearchSection = ({ session }: SearchSectionProps) => {
  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Stories", stories);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) {
        const fetchStoriesByQuery = async () => {
          setLoading(true);
          setError(null);

          try {
            const res = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_BASE_URL
              }/user/stories/search?query=${encodeURIComponent(searchQuery)}`,
              {
                credentials: "include",
              }
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

            const { data } = await res.json();
            setStories(data);
            console.log("Data inside the useEffect", data);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            console.error("This is error: ", message);
            setError(message);
          } finally {
            setLoading(false);
          }
        };

        fetchStoriesByQuery();
      } else {
        setStories([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderContent = () => {
    if (loading) return <StoryCardSkeletonLoader length={8} />;

    if (error) return <ErrorMessage error={error as string} />;

    if (stories?.length < 1) {
      return <NoDataMessage message="لا توجد نتائج للبحث" />;
    }

    if (stories?.length >= 1) {
      return (
        <div className="cards-grid-4">
          {stories.map((martyr: StoryInterface, index) => (
            <StoryCard key={index} data={martyr} session={session} />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <div className="relative w-full md:w-8/12">
          <Input
            placeholder="اسم الشهيد - 3 حروف على الأقل"
            className="bg-white w-full border focus:border-secondary"
            type="text"
            icon={
              loading ? (
                <AiOutlineLoading3Quarters size={17} className="animate-spin" />
              ) : (
                <BiSearch size={20} />
              )
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 min-w-fit bg-white p-2 border rounded-xl text-sm h-[52px] px-4">
          <h2>نتائج البحث: </h2>
          <h2>{stories?.length}</h2>
        </div>
      </div>

      <div className="relative min-h-[60vh] mt-8">{renderContent()}</div>
    </div>
  );
};

export default SearchSection;
