import { NotificationTypes } from "@/app/enums";
import { dateConversion } from "@/utils/format";
import { getNotificationColor, getNotificationInArabic } from "@/utils/text";

type NotificationTypesProps = {
  message: string;
  type: NotificationTypes;
  is_read: boolean;
  createdAt: Date;
};

const NotificationCard = ({
  message,
  type,
  is_read,
  createdAt,
}: NotificationTypesProps) => {
  const notificationColor = getNotificationColor(type);
  console.log("Notification Color", notificationColor);


  return (
    <div
      className={`relative border p-4 rounded-md hover:shadow-md duration-300 cursor-pointer ${
        is_read ? "bg-white" : "bg-[#e9e9e9]"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${notificationColor} p-2 rounded-sm w-fit font-semibold text-[10px]`}
      >
        {getNotificationInArabic(type)}
      </div>
      <div className="mt-3 font-normal text-[12px] mb-2 text-black">
        {message}
      </div>
      <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
        {dateConversion(createdAt)}
      </div>
      {!is_read && (
        <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
      )}
    </div>
  );
};

export default NotificationCard;
