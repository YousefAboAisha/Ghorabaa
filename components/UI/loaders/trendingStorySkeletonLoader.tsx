type TrendingStoryLoader = {
  length: number;
} & React.ComponentProps<"div">;

const TrendingStorySkeletonLoader = ({
  length,
  className = "",
  ...rest
}: TrendingStoryLoader) => {
  return (
    <div {...rest} className={`cards-grid-4 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-center gap-4 border p-8 rounded-xl bg-white"
        >
          <div className="w-16 h-16 p-1 rounded-xl flex items-center justify-center bg-gray-300 animate-pulse shadow-md"></div>
          <h5 className="h-2 w-40 rounded-xl bg-gray-300 animate-pulse"></h5>

          <div className="flex items-center gap-2">
            <h5 className="h-12 w-20 rounded-xl bg-gray-300 animate-pulse"></h5>
            <h5 className="h-12 w-20 rounded-xl bg-gray-300 animate-pulse"></h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingStorySkeletonLoader;
