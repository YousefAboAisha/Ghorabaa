import React from "react";
import { CiWifiOff } from "react-icons/ci";

const NetworkErrorPage = () => {
  return (
    <div className="relative w-full bg-white text-secondary border min-h-[50vh] flex flex-col items-center justify-center gap-2 mt-4">
      <CiWifiOff size={50} />
      <p className="text-sm">خطأ في شبكة الإنترنت</p>
    </div>
  );
};

export default NetworkErrorPage;
