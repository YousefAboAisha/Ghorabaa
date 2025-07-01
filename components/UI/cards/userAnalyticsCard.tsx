type UserAnalysisCardProps = {
  title?: string;
  count: number;
  className?: string;
};

const UserAnalyticsCard = ({
  title,
  count,
  className = "",
}: UserAnalysisCardProps) => {
  return (
    <div
      className={`relative flex flex-col flex-grow flex-1 justify-center items-stretch gap-4 p-16 rounded-xl shadow-md text-white ${className}`}
    >
      <p className="text-center text-md">{title}</p>
      <h2 className="text-center font-bold text-5xl">{count}</h2>
    </div>
  );
};

export default UserAnalyticsCard;
