import Heading from "@/components/UI/typography/heading";
import { Suspense } from "react";
import StoryCardSkeletonLoader from "@/components/UI/loaders/storyCardSkeletonLoader";
import StoriesSection from "@/containers/stories/storiesSection";
import { StoriesMetadata } from "../lib/metadata";
import FilterButton from "@/containers/stories/filterButton";
import Hero from "@/components/layout/hero";
import { getServerSession } from "next-auth";

export const generateMetadata = async () => StoriesMetadata;

export default async function Page() {
  const session = await getServerSession();

  return (
    <div className="container mt-24 min-h-screen">
      <Hero />

      <div className="flex items-center justify-between gap-4 mt-16">
        <Heading
          title=""
          highLightText="شهداؤنا الأبرار"
          details="وَلَئِن قُتِلْتُمْ فِي سَبِيلِ اللَّهِ أَوْ مُتُّمْ لَمَغْفِرَةٌ مِّنَ اللَّهِ وَرَحْمَةٌ خَيْرٌ مِّمَّا يَجْمَعُونَ"
          className="w-fit mt-8"
        />

        <FilterButton />
      </div>

      <Suspense
        fallback={<StoryCardSkeletonLoader length={8} className="!mt-8" />}
      >
        <StoriesSection session={session} />
      </Suspense>
    </div>
  );
}
