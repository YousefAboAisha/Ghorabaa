import { FaDollarSign, FaUserCircle } from "react-icons/fa";

const DonationDetailsCard = () => {
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-lg bg-white shadow-md border-b-4 border-primary w-full hover:shadow-xl duration-300 cursor-pointer ">
      <div className="flex items-center gap-1 text-[11px]">
        <div className="flex items-center gap-1">
          <FaUserCircle size={40} className="text-gray-500" />
        </div>
        <h5 className="font-bold">يوسف رشاد أبو عيشة</h5>
      </div>

      {/* <p className="text-[14px]">
        &quot;
        {
          "الشّهيد الصّديق وحبيب القلب المُهندس محمد عبد الله حسب الله، كان سَمِحاً، باسماً، عاليَ الخُلق والهِمّة، مُلتزماً ومحبوباً من الجميع"
        }
        &quot;
      </p> */}

      <div className="relative">
        <h2 className="text-5xl text-center">1000</h2>
      </div>

      <FaDollarSign
        className="absolute bottom-5 left-5 opacity-50 text-primary"
        size={20}
      />

      <div className="flex items-center gap-2 mt-2">
        <div className="flex flex-col gap-1">
          <span className="text-gray_dark text-[10px] font-noto_kufi">
            قبل 3 ساعات
          </span>
        </div>
      </div>

      {/* absolute icon */}
    </div>
  );
};

export default DonationDetailsCard;
