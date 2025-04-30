import DonationCards from "@/containers/donationCampaigns/donationCards";
import Hero from "@/containers/donationCampaigns/hero";

const DonationCampaigns = () => {
  return (
    <div className="relative">
      <Hero />
      <DonationCards />
    </div>
  );
};

export default DonationCampaigns;
