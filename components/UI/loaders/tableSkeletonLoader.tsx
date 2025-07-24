import React from "react";

const TableSkeletonLoader = () => {
  return (
    <div className="min-w-full bg-white border border-gray-200 h-full animate-pulse">
      <table className="min-w-full">
        <tbody>
          {/* Header Row */}
          <tr>
            <td
              colSpan={2}
              className="py-6 px-4 border-b text-center text-sm border-l bg-gray-300"
            ></td>
          </tr>

          {/* Data Rows */}
          {[...Array(7)].map((_, i) => (
            <tr key={i}>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                <div className="h-4 bg-gray-200 rounded w-3/4 ml-auto"></div>
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
              </td>
            </tr>
          ))}

          {/* Status Row */}
          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              <div className="h-4 bg-gray-200 rounded w-3/4 ml-auto"></div>
            </td>
            <td className="py-3 px-4 text-right text-sm border-b">
              <div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Button Skeleton */}
      <div className="w-full md:w-4/12 mx-auto my-5">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;
