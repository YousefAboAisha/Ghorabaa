import React from "react";

interface ErrorMessageProps {
  className?: string;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className = "",
  message,
}) => {
  return (
    <div
      className={`relative flex flex-col gap-3 min-h-[30vh] bg-white rounded-md border ${className}`}
    >
      <p className="abs-center text-sm">لا يوجد بيانات لعرضها!</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
