import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Suspense } from "react";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import StoriesSection from "@/containers/stories/storiesSection";

export default async function Page() {
  return (
    <div className="container mt-24 min-h-screen">
      <PageTitles />

      <Heading
        title=""
        highLightText="شهداؤنا الأبرار"
        details="وَلَئِن قُتِلْتُمْ فِي سَبِيلِ اللَّهِ أَوْ مُتُّمْ لَمَغْفِرَةٌ مِّنَ اللَّهِ وَرَحْمَةٌ خَيْرٌ مِّمَّا يَجْمَعُونَ"
        className="w-fit mt-8"
      />

      <Suspense
        fallback={<StoryCardSkeletonLoader length={8} className="!mt-8" />}
      >
        <StoriesSection />
      </Suspense>

      <div className="mt-4 flex justify-center gap-2 text-gray_dark text-[14px] ">
        جارٍ جلب البيانات
        <AiOutlineLoading3Quarters size={16} className="animate-spin" />
      </div>
    </div>
  );
}
