"use client";
import React, { useEffect, useState } from "react";
import MartyrCard from "@/components/UI/cards/storyCard";
import Heading from "@/components/UI/typography/heading";
import { CiImageOn } from "react-icons/ci";
import { StoryInterface } from "../interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Martyr = () => {
  const [stories, setStories] = useState<StoryInterface[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllStories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/story/fetch");

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const res = await response.json();
      console.log("Response:", res.data);

      if (res?.data) {
        setStories(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetching userDetails failed:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStories();
  }, []);

  const renderLoadingSkeletons = () => (
    <div className="cards-grid-4">
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-3 w-10/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-3 w-6/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-10 w-full rounded-md mx-auto mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-3 w-10/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-3 w-6/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-10 w-full rounded-md mx-auto mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-3 w-10/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-3 w-6/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-10 w-full rounded-md mx-auto mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
          <CiImageOn size={50} className="text-gray-400" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center h-3 w-10/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-3 w-6/12 rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center h-10 w-full rounded-md mx-auto mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-24 min-h-screen">
      <PageTitles />

      <Heading
        title=""
        highLightText="شهداؤنا الأبرار"
        details="وَلَئِن قُتِلْتُمْ فِي سَبِيلِ اللَّهِ أَوْ مُتُّمْ لَمَغْفِرَةٌ مِّنَ اللَّهِ وَرَحْمَةٌ خَيْرٌ مِّمَّا يَجْمَعُونَ"
        className="w-fit mt-8"
      />

      <div className="relative min-h-[70vh] mb-12 mt-8">
        {/* Martyr Cards Grid */}
        {loading ? (
          renderLoadingSkeletons()
        ) : (
          <div className="cards-grid-4">
            {stories?.map((martyr: StoryInterface, index) => (
              <MartyrCard key={index} data={martyr} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-2 text-gray_dark text-[14px] ">
        جارٍ جلب البيانات
        <AiOutlineLoading3Quarters size={16} className="animate-spin" />
      </div>
    </div>
  );
};

export default Martyr;
