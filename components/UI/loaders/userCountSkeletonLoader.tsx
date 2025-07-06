type UserCountLoaderType = {
  length: number;
} & React.ComponentProps<"div">;

const UserCountSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: UserCountLoaderType) => {
  return (
    <div {...rest} className={`cards-grid-4 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-4 border p-8 rounded-xl bg-white"
        >
          <div className="flex items-center gap-2">
            <div className="w-16 h-14 p-1 rounded-xl flex items-center justify-center bg-gray-300 animate-pulse"></div>
            <div className="w-full flex flex-col gap-2">
              <h5 className="h-10 w-16 rounded-xl bg-gray-300 animate-pulse"></h5>
              <p className="h-2 w-full rounded-xl bg-gray-300 animate-pulse"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCountSkeletonLoader;
