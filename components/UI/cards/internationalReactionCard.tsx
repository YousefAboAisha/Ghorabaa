import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaUserCircle } from "react-icons/fa";

const InternationalReactionCard = () => {
  return (
    <div
      style={{
        direction: "rtl",
      }}
      className="relative flex flex-col gap-4 p-8 rounded-[50px] rounded-tr-none bg-white border w-full hover:cursor-grab"
    >
      <p className="font-light">
        ارتكبت قوات الاحتلال الإسرائيلي واحدة من أفظع المجازر في حي الشجاعية شرق
        مدينة غزة، هذا شيء مؤسف!
      </p>

      <div className="flex items-center gap-3 mt-2">
        <FaUserCircle className="text-gray_dark" size={40} />

        <div className="flex flex-col gap-1">
          <h5 className="text-sm font-bold">وول ستريت جورنال</h5>
          <span className="text-gray_dark text-sm">صحافة عالمية</span>
        </div>
      </div>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute bottom-8 left-8 opacity-5" size={20} />
      <FaQuoteRight className="absolute top-2 right-2 opacity-5" size={20} />
    </div>
  );
};

export default InternationalReactionCard;
