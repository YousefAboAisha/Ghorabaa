type SupportCardCardProps = {
  details?: string;
  title: string;
  titleClassname?: string;
  classname?: string;
  icon?: JSX.Element;
};

const SupportCard = ({
  details,
  title,
  titleClassname = "",
  classname = "",
  icon,
}: SupportCardCardProps) => {
  const Icon = icon;

  return (
    <div
      className={`relative bg-white flex flex-col justify-center items-center gap-4 p-6 rounded-xl shadow-md `}
    >
      <div
        className={`p-4 w-14 h-14 rounded-2xl flex items-center justify-center ${classname}`}
      >
        {Icon}
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className={`font-bold text-md text-center ${titleClassname}`}>{title}</h2>
        <p className="text-[13px] text-gray_dark text-center">{details}</p>
      </div>
    </div>
  );
};

export default SupportCard;
