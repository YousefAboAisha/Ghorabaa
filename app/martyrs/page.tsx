"use client";
import React, { useEffect, useState } from "react";
import MartyrCard from "@/components/UI/cards/martyrCard";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { BiSearch } from "react-icons/bi";
import { MartyrInterface } from "../interfaces";
import { toast } from "react-toastify";
import { CiImageOn } from "react-icons/ci";

// Mock data for martyrs (replace this with your actual data fetching logic)
const mockMartyrs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `الشهيد ${i + 1}`,
  description: "وصف قصير عن الشهيد...",
}));

const Martyr = () => {
  const [martyrs, setMartyrs] = useState<MartyrInterface[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Number of items to display per page

  // Filter martyrs based on search query
  const filteredMartyrs = mockMartyrs.filter((martyr) =>
    martyr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredMartyrs.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAllMartyrs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/martyr/fetchAll");

      if (!response.ok) {
        toast.error("حدث خطأ جلب معلومات المستخدم"); // Show error toast
        throw new Error("Failed to fetch user details");
      }

      const res = await response.json();
      console.log("Response:", res.martyrs);

      if (res?.martyrs) {
        setMartyrs(res.martyrs);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetching userDetails failed:", error);
      toast.error("حدث خطأ أثناء العملية"); // Show error toast
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMartyrs();
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
    <div className="container mt-32 min-h-screen">
      <Heading
        title=""
        highLightText="شهداؤنا الأبرار"
        details="وَلَئِن قُتِلْتُمْ فِي سَبِيلِ اللَّهِ أَوْ مُتُّمْ لَمَغْفِرَةٌ مِّنَ اللَّهِ وَرَحْمَةٌ خَيْرٌ مِّمَّا يَجْمَعُونَ"
        className="w-fit"
      />

      <div className="mt-12">
        {/* Search Input */}
        <Input
          placeholder="ابحث عن الشهيد.."
          className="bg-white !h-[50px]"
          type="text"
          icon={BiSearch}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to the first page when searching
          }}
        />

        <div className="relative min-h-[70vh] my-8">
          {/* Martyr Cards Grid */}
          {loading ? (
            renderLoadingSkeletons()
          ) : (
            <div className="cards-grid-4">
              {martyrs?.map((martyr: MartyrInterface, index) => (
                <MartyrCard key={index} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 my-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`p-2 px-3 rounded-lg text-[12px] ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Martyr;
