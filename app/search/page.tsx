"use client";
import PageTitles from "@/components/UI/typography/pageTitles";
import Input from "@/components/UI/inputs/input";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import MartyrCard from "@/components/UI/cards/martyrCard";
import { StoryInterface } from "../interfaces";
import { BsExclamationCircle } from "react-icons/bs";

const Page = () => {
  const [stories, setStories] = useState<StoryInterface[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const renderLoadingSkeletons = () => (
    <div className="cards-grid-4">
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center h-5 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-4 w-7/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container min-h-screen mt-24">
      <PageTitles />

      {/* Search Input */}
      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <div className="relative w-full md:w-full">
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
          renderLoadingSkeletons()
        ) : (
          <div className="cards-grid-4">
            {stories && stories?.length <= 0 ? (
              <div className="flex items-center gap-2 abs-center text-sm">
                <p>لا توجد نتائج للبحث</p>
                <BsExclamationCircle size={20} />
              </div>
            ) : (
              stories?.map((martyr: StoryInterface, index) => (
                <MartyrCard key={index} />
              ))
            )}

            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
