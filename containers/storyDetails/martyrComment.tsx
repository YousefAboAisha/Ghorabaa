import { CommentInterface } from "@/app/interfaces";
import { dateConversion } from "@/conversions";
import { FaQuoteLeft } from "react-icons/fa";

export default function MartyrComment({
  text,
  user_id,
  createdAt,
}: Partial<CommentInterface>) {
  return false ? (
    <h2>Loading...</h2>
  ) : (
    <div
      className={`relative flex flex-col mt-5 bg-[#FFF] shadow-sm p-6 rounded-sm rounded-tl-3xl rounded-br-3xl rounded-bl-3xl `}
    >
      <div className="flex items-center gap-2 text-[11px]">
        <h5>بواسطة: </h5>
        <h5 className="font-bold">{user_id?.toString()}</h5>
      </div>
      <p className="text-[13px] break-words mt-3">{text}</p>
      <p className="text-gray-500 text-[11px] absolute bottom-2 left-6">
        {createdAt ? dateConversion(createdAt) : "تاريخ غير متوفر"}
      </p>
      <FaQuoteLeft className="absolute top-3 left-3 opacity-5" size={30} />
    </div>
  );
}
