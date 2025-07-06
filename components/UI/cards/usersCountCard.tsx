type UserAnalysisCardProps = {
  title?: string;
  count: number;
  countClassname?: string;
  classname?: string;
  icon?: JSX.Element;
};

const UsersCountCard = ({
  title,
  count,
  countClassname = "",
  classname = "",
  icon,
}: UserAnalysisCardProps) => {
  const Icon = icon;

  return (
    <div
      className={`relative bg-white flex flex-1 items-stretch gap-4 p-8 rounded-xl shadow-md `}
    >
      <div
        className={`w-12 h-12 p-1 rounded-xl flex items-center justify-center ${classname}`}
      >
        {Icon}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className={`font-extrabold text-2xl ${countClassname}`}>{count}</h2>
        <p className="text-[12px] text-gray_dark">{title}</p>
      </div>
    </div>
  );
};

export default UsersCountCard;
