import { BsBan } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { NotificationTypes } from "@/app/enums";
import { FaTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { FaCoins } from "react-icons/fa6";
import { dateConversion } from "@/utils/format";

type NotificationTypesProps = {
  type: NotificationTypes;
  author_name?: string;
  story_name?: string;
  is_read: boolean;
  createdAt: Date;
};

const NotificationCard = ({
  type,
  author_name,
  story_name,
  is_read,
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

          {!is_read && (
            <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
      );

    case NotificationTypes.REJECT:
      return (
        <div
          className={`relative border p-4 rounded-md hover:shadow-md duration-300 cursor-pointer ${
            is_read ? "bg-white" : "bg-[#e9e9e9]"
          }`}
        >
          {" "}
          <div className="flex items-center gap-2 bg-red-500 text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>رفض</h2>
            <FaTimesCircle size={13} />
          </div>
          <div className="mt-3 font-normal text-[12px] mb-2">
            تم رفض طلب إضافة القصة بعنوان
            <span className="text-red-500 font-semibold mx-0.5">
              {" "}
              {story_name}{" "}
            </span>
            بواسطة المشرف
          </div>
          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
          </div>
          {!is_read && (
            <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
      );

    case NotificationTypes.ACCEPT:
      return (
        <div
          className={`relative border p-4 rounded-md hover:shadow-md duration-300 cursor-pointer ${
            is_read ? "bg-white" : "bg-[#e9e9e9]"
          }`}
        >
          {" "}
          <div className="flex items-center gap-2 bg-primary text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>قبول</h2>
            <FiCheckCircle size={13} />
          </div>
          <div className="mt-3 font-normal text-[12px] mb-2">
            تم قبول طلب إضافة القصة بعنوان
            <span className="text-primary font-semibold mx-0.5">
              {" "}
              {story_name}{" "}
            </span>
            بنجاح.
          </div>
          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
          </div>
          {!is_read && (
            <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
      );

    case NotificationTypes.COMMENT:
      return (
        <div
          className={`relative border p-4 rounded-md hover:shadow-md duration-300 cursor-pointer ${
            is_read ? "bg-white" : "bg-[#e9e9e9]"
          }`}
        >
          {" "}
          <div className="flex items-center gap-2 bg-gray_dark text-white p-2 rounded-sm w-fit font-semibold text-[10px]">
            <h2>تعليق</h2>
            <BiComment size={13} />
          </div>
          <div className="mt-3 font-normal text-[12px] mb-2">
            قام <p className="font-semibold inline">{author_name}</p> بإضافة
            تعليق جديد على قصتك
          </div>
          <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
            {dateConversion(createdAt)}
          </div>
          {!is_read && (
            <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
      );
  }
};

export default NotificationCard;
