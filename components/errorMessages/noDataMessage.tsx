import React from "react";

interface NoDataMessageProps {
  className?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ className = "" }) => {
  return (
    <div
      className={`relative flex flex-col gap-3 min-h-[30vh] bg-white rounded-md border ${className}`}
    >
      <p className="abs-center text-sm">لا يوجد بيانات لعرضها!</p>
    </div>
  );
};

export default NoDataMessage;
