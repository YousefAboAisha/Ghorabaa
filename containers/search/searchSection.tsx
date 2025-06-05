"use client";
import Input from "@/components/UI/inputs/input";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { StoryInterface } from "@/app/interfaces";
import StoryCard from "@/components/UI/cards/storyCard";
import { Session } from "next-auth";
import ErrorMessage from "@/components/responseMessages/errorMessage";

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
      if (searchQuery.length > 0) {
        setLoading(true);
        setError(null);

        // hasCompleteProfile=true query is to return the stories with complete profiles only!
        fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/user/stories/search?query=${encodeURIComponent(searchQuery)}`,
          {
            credentials: "include",
          }
        )
          .then((res) => {
            console.log("respones object: ", res);
            if (!res.ok) {
              throw new Error("حدث خطأ أثناء جلب البيانات");
            }
            console.log("Response is ok, parsing JSON", res);

            return res.json();
          })
          .then(({ data }) => {
            console.log("data object: ", data);
            setStories(data);
            console.log("Data inside the useEffect", data);
          })
          .catch((error) => {
            console.error("This is error: ", error);
            setError(error.message);
          })
          .finally(() => setLoading(false));
      } else {
        setStories([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderContent = () => {
    if (error) return <ErrorMessage error={error as string} />;

    if (loading) return <StoryCardSkeletonLoader length={8} />;

    if (stories)
      return (
        <div className="cards-grid-4">
          {stories?.length <= 0 ? (
            <div className="flex items-center gap-2 abs-center text-sm">
              <p>لا توجد نتائج للبحث</p>
              <BsExclamationCircle size={20} />
            </div>
          ) : (
            stories?.map((martyr: StoryInterface, index) => (
              <StoryCard key={index} data={martyr} session={session} />
            ))
          )}
        </div>
      );
  };

  return (
    <div>
      {/* Search Input */}
      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <div className="relative w-full md:w-8/12">
          <Input
            placeholder="قم بكتابة اسم الشهيد.."
            className="bg-white w-full border"
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
