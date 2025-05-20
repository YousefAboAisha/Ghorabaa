import DonationBanner from "@/containers/home/donationBanner";
import Landing from "@/containers/home/landing";
import MartyrsStatistics from "@/containers/home/martyersStatistics";
import TodaysMartyr from "@/containers/home/todaysMartyer";
import AddStoryBanner from "@/containers/home/addStoryBanner";
import RecentlyAddedStories from "@/containers/home/recentlyAddedStories";
import { Suspense } from "react";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { HomeMetadata } from "./lib/metadata";
import { getSessionAction } from "./actions/registerActions";

export const generateMetadata = async () => HomeMetadata;

// Viewport export remains separate
export const viewport = "width=device-width, initial-scale=1";

export default async function Home() {
  const session = await getSessionAction();

  return (
    <>
      <Landing />

      <MartyrsStatistics />

      <div className="container">
        {/* todays martyr */}
        <div className="section">
          <Heading
            title=""
            highLightText="شهيد اليوم"
            details="وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ ۚ بَلْ أَحْيَاءٌ وَلَٰكِن لّا تَشْعُرُونَ"
            highlightColor="before:bg-primary"
          />
          <TodaysMartyr />
        </div>

        <AddStoryBanner />

        <div className="mt-24">
          <Heading
            highLightText="قصص مضافة حديثاً"
            highlightColor="before:bg-primary"
            title=""
            details="فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ وَيَسْتَبْشِرُونَ بِالَّذِينَ لَمْ يَلْحَقُوا بِهِم مِّنْ خَلْفِهِمْ أَلَّا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
            className="w-fit"
          />

          <Suspense
            fallback={<StoryCardSkeletonLoader length={4} className="!mt-8" />}
          >
            <RecentlyAddedStories session={session} />
          </Suspense>

          <Link
            href={"/stories"}
            className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto"
          >
            <p>عرض المزيد</p>
            <BsArrowLeft />
          </Link>
        </div>
      </div>

      <div className="container">
        <DonationBanner />
      </div>
    </>
  );
}
