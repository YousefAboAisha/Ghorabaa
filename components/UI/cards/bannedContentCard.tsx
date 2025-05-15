import Link from "next/link";
import { FaBan } from "react-icons/fa6";

const BannedContentCard = () => {
  return (
    <div className="relative flex flex-col gap-2 p-6 rounded-sm bg-white border">
      <p className="text-[10px] text-gray_dark">15 يناير 2023 : 12:00 صباحاً</p>

      <div className="inline text-sm mt-1 font-light">
        تم حظر التعليق الذي قمت بكتابته على قصة الشهيد
        <Link
          href={"/stories/1"}
          className="inline-block mx-1 font-bold text-red-600 hover:underline "
        >
          [محمد عيسى أحمد]
        </Link>
        وذلك لانتهاكه سياسات المنصة والمحتوى المسموح به.
      </div>

      <h5 className="text-[13px] mt-2 inline-block text-red-600 font-semibold">
        السبب
        <p className="inline text-secondary mx-1">تشهير واتهام باطل للشخص</p>
      </h5>

      {/* absolute icon */}
      <FaBan
        className="absolute bottom-4 left-4 opacity-10 text-red-500 -rotate-45"
        size={30}
      />
    </div>
  );
};

export default BannedContentCard;
