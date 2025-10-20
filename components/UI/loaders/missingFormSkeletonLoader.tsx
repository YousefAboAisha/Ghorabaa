const MissingFormSkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Reporter Information Section */}
      <div className="flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
        <SkeletonLine className="h-7 w-1/3 mb-4" />

        <SkeletonField />
        <SkeletonField />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonField />
          <SkeletonField />
        </div>
      </div>

      {/* Missing Person Information Section */}
      <div className="flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
        <SkeletonLine className="h-7 w-1/3 mb-4" />

        <SkeletonField />

        <div className="cards-grid-2">
          <SkeletonField />
          <SkeletonField />
        </div>

        <div className="cards-grid-2">
          <SkeletonField />
          <SkeletonField />
        </div>

        <div className="cards-grid-2">
          <SkeletonField />
          <SkeletonField />
        </div>

        <div className="cards-grid-3">
          <SkeletonField />
          <SkeletonField />
          <SkeletonField />
        </div>
      </div>

      {/* Incident Details Section */}
      <div className="flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
        <SkeletonLine className="h-7 w-1/3 mb-4" />

        <div className="cards-grid-2">
          <SkeletonField />
          <SkeletonField />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonField />
          <SkeletonField />
        </div>

        {/* TextArea Skeleton */}
        <div className="space-y-2">
          <SkeletonLine className="h-4 w-1/4" />
          <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%]"></div>
          <div className="flex justify-between">
            <SkeletonLine className="h-3 w-1/6" />
            <SkeletonLine className="h-3 w-1/6" />
          </div>
        </div>

        {/* Image Uploader */}
        <div className="space-y-2">
          <SkeletonLine className="h-4 w-1/4" />
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%]"></div>
            <div className="flex-1">
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%]"></div>
    </div>
  );
};

// Reusable skeleton components
const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] ${className}`}
  ></div>
);

const SkeletonField = () => (
  <div className="space-y-2">
    <SkeletonLine className="h-4 w-1/4" />
    <SkeletonLine className="h-12 w-full" />
  </div>
);

export default MissingFormSkeletonLoader;
