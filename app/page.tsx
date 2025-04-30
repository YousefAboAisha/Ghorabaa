import Comments from "@/containers/home/comments";
import DonationBanner from "@/containers/home/donationBanner";
import EventBanner from "@/containers/home/eventBanner";
import Landing from "@/containers/home/landing";
import MartyrsStatistics from "@/containers/home/martyersStatistics";
import RecentlyAddedMartyrs from "@/containers/home/recentlyAddedMartyers";
import TodaysMartyr from "@/containers/home/todaysMartyer";

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
        <RecentlyAddedMartyrs />
        <EventBanner />
      </div>

      <div className="container">
        <Comments />
        <DonationBanner />
      </div>
    </>
  );
}
