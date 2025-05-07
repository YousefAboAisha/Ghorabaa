import React from "react";
import { BsBan, BsDot } from "react-icons/bs";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
import { NotificationTypes } from "@/app/enums";
import { FaTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { FaCoins } from "react-icons/fa6";

type NotificationTypesProps = {
  type: NotificationTypes;
};

const NotificationCard = ({ type }: NotificationTypesProps) => {
  switch (type) {
    case NotificationTypes.DONATION:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-secondary text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>تبرع</h2>
            <FaCoins />
          </div>

          <div className="mt-3 font-normal text-sm mb-2">
            تم استلام تبرع جديد بقيمة
            <p className="text-secondary font-bold inline-block mx-1">
              10$
            </p>
            بواسطة
            <Link
              href={""}
              className="text-secondary hover:underline cursor-pointer font-bold mx-1"
            >
              [محمد العشي]
            </Link>
            على حملة تبرعك.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            <span>15 فبراير 2025</span>
            <BsDot />
            <span className="">12:00 صباحاً</span>
          </div>
        </div>
      );

    case NotificationTypes.BAN:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-red-600 text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>حظر</h2>
            <BsBan size={13} />
          </div>

          <div className="mt-3 font-normal text-sm mb-2">
            تم حظر المحتوى بعنوان
            <Link
              href={""}
              className="text-red-600 hover:underline cursor-pointer font-bold mx-1"
            >
              [عنوان المحتوى]
            </Link>
            بسبب مخالفته معايير المنصة.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            <span>15 فبراير 2025</span>
            <BsDot />
            <span className="">12:00 صباحاً</span>
          </div>
        </div>
      );

    case NotificationTypes.REJECT:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-orange-500 text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>رفض</h2>
            <FaTimesCircle size={13} />
          </div>

          <div className="mt-3 font-normal text-sm mb-2">
            تم رفض طلب إضافة القصة بعنوان
            <Link
              href={""}
              className="text-orange-500 hover:underline cursor-pointer font-bold mx-1"
            >
              [عنوان القصة]
            </Link>
            لعدم صحة البيانات المُرسلة.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            <span>15 فبراير 2025</span>
            <BsDot />
            <span className="">12:00 صباحاً</span>
          </div>
        </div>
      );

    case NotificationTypes.ACCEPT:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-primary text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>قبول</h2>
            <FiCheckCircle size={13} />
          </div>

          <div className="mt-3 font-normal text-sm mb-2">
            تم قبول طلبك لإضافة القصة بعنوان
            <Link
              href={""}
              className="text-primary hover:underline cursor-pointer font-bold mx-1"
            >
              [محمد عبد الله حسب الله]
            </Link>
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            <span>15 فبراير 2025</span>
            <BsDot />
            <span className="">12:00 صباحاً</span>
          </div>
        </div>
      );

    case NotificationTypes.COMMENT:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-gray_dark text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>تعليق</h2>
            <BiComment size={13} />
          </div>

          <div className="mt-3 font-normal text-sm mb-2">
            تمت إضافة تعليق من قبل
            <Link
              href={""}
              className="text-gray_dark hover:underline cursor-pointer font-bold mx-1"
            >
              [محمد العشي]
            </Link>
            على قصتك.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            <span>15 فبراير 2025</span>
            <BsDot />
            <span className="">12:00 صباحاً</span>
          </div>
        </div>
      );
  }
};

export default NotificationCard;
