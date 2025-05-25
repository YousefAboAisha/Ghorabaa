type CommentSkeletonLoaderType = {
  length: number;
} & React.ComponentProps<"div">;

const CommentSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: CommentSkeletonLoaderType) => {
  return (
    <div {...rest} className={`cards-grid-2 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-2xl p-4 bg-white"
        >
          <div className="flex items-center gap-2">
            <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <h5 className="h-2 w-32 rounded-xl bg-gray-300 animate-pulse"></h5>
              <p className="h-2 w-16 rounded-xl bg-gray-300 animate-pulse"></p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="h-1 w-24 rounded-md mt-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeletonLoader;
