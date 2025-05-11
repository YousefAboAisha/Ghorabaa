import { FaTimesCircle } from "react-icons/fa";

type TagProps = {
  title: string;
  hasTimes?: boolean;
  onTimesClicked?: () => void;
};

function Tag({ title, hasTimes = false, onTimesClicked }: TagProps) {
  return (
    <div className="relative flex items-center gap-1 text-[12px] full-theme font-normal w-fit px-2 py-1 rounded-xl h-fit uppercase shadow-sm border">
      {title}
      {hasTimes && (
        <FaTimesCircle
          className=" cursor-pointer top-0 right-0"
          size={12}
          onClick={onTimesClicked}
        />
      )}
    </div>
  );
}

export default Tag;