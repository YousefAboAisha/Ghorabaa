const MassacreFormLoader = () => {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Massacre Details Section Skeleton */}
      <div className="flex flex-col gap-6 w-full border rounded-xl p-8 bg-white">
        <div className="h-8 w-48 rounded-xl bg-gray-200 mb-4"></div>

        <div className="cards-grid-2 gap-4">
          {/* Title Field Skeleton */}
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>

          {/* Date Field Skeleton */}
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>
        </div>

        {/* Location Fields Skeleton */}
        <div className="cards-grid-2 gap-4">
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>

          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>
        </div>

        {/* Description Field Skeleton */}
        <div>
          <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
          <div className="h-32 w-full rounded-lg bg-gray-200"></div>
          <div className="flex justify-between mt-2">
            <div className="h-4 w-24 rounded-xl bg-gray-200"></div>
            <div className="h-4 w-24 rounded-xl bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Massacre Results Section Skeleton */}
      <div className="flex flex-col gap-5 w-full border rounded-xl p-8 bg-white">
        <div className="h-8 w-48 rounded-xl bg-gray-200 mb-4"></div>

        <div className="cards-grid-3">
          {/* Deaths Field Skeleton */}
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>

          {/* Injuries Field Skeleton */}
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>

          {/* Destroyed Houses Field Skeleton */}
          <div>
            <div className="h-5 w-24 rounded-xl bg-gray-200 mb-2"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-xl bg-gray-200 mt-2"></div>
          </div>
        </div>

        {/* International Reactions Skeleton */}
        <div>
          <div className="h-5 w-48 rounded-xl bg-gray-200 mb-2"></div>
          <div className="h-24 w-full rounded-lg bg-gray-200"></div>
          <div className="cards-grid-2 gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 w-full rounded-xl bg-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Image Upload Section Skeleton */}
        <div>
          <div className="h-5 w-48 rounded-xl bg-gray-200 mb-2"></div>
          <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl border-gray-200">
            <div className="relative w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-48 rounded-xl bg-gray-200"></div>
            <div className="flex flex-col gap-1 text-center">
              <div className="h-3 w-64 rounded-xl bg-gray-200"></div>
              <div className="h-3 w-56 rounded-xl bg-gray-200"></div>
              <div className="h-3 w-60 rounded-xl bg-gray-200"></div>
            </div>
          </div>

          {/* Image Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-square w-full rounded-xl bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="h-12 w-full rounded-lg bg-gray-200"></div>
    </div>
  );
};

export default MassacreFormLoader;
