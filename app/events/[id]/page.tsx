import StoryDetailsSkeletonLoader from "@/components/UI/loaders/storyDetailsSkeletonLoader";
import { Suspense } from "react";
import { Metadata } from "next";
import { StoryStatus } from "@/app/enums";
import { getFullName } from "@/utils/text";
import EventDetails from "@/containers/events/eventDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/events/fetch/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return {
      title: "الفعالية غير موجودة",
      description: "لم يتم العثور على معلومات الشهيد",
    };
  }

  const data = await res.json();

  if (data.status !== StoryStatus.APPROVED) return {};

  const fullName = getFullName(data.title);

  return {
    title: `الشهيد ${fullName} | منصة الشهداء`,
    description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
    openGraph: {
      title: `الشهيد ${fullName} | منصة الشهداء`,
      description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
      images: [
        {
          url: data.image || "/notFound.png",
          width: 800,
          height: 600,
          alt: `صورة الشهيد ${fullName}`,
        },
      ],
      url: `https://ghorabaa.com/stories/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `الشهيد ${fullName} | منصة الشهداء`,
      description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
      images: [data.image || "/notFound.png"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mt-[70px] min-h-screen">
      <div className="container lg:w-6/12 mt-24">
        <Suspense fallback={<StoryDetailsSkeletonLoader />}>
          <EventDetails id={id} />
        </Suspense>
      </div>
    </div>
  );
}
