import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";

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
          <h2 className="font-bold">يوم الشهيد </h2>

          <p className="text-gray-600 text-[13px] mt-2">
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل
            الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية
          </p>
        </div>

        <hr className="mt-2" />

        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2 text-[12px] font-semibold">
            <FiCalendar className="text-primary" size={18} />
            <p className="flex items-center gap-1">
              17 فبراير 2025 - الساعة 5 مساءً
            </p>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-semibold">
            <FiMapPin className="text-primary" size={18} />
            <p className="flex items-center gap-1">فندق المشتل</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
