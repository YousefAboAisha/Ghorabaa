import { TrendingStoryInterface } from "@/app/interfaces";
import { getFullName } from "@/utils/text";
import Image from "next/image";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

interface TrendingStoryCardProps extends TrendingStoryInterface {
  className?: string;
}

const TrendingStoryCard = ({
  story_id,
  name,
  image,
  comments,
  visits,
  age,
  total,
  className = "",
}: TrendingStoryCardProps) => {
  const fullName = getFullName(name);
  return (
    <div
      key={story_id}
      className={`relative bg-white md:bg-background_light border rounded-md hover:shadow-lg duration-300 ${className}`}
    >
      <div className="absolute top-3 right-3 bg-background_light shadow-md border flex items-center justify-center rounded-md p-1.5 text-[13px] font-semibold ">
        #{total}
      </div>

      <div className="flex flex-col w-fit items-center gap-2 p-8 mx-auto">
        <Image
          alt="صورة المستخدم"
          src={image || "/notFound.png"}
          width={90}
          height={90}
          className="rounded-lg object-cover w-[90px] h-[90px] border shadow-md"
        />

        <div className="flex flex-col flex-wrap gap-2 mt-2 items-center justify-center text-center">
          <Link
            href={`/stories/${story_id}`}
            target="_blank"
            className="flex items-center gap-1 text-sm font-semibold hover:underline w-[200px]"
          >
            <p className="font-normal text-gray_dark">الشهيد/</p>
            <p className="truncate">{fullName || "مستخدم غير معروف"}</p>
          </Link>
          <p className="font-light text-[12px] break-words">{age} عاماً</p>
        </div>
      </div>

      <div className="flex items-center border-t">
        <div className="flex flex-col justify-center items-center gap-2 w-full p-4 border-l">
          <BiComment size={20} className="text-gray_dark" />
          <p className="text-md font-semibold">{comments}</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 w-full p-4 ">
          <BsEye size={20} className="text-gray_dark" />
          <p className="text-md font-semibold">{visits}</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingStoryCard;
