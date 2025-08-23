import React from "react";

const ProfileDetailsSkeletonLoader = () => {
  return (
    <div className="relative w-full bg-white border rounded-md min-h-[30vh] mb-6 p-4">
      <div className="flex flex-col items-center gap-6">
        {/* Banner skeleton */}
        <div className="relative flex items-center justify-center w-full bg-gray-200 h-[25vh] rounded-md animate-pulse">
          <div className="absolute bottom-0 translate-y-[12vh] w-[120px] h-[120px] bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        {/* Profile info cards skeleton */}
        <div className="w-full flex flex-wrap items-stretch gap-4 mt-12">
          {/* Name card skeleton */}
          <div className="flex flex-col gap-3 items-center justify-center flex-1 bg-gray-100 rounded-md border p-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>

          {/* Email card skeleton */}
          <div className="flex flex-col gap-3 items-center justify-center flex-1 bg-gray-100 rounded-md border p-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Phone number card skeleton */}
          <div className="flex flex-col gap-3 items-center justify-center flex-1 bg-gray-100 rounded-md border p-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>

          {/* Creation date card skeleton */}
          <div className="flex flex-col gap-3 items-center justify-center flex-1 bg-gray-100 rounded-md border p-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsSkeletonLoader;
