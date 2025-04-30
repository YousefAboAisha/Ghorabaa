import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  title: string;
  options: {
    title: string;
    value: string;
  }[];
  additionalStyles?: string;
  label?: string;
  required?: boolean;
} & React.ComponentProps<"select">;

const Select = ({
  title,
  options,
  additionalStyles = "",
  className = "",
  label,
  required = true,
  ...rest
}: SelectProps) => {
  return (
    <div>
      {label && (
        <div className="flex items-center gap-1">
          {required && <span className="text-[red]">*</span>}
          <p className="text-[12px] mb-1">{label}</p>
        </div>
      )}
      <div className="relative bg-gray-50 rounded-xl">
        <div className="absolute flex justify-center p-2 items-center right-1 top-[50%] translate-y-[-50%] h-full border-none outline-none">
          <MdKeyboardArrowDown size={20} />
        </div>

        <select
          className={`relative text-[13px] h-[56px] pr-10 rounded-[8px] outline-none duration-300 w-full border-2 border-transparent focus:border-primary disabled:cursor-not-allowed bg-transparent cursor-pointer bg-gray-50 rounde-2xl disabled:bg-gray-300 disabled:opacity-50 ${additionalStyles} ${className}`}
          {...rest}
          name="studylevel"
          aria-label={title}
        >
          <option value="" defaultChecked hidden className="">
            {title}
          </option>

          {options.map(({ title, value }) => (
            <option key={value} className="p-2" value={value} title={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
