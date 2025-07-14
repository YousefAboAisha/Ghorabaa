import PageTitles from "@/components/UI/typography/pageTitles";
import { arabicDateConversion, dateConversion } from "@/utils/format";
import Image from "next/image";
import React from "react";
import { FaEye } from "react-icons/fa";
import { GrCalendar, GrLocation } from "react-icons/gr";
import Link from "next/link";
import MassacreStatisticsCard from "@/components/UI/cards/massacreStatisticsCard";
import { notFound } from "next/navigation";
import MassacreMediaSwiper from "@/components/UI/swipers/massacres/massacreMediaSwiper";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { MassacreInterface } from "@/app/interfaces";
import InternationalReactionsSwiper from "@/components/UI/swipers/massacres/internationalReactionsSwiper";
import LogVisit from "./logVisits";
import dead from "@/public/icons/dead.png";
import house from "@/public/icons/house.png";
import injury from "@/public/icons/injury.png";

type Props = {
  id: string;
};

const MassacreDetails = async ({ id }: Props) => {
  console.log("massacre ID", id);

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

  console.log("Result", result);

  const { error } = result;
  const data: MassacreInterface = result;

  if (error) {
    return <ErrorMessage />;
  }

  console.log("Massacres Error:", error);
  console.log("Massacres Data:", data);

  return (
    <div className="flex flex-col gap-2 mt-24">
      <LogVisit massacreId={id} />
      <PageTitles storyName={data.title} />

      <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
        <Image
          src={data?.cover_image || "/notFound.png"}
          alt="Massacres cover"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      <div className="relative mt-1">
        <div className="flex flex- justify-between text-[11px]">
          <div className="flex items-center gap-2 text-gray_dark">
            <p>تاريخ النشر: </p>
            <p> {dateConversion(data?.createdAt)} </p>
          </div>

          <div className="flex items-center gap-2 text-gray_dark">
            <p>{data.visits}</p>
            <FaEye size={16} />
          </div>
        </div>

        <h4 className="text-2xl font-bold mt-6">{data?.title}</h4>

        {/* {data?.key} */}

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

        <div className="flex gap-6 mt-4 text-[12px]">
          <div className="flex items-center gap-2">
            <GrLocation size={18} className="text-gray_dark" />
            <div className="flex items-center gap-1">
              <p>{data.location.city}</p>
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

        <div className="mt-8">
          <h2 className="font-bold text-lg">تفاصيل المجزرة</h2>
          <p className="text-md font-light mt-2">{data.description}</p>
        </div>
      </div>

      {data.media.length > 0 && <MassacreMediaSwiper data={data.media} />}

      {/* massacres results section */}
      <div className="relative w-full mt-24 cards-grid-3 gap-3">
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

      <InternationalReactionsSwiper data={data?.internationalReactions} />

      <div className="mt-6">
        <h2 className="font-bold text-lg">روابط خارجية</h2>
        <div className="cards-grid-3 gap-4 mt-4">
          {Object.entries(data.externalLinks).map(([key, link]) => (
            <Link
              title={key}
              key={key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-gray-200 hover:border-secondary shadow-sm hover:shadow-md duration-200 bg-white"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={`/icons/${key}.svg`} // assumes your image is named like the key
                  alt={`${link.title} logo`}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-sm mt-3">{link.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new URL(link.href).hostname}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MassacreDetails;
