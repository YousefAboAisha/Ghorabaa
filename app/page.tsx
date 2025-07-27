import Landing from "@/containers/home/landing";
import MartyrsStatistics from "@/containers/home/martyersStatistics";
import TodaysMartyr from "@/containers/home/todaysMartyer";
import AddStoryBanner from "@/components/UI/banners/addStoryBanner";
import RecentlyAddedStories from "@/containers/home/recentlyAddedStories";
import { Suspense } from "react";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import Heading from "@/components/UI/typography/heading";
import { HomeMetadata } from "./lib/metadata";
import { getSessionAction } from "./actions/registerActions";
import RecentlyAddedMasscares from "@/containers/home/recentlyAddedMasscares";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export const generateMetadata = async () => HomeMetadata;

// Viewport export remains separate
export const viewport = "width=device-width, initial-scale=1";

export default async function Home() {
  const session = await getSessionAction();

  return (
    <>
      <Landing />

      <div className="section">
        <MartyrsStatistics />
      </div>

      <div className="container ">
        {/* todays martyr */}
        <div className="section bg-white p-6 border rounded-xl">
          <Heading
            title=""
            highLightText="شهيد اليوم"
            details="وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ ۚ بَلْ أَحْيَاءٌ وَلَٰكِن لّا تَشْعُرُونَ"
            highlightColor="before:bg-primary"
            className="z-10"
          />
          <TodaysMartyr />
        </div>

        <div className="section">
          <AddStoryBanner />
        </div>

        <div className="section">
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
        </div>

        {/* Masscard section*/}
        <div className="section">
          <Heading
            highLightText="المجازر الصهيونية"
            highlightColor="before:bg-primary"
            title=""
            details="وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ إِنَّمَا يُؤَخِّرُهُمْ لِيَوْمٍ تَشْخَصُ فِيهِ الْأَبْصَارُ "
            className="w-fit"
          />

          <RecentlyAddedMasscares />

          <Link
            href={"/massacres"}
            className="text-primary flex items-center gap-2 justify-center hover:underline text-sm w-fit mx-auto mt-8"
          >
            <p>عرض الكل</p>
            <BsArrowLeft />
          </Link>
        </div>
      </div>
    </>
  );
}
