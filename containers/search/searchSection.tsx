"use client";
import Input from "@/components/UI/inputs/input";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MartyrCard from "@/components/UI/cards/storyCard";
import { BsExclamationCircle } from "react-icons/bs";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import { StoryInterface } from "@/app/interfaces";

const SearchSection = () => {
  const [stories, setStories] = useState<StoryInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Stories", stories);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 0) {
        setLoading(true);
        fetch(`/api/story/search?query=${encodeURIComponent(searchQuery)}`, {
          credentials: "include",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch");
            }
            return res.json();
          })
          .then((data) => {
            setStories(data);
            console.log("Data inside the useEffect", data);
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setStories([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

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

      <div className="relative mt-6 min-h-[60vh]">
        {loading ? (
          <StoryCardSkeletonLoader length={8} />
        ) : (
          <div className="cards-grid-4">
            {stories && stories?.length <= 0 ? (
              <div className="flex items-center gap-2 abs-center text-sm">
                <p>لا توجد نتائج للبحث</p>
                <BsExclamationCircle size={20} />
              </div>
            ) : (
              stories?.map((martyr: StoryInterface, index) => (
                <MartyrCard key={index} data={martyr} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
