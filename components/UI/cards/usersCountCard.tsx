type UserAnalysisCardProps = {
  title?: string;
  count: number;
  countClassname?: string;
  classname?: string;
};

const UsersCountCard = ({
  title,
  count,
  countClassname = "",
  classname = "",
}: UserAnalysisCardProps) => {
  return (
    <div
      className={`relative bg-white flex flex-col flex-grow flex-1 justify-center items-stretch gap-4 p-16 rounded-xl shadow-md ${classname}`}
    >
      <p className="text-center text-md">{title}</p>
      <h2 className={`text-center font-extrabold text-6xl ${countClassname}`}>
        {count}
      </h2>
    </div>
  );
};

export default UsersCountCard;
