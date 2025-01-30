import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function MartyrComment() {
  return false ? (
    <h2>Loading...</h2>
  ) : (
    <div
      className={`relative flex flex-col mt-5 bg-[#FFF] shadow-sm p-5 rounded-sm rounded-tl-3xl rounded-br-3xl rounded-bl-3xl `}
    >
      <div className="flex items-center gap-2 text-[11px]">
        <h5>بواسطة: </h5>
        <h5 className="font-bold">يوسف رشاد أبو عيشة</h5>
      </div>
      <p className="text-[13px] break-words mt-3">
        رحمكَ اللهُ يا حبيب، والمجد لك يا شهيد، سيظلّ ذكرُك الطيّبُ والحسنُ
        حاضراً فينا إلى أن نلقى الله، ما تنسوا محمد أبداً ❤️
      </p>
      <p className="text-gray-500 text-[10px] mt-2 self-end">Jan, 15th 2025</p>
      <FaQuoteLeft className="absolute bottom-3 right-3 opacity-5" size={30} />
      <FaQuoteLeft className="absolute top-3 left-3 opacity-5" size={30} />
    </div>
  );
}
