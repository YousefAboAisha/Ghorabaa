import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  title: string;
  additionalStyles?: string;
  icon?: JSX.Element;
  loading?: boolean;
  hasShiningBar?: boolean;
} & React.ComponentProps<"button">;

const Button = ({
  title,
  icon,
  additionalStyles = "",
  loading,
  className = "",
  hasShiningBar = true,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      title={title}
      className={`relative group uppercase text-white w-full py-[10px] outline-none flex justify-center gap-3 items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition shadow-lg rounded-md border-transparent border-[1px] hover:border-[1px] duration-500 overflow-hidden hover:shadow-2xl ${additionalStyles} ${className}`}
    >
      <span className="flex flex-row gap-2 items-center font-secondary">
        {title}
        {loading ? (
          <AiOutlineLoading3Quarters size={20} className="animate-spin" />
        ) : (
          icon
        )}
      </span>

      {/* Shining Bar */}

      {hasShiningBar && (
        <span className="absolute -top-5 -left-5 h-[300%] w-4 bg-[#ffffff] -rotate-[30deg] group-hover:block group-hover:left-[120%] duration-[0.7s] rounded-sm opacity-70"></span>
      )}
    </button>
  );
};

export default Button;
