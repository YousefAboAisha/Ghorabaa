import React, { forwardRef } from "react";

type InputProps = {
  placeholder: string;
  additionalStyles?: string;
  icon?: JSX.Element;
  error?: string;
  pattern?: string;
  required?: boolean;
  label?: string;
} & React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      className = "",
      additionalStyles = "",
      icon,
      error,
      pattern,
      required = true,
      label,
      ...rest
    },
    ref
  ) => {
    const Icon = icon;

    return (
      <div>
        {label && (
          <div className="flex items-center gap-1">
            {required && <span className="text-rejected">*</span>}
            <p className="text-[12px] mb-1.5">{label}</p>
          </div>
        )}

        <div className={`relative h-[50px] rounded-[8px] ${className}`}>
          <div className="absolute flex justify-center p-2 rounded-l-md items-center right-1 top-[50%] translate-y-[-50%] h-full border-none outline-none text-grey opacity-70">
            {Icon}
          </div>

          <input
            ref={ref}
            {...rest}
            className={`h-full w-full pl-2 text-[13px] bg-gray-50 ${
              Icon ? "pr-10" : "px-4"
            } rounded-xl duration-200 outline-none border-2 border-transparent disabled:cursor-not-allowed focus:border-primary focus:border-2 disabled:bg-gray-300 disabled:opacity-50 ${
              error ? "border border-rejected animate-shake" : ""
            } ${additionalStyles} ${className} z-10`}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
          />

          {error && (
            <p className="absolute text-rejected !text-[10px] w-fit right-1 top-[52px]">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
