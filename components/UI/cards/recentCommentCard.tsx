import { FaQuoteLeft } from "react-icons/fa6";

const RecentCommentCard = () => {
  return (
    <div className="relative flex flex-col gap-2 p-4 rounded-sm bg-white border w-full hover:shadow-lg duration-300 cursor-pointer ">
      <p className="text-[10px] text-gray_dark">15 يناير 2023 : 12:00 صباحاً</p>

      <div className="flex items-center gap-1 text-sm text-primary font-semibold mt-1">
        <h5>التعليق بواسطة: </h5>
        <h5>يوسف رشاد أبو عيشة</h5>
      </div>

      <p className="text-sm font-light">
        &quot;رحمك الله يا حبيب، والمجد لك يا شهيد&quot; &quot;رحمك الله يا
        حبيب، والمجد لك يا شهيد&quot; &quot;رحمك الله يا حبيب، والمجد لك يا
        شهيد&quot; &quot;رحمك الله يا حبيب، والمجد لك يا شهيد&quot; &quot;رحمك
        الله يا حبيب، والمجد لك يا شهيد&quot; &quot;رحمك الله يا حبيب، والمجد لك
        يا شهيد&quot;
      </p>

      <h5 className="gap-1 text-sm font-semibold text-secondary mt-2">
        الشهيد: محمد عبد الله حسب الله
      </h5>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute bottom-4 left-4 opacity-5" size={50} />
    </div>
  );
};

export default RecentCommentCard;
