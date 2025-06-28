"use client";
import { CommentInterface } from "@/app/interfaces";
import { dateConversion } from "@/utils/format";
import { getRoleInArabic } from "@/utils/text";
import Image from "next/image";
import Link from "next/link";

type CommentPreviewCardProps = {
  data: CommentInterface;
};

const CommentPreviewCard = ({ data }: CommentPreviewCardProps) => {
  const { author_image, author_name, author_id, text, createdAt, author_role } =
    data;

  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-3xl rounded-br-none border bg-background_light shadow-sm w-full h-fit hover:shadow-md duration-200">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border rounded-full">
          <Image
            src={author_image || "/notFound.png"}
            width={45}
            height={45}
            alt="صورة الملف الشخصي للمعلق"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Link
            target="_blank"
            href={`/profile/${author_id}`}
            className="text-[13px] font-semibold hover:underline"
          >
            {author_name}
          </Link>
          <p className="text-primary text-[10px] font-semibold">
            {getRoleInArabic(author_role!)}
          </p>
        </div>
      </div>

      <p className="text-[14px] mb-4 text-wrap font-light">{text}</p>

      <p className="text-gray-500 text-[11px] absolute bottom-2 left-6">
        {createdAt ? dateConversion(createdAt) : "تاريخ غير متوفر"}
      </p>
    </div>
  );
};

export default CommentPreviewCard;
