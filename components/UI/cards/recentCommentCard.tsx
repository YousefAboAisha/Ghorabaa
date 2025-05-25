import { CommentInterface } from "@/app/interfaces";
import { dateConversion } from "@/utils/format";

type RecentCommentCardProps = {
  data: CommentInterface;
};

const RecentCommentCard = ({ data }: RecentCommentCardProps) => {
  return (
    <div className="relative flex flex-col gap-2 p-4 rounded-sm bg-white border w-full hover:shadow-lg duration-300 cursor-pointer ">
      <p className="text-[10px] text-gray_dark">
        {dateConversion(data.createdAt)}
      </p>

      <div className="flex items-center gap-1 text-[13px] text-secondary font-semibold mt-1">
        <h5>التعليق بواسطة: </h5>
        <h5>{data.author_name}</h5>
      </div>

      <p className="text-sm font-light">{data.text}</p>
    </div>
  );
};

export default RecentCommentCard;
