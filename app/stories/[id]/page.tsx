import CommentsSection from "@/containers/storyDetails/commentsSection";
import StoryDetailsSkeletonLoader from "@/components/UI/loaders/storyDetailsSkeletonLoader";
import { getSessionAction } from "@/app/actions/registerActions";
import StoryDetailsSection from "@/containers/storyDetails/storyDetailsSection";
import { Suspense } from "react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stories/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return {
      title: "الشهيد غير موجود",
      description: "لم يتم العثور على معلومات الشهيد",
    };
  }

  const data = await res.json();

  return {
    title: `الشهيد ${data.name} | منصة الشهداء`,
    description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
    openGraph: {
      title: `الشهيد ${data.name} | منصة الشهداء`,
      description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
      images: [
        {
          url: data.image || "/notFound.png",
          width: 800,
          height: 600,
          alt: `صورة الشهيد ${data.name}`,
        },
      ],
      url: `https://ghorabaa.com/stories/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `الشهيد ${data.name} | منصة الشهداء`,
      description: data.bio?.slice(0, 150) || "نبذة عن الشهيد",
      images: [data.image || "/notFound.png"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await getSessionAction();
  console.log("[Story Details] Session values", session);

  return (
    <div className="mt-[70px] min-h-screen">
      <div className="container lg:w-6/12 mt-24">
        <Suspense fallback={<StoryDetailsSkeletonLoader />}>
          <StoryDetailsSection id={id} />
        </Suspense>
        <CommentsSection session={session} id={id} />
      </div>
    </div>
  );
}
