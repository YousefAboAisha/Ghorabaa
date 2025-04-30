import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiClock } from "react-icons/fi";

const EventCard = () => {
  return (
    <Link href={`/events/1`} className="mt-4">
      <div className="relative group w-full flex flex-col border bg-white rounded-lg overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={"/home-landing.jpg"}
            alt="img"
            className="w-full rounded-b-none"
            width={300}
            height={300}
          />
        </div>

        <div className="relative p-4">
          <h4>يوم الشهيد </h4>

          <p className="text-gray-600 text-[13px] mt-2">
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل
            الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية
          </p>

          <div className="flex flex-col gap-2 mt-6 text-[13px]">
            <div className="flex items-center gap-2 font-bold ">
              <FiCalendar className="text-gray_dark" size={16} />
              <p className="flex items-center gap-1">17 فبراير 2025</p>
            </div>

            <div className="flex items-center gap-2 font-bold ">
              <FiClock className="text-gray_dark" size={16} />
              <p className="flex items-center gap-1">الساعة الخامسة مساءً</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
