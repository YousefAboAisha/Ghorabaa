import BannedContentCard from "@/components/UI/cards/bannedContentCard";
import Heading from "@/components/UI/typography/heading";
import React from "react";

const BannedContent = () => {
  return (
    <div className="section">
      <Heading title="" highLightText="المحتوى المحظور" className="" />
      <div className="cards-grid-3 mt-8">
        <BannedContentCard />
        <BannedContentCard />
        <BannedContentCard />
        <BannedContentCard />
        <BannedContentCard />
      </div>

      <p className="text-primary mx-auto w-fit hover:underline text-sm font-semibold mt-8 cursor-pointer">
        عرض المزيد
      </p>
    </div>
  );
};

export default BannedContent;
