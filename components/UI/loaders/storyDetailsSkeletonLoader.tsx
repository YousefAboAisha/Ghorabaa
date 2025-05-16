const StoryDetailsSkeletonLoader = () => {
  return (
    <div>
      <div className="h-4 w-4/12 rounded-xl bg-gray-300 animate-pulse mb-4"></div>
      <div className="w-full rounded-xl bg-gray-300 animate-pulse min-h-[80vh]"></div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-2 w-4/12 rounded-xl bg-gray-300 animate-pulse"></div>
        <div className="h-2 w-10 rounded-xl bg-gray-300 animate-pulse"></div>
      </div>
      <div className="h-4 w-10/12 rounded-xl bg-gray-300 animate-pulse mt-6"></div>
      <table className="h-full w-full  border mt-8">
        <tbody className="bg-white h-full">
          <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
            <td
              colSpan={2}
              className="py-5 border-b text-center text-sm border-l text-white font-semibold"
            ></td>
          </tr>

          <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
            <td className="py-5 border-b text-right text-sm border-l"></td>

            <td className="py-5 border-b text-right text-sm"></td>
          </tr>

          <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
            <td className="py-5 border-b text-right text-sm border-l"></td>

            <td className="py-5 border-b text-right text-sm"></td>
          </tr>

          <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
            <td className="py-5 border-b text-right text-sm border-l"></td>

            <td className="py-5 border-b text-right text-sm"></td>
          </tr>

          <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
            <td className="py-5 border-b text-right text-sm border-l"></td>

            <td className="py-5 border-b text-right text-sm "></td>
          </tr>
        </tbody>
      </table>
      <div className="h-4 w-5/12 rounded-xl bg-gray-300 animate-pulse mt-6 mb-4"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
      <div className="h-2 w-full rounded-xl bg-gray-300 animate-pulse mt-2"></div>
    </div>
  );
};

export default StoryDetailsSkeletonLoader;
