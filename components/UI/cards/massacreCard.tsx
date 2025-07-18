import { MassacreInterface } from "@/app/interfaces";
import Image from "next/image";
import React from "react";
import { HighlightedText } from "../typography/highlightText";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { arabicDateConversion } from "@/utils/format";
import Link from "next/link";
import Button from "../inputs/button";
import { FaEye } from "react-icons/fa";
import image from "@/public/uploads/5.jpg";

type Props = {
  data?: MassacreInterface;
};

const MassacreCard = ({ data }: Props) => {
  return (
    <div className="relative group w-full flex flex-col border bg-white hover:shadow-xl duration-500 rounded-2xl overflow-hidden">
      <Link href={`/massacres/${data?._id}`} title="عرض تفاصيل المجزرة">
        <div className="flex items-center justify-center relative h-[270px] w-full overflow-hidden">
          <Image
            src={image}
            alt="صورة المجزرة"
            className="w-full rounded-b-none object-cover min-h-full group-hover:scale-150 duration-[2s]"
            width={1000}
            height={1000}
          />
        </div>
      </Link>

      <div className="relative p-4">
        <div className="flex items-center gap-2 text-[10px] text-gray_dark">
          <p> تاريخ النشر:</p>
          <p>{arabicDateConversion(new Date())}</p>
        </div>

        <div className="flex items-center gap-2 text-sm mb-2 mt-2">
          <p className="text-lg font-bold text-secondary truncate">
            <HighlightedText
              highlights={data?.highlight}
              field="title"
              fallback={data?.title ?? "مجزرة الشجاعية"}
            />
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mt-2 text-[12px]">
          <div className="flex items-center gap-2">
            <GrLocation size={16} className="text-primary" />
            <div className="flex items-center gap-1">
              <p>{data?.location.city || "غزة"}</p>
              {" - "}
              <p>{data?.location.neighborhood || "حي الشجاعية"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GrCalendar size={16} className="text-primary" />
            <p className="text-[12px]">{arabicDateConversion(new Date())}</p>
          </div>
        </div>

        {/* Bio with highlighting */}
        <p
          style={{
            lineHeight: "20px",
          }}
          className="text-gray-600 text-[13px] mt-3 line-clamp-2 h-10"
        >
          <HighlightedText
            highlights={data?.highlight}
            field="description"
            fallback={
              data?.description ??
              "هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة هذه تفاصيل المجزرة "
            }
          />
        </p>
      </div>

      <Link
        href={`/massacres/${data?._id}`}
        title="عرض تفاصيل المجزرة"
        className="w-full px-4 pb-4"
      >
        <Button
          title="تفاصيل المجزرة"
          icon={<FaEye size={17} />}
          className="bg-secondary"
          hasShiningBar={false}
        />
      </Link>
    </div>
  );
};

export default MassacreCard;
