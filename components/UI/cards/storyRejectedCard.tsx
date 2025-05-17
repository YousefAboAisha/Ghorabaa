import { StoryInterface } from "@/app/interfaces";
import { dateConversion } from "@/conversions";
import { FaCircle } from "react-icons/fa";

interface StoryCardsProps {
  data?: StoryInterface;
}

const StoryRejectedCard = ({ data }: StoryCardsProps) => {
  return (
    <div className="relative flex flex-col gap-1 bg-white p-4 border rounded-lg hover:shadow-md duration-500 cursor-pointer">
      <FaCircle className="absolute top-2 left-2 text-red-600" size={10} />

      <h2 className="truncate">الشهيد/ {data?.name}</h2>

      <p className="font-light text-[13px] mb-5 line-clamp-3">{data?.bio}</p>

      <p className=" text-red-600 rounded-sm w-fit font-semibold text-[12px] my-1">
        البيانات المرفقة غير صحيحة
      </p>

      <span className="absolute bottom-2 left-2 text-[10px] text-gray_dark mt-2">
        {data?.createdAt ? dateConversion(data.createdAt) : null}
      </span>
    </div>
  );
};

export default StoryRejectedCard;
