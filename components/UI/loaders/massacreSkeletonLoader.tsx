type Props = {
  length: number;
} & React.ComponentProps<"div">;

const MassacreSkeletonLoader = ({ length, className = "", ...rest }: Props) => {
  return (
    <div {...rest} className={`cards-grid-3 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative group w-full flex flex-col border bg-white rounded-2xl overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="flex items-center justify-center relative h-[270px] w-full overflow-hidden bg-gray-200">
            <div className="w-full h-full bg-gray-300"></div>
          </div>

          <div className="relative p-4">
            {/* Date placeholder */}
            <div className="flex items-center gap-2 text-[10px] text-gray_dark">
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Title placeholder */}
            <div className="flex items-center gap-2 text-sm mb-2 mt-2">
              <div className="h-6 w-full bg-gray-200 rounded"></div>
            </div>

            {/* Location and date placeholders */}
            <div className="h-3 w-48 bg-gray-200 rounded"></div>

            {/* Description placeholder */}
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Button placeholder */}
          <div className="w-full px-4 pb-4">
            <div className="flex items-center h-10 justify-center gap-2 p-2 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MassacreSkeletonLoader;
