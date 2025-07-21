import { BsEye } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const StoryDetailsSkeletonLoader = () => {
  return (
    <div className="mt-24 animate-pulse">
      {/* Status banner placeholder */}
      <div className="h-14 w-full bg-gray-200 rounded-md mb-4"></div>

      {/* Title placeholder */}
      <div className="h-10 w-3/4 bg-gray-200 rounded-md mb-6"></div>

      {/* Main image placeholder */}
      <div className="relative flex flex-col justify-center items-start w-full min-h-[80vh] bg-gray-200 rounded-2xl"></div>

      {/* Meta info placeholders */}
      <div className="relative mt-1">
        <div className="flex justify-between text-[11px] mt-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 bg-gray-200 rounded"></div>
            <BsEye size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Name and nickname placeholders */}
        <div className="flex items-center gap-2 mt-6">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Keywords placeholder */}
        <div className="flex items-center flex-wrap gap-2 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-6 w-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>

        {/* Table placeholder */}
        <div className="h-full w-full border mt-4 bg-white">
          <div className="py-3 px-4 border-b text-center text-sm border-l bg-gray-200 text-transparent font-semibold">
            المعلومات الشخصية
          </div>

          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex border-b">
              <div className="py-3 px-4 w-1/2 border-l bg-gray-100">
                <div className="h-4 w-24 bg-gray-200 rounded float-right"></div>
              </div>
              <div className="py-3 px-4 w-1/2">
                <div className="h-4 w-32 bg-gray-200 rounded float-right"></div>
              </div>
            </div>
          ))}

          {/* Social media placeholder */}
          <div className="flex border-b">
            <div className="py-3 px-4 w-1/2 border-l bg-gray-100">
              <div className="h-4 w-24 bg-gray-200 rounded float-right"></div>
            </div>
            <div className="py-3 px-4 w-1/2">
              <div className="flex items-center gap-4 float-right">
                <FaFacebook size={20} className="text-gray-300" />
                <FaXTwitter size={20} className="text-gray-300" />
                <FaInstagram size={20} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Bio placeholder */}
        <div className="mt-8">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="mt-2 space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments section placeholder */}
      <div className="mt-8">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default StoryDetailsSkeletonLoader;
