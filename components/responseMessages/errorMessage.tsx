import React from "react";
import { BiErrorCircle } from "react-icons/bi";

interface ErrorMessageProps {
  className?: string;
  error?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className = "",
  error,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-center items-center gap-3 min-h-[50vh] bg-white rounded-md border ${className}`}
    >
      <BiErrorCircle size={30} className="text-[red]" />
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorMessage;
