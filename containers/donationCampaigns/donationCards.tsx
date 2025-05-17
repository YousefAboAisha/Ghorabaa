"use client";
import DonationCampaignCard from "@/components/UI/cards/donationCampaignCard";
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
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
        <DonationCampaignCard />
      </div>
    </div>
  );
};

export default DonationCards;
