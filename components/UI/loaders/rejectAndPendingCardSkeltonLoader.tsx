type RejectAndPendingCardSkeltonLoaderProps = {
  length: number;
} & React.ComponentProps<"div">;

const RejectAndPendingCardSkeltonLoader = ({
  length,
  className = "",
  ...rest
}: RejectAndPendingCardSkeltonLoaderProps) => {
  return (
    <div {...rest} className={`cards-grid-3 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-2xl p-4"
        >
          <div className="flex flex-col items-center justify-center h-5 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RejectAndPendingCardSkeltonLoader;
