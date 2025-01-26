import { IconType } from "react-icons";

type InputProps = {
  placeholder: string;
  additionalStyles?: string;
  icon?: IconType;
  error?: string;
  pattern?: string;
  required?: boolean;
  label?: string;
} & React.ComponentProps<"input">;

const Input = ({
  placeholder,
  className = "",
  additionalStyles = "",
  icon,
  error,
  pattern,
  required = true,
  label,
  ...rest
}: InputProps) => {
  const Icon = icon;

  return (
    <div>
      {label && (
        <div className="flex items-center gap-1">
          {required && <span className="text-[red]">*</span>}
          <p className="text-[12px] mb-1">{label}</p>
        </div>
      )}

      <div className={`relative h-[56px] rounded-xl ${className} `}>
        <div className="absolute flex justify-center p-2 rounded-l-md items-center right-1 top-[50%] translate-y-[-50%] h-full border-none outline-none text-grey opacity-70">
          {Icon && <Icon size={24} />}
        </div>

        <input
          {...rest}
          className={`h-full w-full pl-2 text-[13px] ${
            Icon ? "pr-12" : "px-4"
          } rounded-xl duration-200 outline-none border-2 border-transparent disabled:cursor-not-allowed bg-gray-50 focus:border-blue focus:border-2 disabled:bg-gray-300 disabled:opacity-50 ${
            error ? "border border-[red] animate-shake" : ""
          } ${additionalStyles} ${className} z-10`}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
        />

        {error ? (
          <span className="absolute text-[red] text-[10px] w-fit right-1 top-[52px]">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
