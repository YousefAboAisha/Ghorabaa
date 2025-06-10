import { StoryInterface } from "@/app/interfaces";
import { dateConversion } from "@/utils/format";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";

interface StoryCardsProps {
  data?: StoryInterface;
}

const StoryPendingCard = ({ data }: StoryCardsProps) => {
  return (
    <Link
      target="_blank"
      href={`/stories/${data?._id}`}
      className="relative flex flex-col gap-1 bg-white p-4 border rounded-lg hover:shadow-md duration-500 cursor-pointer"
    >
      <FaCircle className="absolute top-2 left-2 text-orange-500" size={10} />

      <h2 className="truncate">الشهيد/ {data?.name}</h2>

      <p className="font-light text-[13px] mb-5 line-clamp-3">{data?.bio}</p>

      <span className="absolute bottom-2 left-2 text-[10px] text-gray_dark mt-2">
        {data?.createdAt ? dateConversion(data.createdAt) : null}
      </span>
    </Link>
  );
};

export default StoryPendingCard;
