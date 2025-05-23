import React from "react";

const TableSkeletonLoader = () => {
  return (
    <table className="h-full w-full border">
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

        <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
          <td className="py-5 border-b text-right text-sm border-l"></td>

          <td className="py-5 border-b text-right text-sm "></td>
        </tr>

        <tr className="h-2 w-full rounded-xl bg-gray-300 animate-pulse">
          <td className="py-5 border-b text-right text-sm border-l"></td>

          <td className="py-5 border-b text-right text-sm "></td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableSkeletonLoader;
