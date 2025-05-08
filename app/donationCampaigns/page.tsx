import PageTitles from "@/components/UI/typography/pageTitles";
import DonationCards from "@/containers/donationCampaigns/donationCards";
import Hero from "@/containers/donationCampaigns/hero";

const DonationCampaigns = () => {
  return (
    <div className="container relative">
      <div className="mt-24">
        <PageTitles />
      </div>

      <Hero />
      <DonationCards />
    </div>
  );
};

export default DonationCampaigns;
