import { StaticImageData } from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";

type FeatureCardProps = {
  profileImage: StaticImageData;
  reviewText: string;
  reviewerName: string;
  profession: string;
};

const CommentCard = ({
  reviewText,
  reviewerName,
  profession,
}: FeatureCardProps) => {
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-lg bg-white shadow-md border-b-4 border-primary w-full odd:translate-y-10 hover:shadow-2xl duration-300 cursor-pointer ">
      <div className="flex items-center gap-1 text-[11px]">
        <h5>بواسطة: </h5>
        <h5 className="font-bold">يوسف رشاد أبو عيشة</h5>
      </div>

      <p className="text-[14px]">&quot;{reviewText}&quot;</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <FaUserCircle size={40} className="text-gray-500" />
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="text-[12px] font-extrabold">{reviewerName}</h5>
          <span className="text-[12px] ">غزة - تل الهوا</span>
        </div>
      </div>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute bottom-6 left-6 opacity-5" size={50} />
    </div>
  );
};

export default CommentCard;
