"use client";
import { StoryStatus } from "@/app/enums";
import MartyrCard from "@/components/UI/cards/martyrCard";
import MartyrPendingCard from "@/components/UI/cards/martyrPendingCard";
import MartyrRejectedCard from "@/components/UI/cards/martyrRejectedCard";
import React, { useState } from "react";

const StoryTabs = () => {
  const [currentTap, setCurrentTap] = useState<StoryStatus>(
    StoryStatus.APPROVED
  );

  const renderStoryContainer = (type: string) => {
    switch (type) {
      case StoryStatus.APPROVED:
        return (
          <div className="cards-grid-4">
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
            <MartyrCard />
          </div>
        );

      case StoryStatus.PENDING:
        return (
          <div className="flex flex-col gap-2">
            <MartyrPendingCard />
            <MartyrPendingCard />
            <MartyrPendingCard />
            <MartyrPendingCard />
            
          </div>
        );

      case StoryStatus.REJECTED:
        return (
          <div className="cards-grid-3">
            <MartyrRejectedCard />
            <MartyrRejectedCard />
            <MartyrRejectedCard />
            <MartyrRejectedCard />
          </div>
        );
    }
  };

  return (
    <div className="section relative">
      <div className="flex items-center gap-4 text-sm overflow-auto scrollbar-hidden ">
        <div
          title="APPROVED"
          className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit ${
            currentTap == "APPROVED" && "border-r-4 border-primary"
          } select-none `}
          onClick={() => setCurrentTap(StoryStatus.APPROVED)}
        >
          <p> الطلبات المقبولة</p>
          <p
            className={`text-gray_dark text-[13px] font-semibold ${
              currentTap == "APPROVED" && "text-primary"
            }`}
          >
            +13
          </p>
        </div>

        <div
          title="PENDING"
          className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit  ${
            currentTap == "PENDING" && "border-r-4 border-orange-500"
          } select-none `}
          onClick={() => setCurrentTap(StoryStatus.PENDING)}
        >
          <p>بانتظار الموافقة</p>
          <p
            className={`text-gray_dark text-[13px] font-semibold ${
              currentTap == "PENDING" && "text-orange-500"
            }`}
          >
            +13
          </p>
        </div>

        <div
          title="REJECTED"
          className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit ${
            currentTap == "REJECTED" && "border-r-4 border-red-600"
          } select-none `}
          onClick={() => setCurrentTap(StoryStatus.REJECTED)}
        >
          <p> الطلبات المرفوضة</p>
          <p
            className={`text-gray_dark text-[13px] font-semibold ${
              currentTap == "REJECTED" && "text-red-600"
            }`}
          >
            +13
          </p>{" "}
        </div>
      </div>

      <div className="relative flex flex-col gap-3 mt-8">
        {renderStoryContainer(currentTap)}
      </div>
    </div>
  );
};

export default StoryTabs;
