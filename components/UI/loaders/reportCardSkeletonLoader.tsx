type ReportCardSkeltonLoaderProps = {
  length: number;
} & React.ComponentProps<"div">;

const ReportCardSkeltonLoader = ({
  length,
  className = "",
  ...rest
}: ReportCardSkeltonLoaderProps) => {
  return (
    <div {...rest} className={`cards-grid-3 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-2xl p-4 bg-white"
        >
          <div className="flex flex-col items-center justify-center h-3 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col items-center justify-center mt-2 h-24 w-full rounded-3xl rounded-br-none bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col items-center justify-center h-6 w-40 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportCardSkeltonLoader;
