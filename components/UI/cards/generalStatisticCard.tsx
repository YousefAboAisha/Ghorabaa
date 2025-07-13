import { FaArrowLeft } from "react-icons/fa";

type props = {
  title?: string;
  count: number;
  icon?: JSX.Element;
};

const GeneralStatisticCard = ({ title, count, icon }: props) => {
  const Icon = icon;

  return (
    <div
      className={`group relative bg-white flex flex-1 items-center gap-4 rounded-xl shadow-sm overflow-hidden cursor-pointer `}
    >
      <span className="absolute right-0 top-0 h-full w-1/4 bg-secondary z-0 group-hover:w-full duration-500 "></span>
      <div
        className={`rounded-r-xl flex items-center justify-center text-white bg-secondary z-10 p-10`}
      >
        {Icon}
      </div>

      <div className="flex flex-col gap-1 z-10">
        <p className="text-gray_dark group-hover:text-white duration-500">
          {title}
        </p>
        <h2
          className={`font-extrabold text-2xl group-hover:text-white duration-500`}
        >
          {count}
        </h2>
      </div>

      <FaArrowLeft className="text-white absolute left-7 top-1/2 -translate-y-1/2 z-10" size={30} />
    </div>
  );
};

export default GeneralStatisticCard;
