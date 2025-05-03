import { FaDollarSign, FaUserCircle } from "react-icons/fa";

const DonationDetailsCard = () => {
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-lg bg-white shadow-md border-b-4 border-primary w-full hover:shadow-xl duration-300 cursor-pointer ">
      <div className="flex items-center gap-2 text-[11px]">
        <FaUserCircle size={40} className="text-gray_dark" />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">يوسف رشاد أبو عيشة</p>
          <p>16 فبراير 2025</p>
        </div>
      </div>

      <p className="text-[13px]">
        نسأل الله القبول، وأن يفرج عنكم ما أنتم فيه من شدّة وكرب! نسأل الله
        القبول، وأن يفرج عنكم ما أنتم فيه من شدّة وكرب! نسأل الله القبول، وأن
        يفرج عنكم ما أنتم فيه من شدّة وكرب!
      </p>

      <div className="relative">
        <h2 className="text-5xl text-center font-bold">75</h2>
      </div>

      <FaDollarSign
        className="absolute bottom-5 left-5 opacity-50 text-primary"
        size={30}
      />

      <div className="flex items-center gap-2 mt-2">
        <div className="flex flex-col gap-1">
          <span className="text-gray_dark text-[10px] font-noto_kufi">
            منذ 3 ساعات
          </span>
        </div>
      </div>

      {/* absolute icon */}
    </div>
  );
};

export default DonationDetailsCard;
