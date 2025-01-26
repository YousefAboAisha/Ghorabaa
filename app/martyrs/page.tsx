"use client";
import React, { useState } from "react";
import MartyrCard from "@/components/UI/cards/martyrCard";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { BiSearch } from "react-icons/bi";

// Mock data for martyrs (replace this with your actual data fetching logic)
const mockMartyrs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `الشهيد ${i + 1}`,
  description: "وصف قصير عن الشهيد...",
}));

const Martyr = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Number of items to display per page

  // Filter martyrs based on search query
  const filteredMartyrs = mockMartyrs.filter((martyr) =>
    martyr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredMartyrs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMartyrs = filteredMartyrs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

        {/* Martyr Cards Grid */}
        <div className="cards-grid-4 my-12">
          {currentMartyrs.map((martyr) => (
            <MartyrCard
              key={martyr.id}
              name={martyr.name}
              bio={martyr.description}
            />
          ))}
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
