import { NotificationTypes } from "@/app/enums";
import { fullDateConversion } from "@/utils/format";
import { getNotificationColor, getNotificationIcon } from "@/utils/text";

type NotificationTypesProps = {
  message: string;
  type: NotificationTypes;
  is_read: boolean;
  isPopperNotification?: boolean;
  createdAt: Date;
};

const NotificationCard = ({
  message,
  type,
  is_read,
  isPopperNotification = false,
  createdAt,
}: NotificationTypesProps) => {
  const notificationColor = getNotificationColor(type);
  console.log("Notification Color", notificationColor);

  const { Icon, className, size } = getNotificationIcon(type);

  const iconSize = isPopperNotification ? 27 : size;

  return (
    <div
      className={`relative flex items-center gap-4 border p-6 rounded-md hover:shadow-md duration-300 cursor-pointer ${
        is_read ? "bg-white" : "bg-[#e9e9e9]"
      }`}
    >
      <Icon size={iconSize} className={`${className}`} />

      <div className="mt-3 font-normal text-[12px] mb-2 text-black">
        {message}
      </div>

      <div className="absolute bottom-1 left-3 flex items-center gap-1 text-gray_dark text-[10px]">
        {fullDateConversion(createdAt)}
      </div>

      {!is_read && (
        <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
      )}
    </div>
  );
};

export default NotificationCard;
