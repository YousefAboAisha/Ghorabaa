import { MassacreStatus } from "@/app/enums";
import { MassacreInterface } from "@/app/interfaces";
import MassacreDetailsSkeletonLoader from "@/components/UI/loaders/massacreDetailsSkeletonLoader";
import MassacreDetails from "@/containers/masscares/massacreDetails";
import { Metadata } from "next";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/fetch/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return {
      title: "المجزرة غير موجود",
      description: "لم يتم العثور على معلومات المجزرة",
    };
  }

  const data: MassacreInterface = await res.json();

  if (data.status !== MassacreStatus.APPROVED) return {};

  return {
    title: `مجزرة ${data.title} | منصة الشهداء`,
    description: data.description?.slice(0, 150) || "نبذة عن المجزرة",
    openGraph: {
      title: `مجزرة ${data.title} | منصة الشهداء`,
      description: data.description?.slice(0, 150) || "نبذة عن المجزرة",
      images: [
        {
          url: data.cover_image || "/notFound.png",
          width: 800,
          height: 600,
          alt: `صورة المجزرة ${data.title}`,
        },
      ],
      url: `https://ghorabaa.com/stories/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `مجزرة ${data.title} | منصة الشهداء`,
      description: data.description?.slice(0, 150) || "نبذة عن المجزرة",
      images: [data.cover_image || "/notFound.png"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  console.log("massacre ID", id);

  return (
    <div className="mt-[70px] min-h-screen">
      <div className="container lg:w-6/12 mt-24">
        <Suspense fallback={<MassacreDetailsSkeletonLoader />}>
          <MassacreDetails id={id} />
        </Suspense>
      </div>
    </div>
  );
}
