import React from "react";

type StatisticsCardSkeletonLoaderType = {
  length: number;
} & React.ComponentProps<"div">;

const StatisticsCardSkeletonLoader = ({
  length,
  className = "",
  ...rest
}: StatisticsCardSkeletonLoaderType) => {
  return (
    <div {...rest} className={`cards-grid-3 ${className}`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative bg-white rounded-xl flex flex-col items-center justify-center border overflow-hidden"
        >
          <div className="relative flex flex-col justify-center items-center gap-3 p-8">
            <p className="w-40 h-20 rounded-md bg-gray-300 animate-pulse mx-auto"></p>
          </div>

          <div className="grid grid-cols-3 w-full border-t">
            <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-4 border-l">
              <h2 className="font-light text-[12px] text-center">اليوم</h2>
              <div className="text-xl font-extrabold">
                <p className="w-20 h-14 rounded-md bg-gray-300 animate-pulse mx-auto"></p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-4 border-l">
              <h2 className="font-light text-[12px] text-center">
                الأسبوع الأخير
              </h2>
              <div className="text-xl font-extrabold">
                <p className="w-20 h-14 rounded-md bg-gray-300 animate-pulse mx-auto"></p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-3">
              <h2 className="font-light text-[12px] text-center">
                الشهر الأخير
              </h2>
              <div className="text-xl font-extrabold">
                <p className="w-20 h-14 rounded-md bg-gray-300 animate-pulse mx-auto"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCardSkeletonLoader;
