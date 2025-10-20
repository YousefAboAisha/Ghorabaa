import StoryDetailsSkeletonLoader from "@/components/UI/loaders/storyDetailsSkeletonLoader";
import { Suspense } from "react";
import { Metadata } from "next";
import { StoryStatus } from "@/app/enums";
import { getFullName } from "@/utils/text";
import MissingDetails from "@/containers/missings/missingDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/missings/fetch/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return {
      title: "المفقود غير موجود",
      description: "لم يتم العثور على معلومات المفقود",
    };
  }

  const data = await res.json();

  if (data.status !== StoryStatus.APPROVED) return {};

  const fullName = getFullName(data.title);

  return {
    title: `المفقود ${fullName} | منصة غرباء`,
    description:
      data.bio?.slice(0, 150) || "تفاصيل عن المفقود المفقودين الفلسطينيين",
    keywords: [
      "مفقودين فلسطين",
      "بحث عن مفقودين",
      "المفقودين الفلسطينيين",
      "توثيق المفقودين",
      "منصة غرباء",
    ],
    openGraph: {
      title: `المفقود ${fullName} | منصة غرباء`,
      description:
        data.bio?.slice(0, 150) || "تفاصيل عن المفقود المفقودين الفلسطينيين",
      images: [
        {
          url: data.image || "/notFound.png",
          width: 800,
          height: 600,
          alt: `صورة المفقود ${fullName}`,
        },
      ],
      url: `https://ghorabaa.com/missings/${id}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `المفقود ${fullName} | منصة غرباء`,
      description:
        data.bio?.slice(0, 150) || "تفاصيل عن المفقود المفقودين الفلسطينيين",
      images: [data.image || "/notFound.png"],
    },
    alternates: {
      canonical: `/missings/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "dc:subject": "المفقودين الفلسطينيين",
      "profile:gender": data.gender || "غير محدد",
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mt-[70px] min-h-screen">
      <div className="container lg:w-6/12 mt-24">
        <Suspense fallback={<StoryDetailsSkeletonLoader />}>
          <MissingDetails id={id} />
        </Suspense>
      </div>
    </div>
  );
}
