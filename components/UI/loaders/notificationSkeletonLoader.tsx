import { GrNotification } from "react-icons/gr";

type NotificationSkeletonLoaderProps = {
  length: number;
} & React.ComponentProps<"div">;

const NotificationSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: NotificationSkeletonLoaderProps) => {
  return (
    <div {...rest} className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">كافة الإشعارات</h2>
          <GrNotification className="rotate-[30deg]" />
        </div>

        <div className="h-6 w-20 rounded-full bg-gray-300 animate-pulse"></div>
      </div>

      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-md p-4 bg-white"
        >
          <div className="flex flex-col items-center justify-center h-5 w-10 rounded-xl bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="h-1 self-end w-20 rounded-xl bg-gray-300 animate-pulse mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeletonLoader;
