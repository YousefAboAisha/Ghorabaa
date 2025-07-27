type TextAreaProps = {
  value?: string;
  placeholder: string;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({
  placeholder,
  className = "",
  required = true,
  rows,
  label,
  ...rest
}: TextAreaProps) => {
  return (
    <>
      {label && (
        <div className="flex items-center gap-1">
          {required && <span className="text-rejected">*</span>}
          <p className="text-[12px] mb-2">{label}</p>
        </div>
      )}
      <textarea
        {...rest}
        className={`text-[13px] w-full p-3 pl-10 pr-4 rounded-xl duration-200 outline-none border-2 border-transparent disabled:cursor-not-allowed bg-gray-50 focus:border-blue focus:border-2 disabled:bg-gray-300 disabled:opacity-50 ${className}`}
        placeholder={placeholder}
        rows={rows || 5}
        draggable={false}
      />
    </>
  );
};

export default TextArea;
