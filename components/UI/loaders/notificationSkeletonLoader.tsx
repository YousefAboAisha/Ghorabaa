type NotificationSkeletonLoaderProps = {
  length: number;
} & React.ComponentProps<"div">;

const NotificationSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: NotificationSkeletonLoaderProps) => {
  return (
    <div {...rest} className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-md p-4 bg-white"
        >
          <div className="h-5 w-10 rounded-xl bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          </div>

          <div className="h-1 self-end w-20 rounded-xl bg-gray-300 animate-pulse mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeletonLoader;
