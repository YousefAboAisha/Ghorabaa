import DonationBanner from "@/containers/home/donationBanner";
import Landing from "@/containers/home/landing";
import MartyrsStatistics from "@/containers/home/martyersStatistics";
import TodaysMartyr from "@/containers/home/todaysMartyer";
import AddStoryBanner from "@/containers/home/addStoryBanner";
import RecentlyAddedStories from "@/containers/home/recentlyAddedStories";

export async function generateMetadata() {
  return {
    title: {
      default: "غُرباء | منصة الشهداء",
      template: "%s",
    },
    description: "أكبر مكتبة ومنصة رقمية للشهداء",
    icons: {
      apple: "/zad-logo.svg",
      icon: "/zad-logo.svg",
    },
  };
}

// Viewport export remains separate
export const viewport = "width=device-width, initial-scale=1";

export default function Home() {
  return (
    <>
      <Landing />
      <MartyrsStatistics />
      <div className="container">
        <TodaysMartyr />
        <AddStoryBanner />
        <RecentlyAddedStories />
      </div>

      <div className="container">
        {/* <Comments /> */}
        <DonationBanner />
      </div>
    </>
  );
}
