"use client";
import { CommentInterface } from "@/app/interfaces";
import { dateConversion, getRoleInArabic } from "@/conversions";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";

type CommentCardProps = {
  data: CommentInterface;
};

const CommentCard = ({ data }: CommentCardProps) => {
  const { author_image, author_name, text, createdAt, author_role } = data;
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-3xl rounded-tr-none border bg-white shadow-sm w-full h-fit hover:shadow-md duration-200">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border rounded-full">
          {author_image ? (
            <Image
              src={author_image}
              width={45}
              height={45}
              alt="صورة الملف الشخصي للمعلق"
              className="rounded-full"
            />
          ) : (
            <div className="p-8">
              <FaUserCircle size={14} className="mx-auto text-gray_dark" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="text-[13px] font-semibold">{author_name}</h5>
          <p className="text-primary text-[10px] font-semibold">
            {getRoleInArabic(author_role!)}
          </p>
        </div>
      </div>

      <p className="text-[14px] mb-4 text-wrap font-normal">{text}</p>

      <p className="text-gray-500 text-[11px] absolute bottom-2 left-6">
        {createdAt ? dateConversion(createdAt) : "تاريخ غير متوفر"}
      </p>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute top-2 left-2 opacity-5" size={50} />
    </div>
  );
};

export default CommentCard;
