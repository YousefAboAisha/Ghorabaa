import PageTitles from "@/components/UI/typography/pageTitles";
import { arabicDateConversion, fullDateConversion } from "@/utils/format";
import Image from "next/image";
import React from "react";
import { FaEye } from "react-icons/fa";
import { GrCalendar, GrLocation } from "react-icons/gr";
import MassacreStatisticsCard from "@/components/UI/cards/massacreStatisticsCard";
import { notFound } from "next/navigation";
import MassacreMediaSwiper from "@/components/UI/swipers/massacres/massacreMediaSwiper";
import { MassacreInterface } from "@/app/interfaces";
import InternationalReactionsSwiper from "@/components/UI/swipers/massacres/internationalReactionsSwiper";
import LogVisit from "./logVisits";
import dead from "@/public/icons/dead.png";
import house from "@/public/icons/house.png";
import injury from "@/public/icons/injury.png";
import { ContentType, MassacreStatus, Role } from "@/app/enums";
import { BsExclamationTriangle } from "react-icons/bs";
import ShareButton from "../stories/shareButton";
import { getServerSession } from "next-auth";

type Props = {
  id: string;
};

const getFullImageUrl = (url: string) => {
  if (!url) return "/notFound.png";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
};

const MassacreDetails = async ({ id }: Props) => {
  const session = await getServerSession();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/fetch/${id}`,
    {
      cache: "no-store", // optional but recommended if dynamic
    }
  );

  if (!response.ok) {
    notFound(); // redirects to 404 page
  }

  const result = await response.json();

  const { error } = result;

  if (error) {
    notFound(); // only allow access if approved, OR user is admin
  }

  const data: MassacreInterface = result;

  // Determine user role (default to normal user if no session)
  const userRole = session?.user.role || Role.USER;
  const isAdmin = userRole === Role.ADMIN || userRole === Role.EDITOR;

  // Check massacre status
  const isApproved = data.status === MassacreStatus.APPROVED;

  // Access rules:
  // - Admins can access any status
  // - Normal users can only access approved
  if (!isAdmin && !isApproved) {
    notFound();
  }

  const imageUrl = getFullImageUrl(data.cover_image);
  const mediaUrls = data.media.map((url) => getFullImageUrl(url));

  // Generate placeholder
  return (
    <div className="flex flex-col gap-2 mt-24">
      <LogVisit massacreId={id} />

      {data.status === MassacreStatus.PENDING && (
        <div className="relative flex items-center gap-2 bg-pending text-white border rounded-md shadow-sm p-3 mb-4 w-full font-semibold">
          <BsExclamationTriangle size={20} />
          <p className="text-[13px]">
            هذه المجزرة في وضع المعاينة حالياً، وليست منشورة رسمياً حتى الآن!
          </p>
        </div>
      )}

      {data.status === MassacreStatus.ARCHIVED && (
        <div className="relative flex items-center gap-2 bg-rejected text-white border rounded-md shadow-sm p-3 mb-4 w-full font-semibold">
          <BsExclamationTriangle size={20} />
          <p className="text-[13px]">هذه المجزرة مؤرشفة حالياً!</p>
        </div>
      )}

      <PageTitles content_title={data.title} />

      <div className="relative w-full h-[60vh] rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="صورة الغلاف للمجزرة "
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
          className="object-cover object-center"
          priority
          quality={75}
        />
      </div>

      <div className="relative mt-1">
        <div className="flex flex- justify-between text-[11px]">
          <div className="flex items-center gap-2 text-gray_dark">
            <p>تاريخ النشر: </p>
            <p> {fullDateConversion(data?.createdAt)} </p>
          </div>

          <div className="flex items-center gap-2 text-gray_dark">
            <p>{data.visits}</p>
            <FaEye size={16} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 ">
          <h4 className="text-2xl font-bold mt-6">
            {" "}
            مجزرة {data?.title || "عنوان المجزرة غير متوفر"}
          </h4>

          {/* Share content button */}
          {data.status === MassacreStatus.APPROVED && data && (
            <ShareButton data={data!} content_type={ContentType.MASSACRE} />
          )}
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {data.tags?.map((keywrod, index) => {
              return (
                <div
                  key={index}
                  className="border bg-white rounded-xl p-1.5 px-3 text-[10px]"
                >
                  #{keywrod}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-6 mt-4 text-[12px]">
          <div className="flex items-center gap-2">
            <GrLocation size={18} className="text-gray_dark" />
            <div className="flex items-center gap-1">
              <p>{data.location.city}</p>
              {" - "}
              <p>{data.location.neighborhood}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GrCalendar size={18} className="text-gray_dark" />
            <p className="text-[12px]">
              {arabicDateConversion(data?.date as Date)}
            </p>
          </div>
        </div>

        {/* massacres results section */}
        <div className="relative w-full mt-8 cards-grid-3 gap-3">
          <MassacreStatisticsCard
            label="الشهداء"
            icon={dead}
            classname="bg-[#c2361620]"
            count={data.deaths}
          />

          <MassacreStatisticsCard
            icon={injury}
            label="المصابين"
            classname="bg-[#f39c1220]"
            count={data.injuries}
          />

          <MassacreStatisticsCard
            icon={house}
            label="المنازل المدمرة"
            classname="bg-[#1e272e20]"
            count={data.destroyedHouses}
          />
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-lg">تفاصيل المجزرة</h2>
          <p className="text-md font-light mt-2">{data.description}</p>
        </div>
      </div>

      {data.media.length > 0 && <MassacreMediaSwiper data={mediaUrls} />}

      <InternationalReactionsSwiper data={data?.internationalReactions} />
    </div>
  );
};

export default MassacreDetails;
