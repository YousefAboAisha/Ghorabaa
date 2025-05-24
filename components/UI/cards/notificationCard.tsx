import { BsBan } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { NotificationTypes } from "@/app/enums";
import { FaTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { FaCoins } from "react-icons/fa6";
import { dateConversion } from "@/conversions";

type NotificationTypesProps = {
  type: NotificationTypes;
  title: string;
  createdAt: Date;
};

const NotificationCard = ({
  type,
  title,
  createdAt,
}: NotificationTypesProps) => {
  switch (type) {
    case NotificationTypes.DONATION:
      return (
        <div className="relative border p-4 bg-white rounded-md hover:shadow-md duration-300 cursor-pointer">
          <div className="flex items-center gap-2 bg-secondary text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>تبرع</h2>
            <FaCoins />
          </div>

          <div className="mt-3 font-normal text-[12px] mb-2">
            تم استلام تبرع جديد بقيمة
            <p className="text-secondary font-bold inline-block mx-1">10$</p>
            بواسطة
            <span className="text-secondary font-semibold mx-1">
              [محمد العشي]
            </span>
            على حملة تبرعك.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
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

          <div className="mt-3 font-normal text-[12px] mb-2">
            تم حظر المحتوى بعنوان
            <span className="text-red-600 font-semibold mx-1">
              [عنوان المحتوى]
            </span>
            بسبب مخالفته معايير المنصة.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
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

          <div className="mt-3 font-normal text-[12px] mb-2">
            تم رفض طلب إضافة القصة بعنوان
            <span className="text-orange-500 font-semibold mx-1">
              [عنوان القصة]
            </span>
            لعدم صحة البيانات المُرسلة.
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
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

          <div className="mt-3 font-normal text-[12px] mb-2">
            تم قبول طلبك لإضافة القصة بعنوان
            <span className="text-primary font-semibold mx-1">
              [محمد عبد الله حسب الله]
            </span>
          </div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
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

          <div className="mt-3 font-normal text-[12px] mb-2">{title}</div>

          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
          </div>
        </div>
      );
  }
};

export default NotificationCard;
