import { CiImageOn } from "react-icons/ci";

type StoryCardSkeletonLoaderType = {
  length: number;
} & React.ComponentProps<"div">;

const StoryCardSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: StoryCardSkeletonLoaderType) => {
  return (
    <div {...rest} className={`cards-grid-4 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 border rounded-2xl bg-white"
        >
          <div className="flex flex-col items-center justify-center h-60 rounded-2xl rounded-b-none bg-gray-300 animate-pulse">
            <CiImageOn size={50} className="text-gray-400" />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-full rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-2 w-8/12 rounded-xl bg-gray-300 animate-pulse"></div>

            <hr className="my-2" />

            <div className="flex items-center gap-2 w-full">
              <div className="flex flex-col items-center justify-center h-8 w-full rounded-xl bg-gray-300 animate-pulse"></div>
              <div className="flex flex-col items-center justify-center h-8 w-2/12 rounded-xl bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryCardSkeletonLoader;
