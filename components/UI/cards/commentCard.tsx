import { dateConversion } from "@/conversions";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";

type FeatureCardProps = {
  text: string;
  name: string;
  image: string;
  createdAt: Date;
};

const CommentCard = async ({
  text,
  name,
  image,
  createdAt,
}: FeatureCardProps) => {
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-lg bg-white shadow-md w-full">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {image ? (
            <Image
              src={image}
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
          <h5 className="text-[13px] font-semibold">{name}</h5>
          <p className="text-primary text-[10px] font-semibold">مستخدم عادي</p>
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
