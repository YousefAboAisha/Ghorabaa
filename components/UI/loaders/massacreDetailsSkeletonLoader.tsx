import { FaEye } from "react-icons/fa";
import { GrCalendar, GrLocation } from "react-icons/gr";

const MassacreDetailsSkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-2 mt-24 animate-pulse">
      {/* Status banner placeholder */}
      <div className="h-12 w-full bg-gray-200 rounded-md mb-4"></div>
      {/* Title placeholder */}
      <div className="h-10 w-3/4 bg-gray-200 rounded-md"></div>
      {/* Image placeholder */}
      <div className="relative w-full h-[60vh] rounded-xl overflow-hidden bg-gray-200"></div>

      {/* Meta info placeholders */}
      <div className="relative mt-1">
        <div className="flex justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <FaEye size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Main title placeholder */}
        <div className="h-8 w-full bg-gray-200 rounded mt-6"></div>

        {/* Tags placeholder */}
        <div className="flex items-center flex-wrap gap-2 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-6 w-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>

        {/* Location and date placeholders */}
        <div className="flex gap-6 mt-4 text-[12px]">
          <div className="flex items-center gap-2">
            <GrLocation size={18} className="text-gray-300" />
            <div className="flex items-center gap-1">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GrCalendar size={18} className="text-gray-300" />
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Statistics cards placeholders */}
        <div className="relative w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-100 rounded-lg"></div>
          ))}
        </div>

        {/* Description placeholders */}
        <div className="mt-8">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="mt-2 space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
      {/* Media swiper placeholder */}
      <div className="mt-8">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
      </div>
      {/* International reactions placeholder */}
      <div className="mt-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default MassacreDetailsSkeletonLoader;
