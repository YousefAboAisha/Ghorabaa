"use client";
import DonationCard from "@/components/UI/cards/donationCard";
import Heading from "@/components/UI/typography/heading";

const DonationCards = () => {
  return (
    <div className="relative flex flex-col gap-2 mt-16 ">
      <div className="flex items-center justify-between w-full gap-4">
        <Heading
          title=""
          highLightText="حملات التبرع"
          details="مشاركتك دعماً لأهالي وأسر الشهداء"
          className="min-w-fit"
        />
      </div>

      <div className="cards-grid-3 mt-4">
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </div>
    </div>
  );
};

export default DonationCards;
