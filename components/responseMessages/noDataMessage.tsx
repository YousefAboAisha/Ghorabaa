import React from "react";
import { BiErrorCircle } from "react-icons/bi";

interface NoDataMessageProps {
  className?: string;
  message?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({
  message = "لا يوجد بيانات لعرضها",
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col justify-center items-center gap-2 min-h-[50vh] bg-white rounded-md border text-sm ${className}`}
    >
      <BiErrorCircle size={25} className=" font-bold" />
      <p>{message}</p>
    </div>
  );
};

export default NoDataMessage;
