import React from "react";

const MartyrPendingCard = () => {
  return (
    <div className="relative flex flex-col gap-1 bg-white p-4 border rounded-lg hover:shadow-md duration-500 cursor-pointer">
      <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] p-1 rounded-md">
        بانتظار الموافقة
      </span>

      <h2>الشهيد/ محمد عبد الله حسب الله</h2>

      <p className="text-gray_dark text-sm w-10/12 my-1">
        تمرُّ اليوم الذكرى الأولى لأفدح خساراتي، وكأنّ جزءًا من روحي برحيلك.
        عامٌ كاملٌ مضى، وحزني عليكَ لم يكتمل بعد، وكأنّ كلَّ يومٍ هو أولُ يوم
        لِفراقك. لم أستطع أن كما يليق بك, فقد كنت لي أكثرَ من أخ ورفيق وصديق
        وسند ..
      </p>

      <span className="absolute bottom-2 left-2 text-[10px] text-gray_dark mt-2">
        منذ 5 أيام
      </span>
    </div>
  );
};

export default MartyrPendingCard;
