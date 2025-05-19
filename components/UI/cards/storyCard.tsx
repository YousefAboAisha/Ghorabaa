import Image from "next/image";
import Link from "next/link";
import { GiPeaceDove } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { StoryInterface } from "@/app/interfaces";
import Button from "../inputs/button";
import { FaEye } from "react-icons/fa";
import FavoriteButton from "@/containers/storyDetails/favoriteButton";

interface StoryCardsProps {
  data?: StoryInterface & { favorite?: boolean };
}

const StoryCard = ({ data }: StoryCardsProps) => {
  const age =
    data?.death_date && data?.birth_date
      ? new Date(data.death_date).getFullYear() -
        new Date(data.birth_date).getFullYear()
      : "";

  return (
    <div className="relative group w-full flex flex-col border bg-white hover:shadow-2xl duration-500 rounded-2xl overflow-hidden">
      <Link href={`/stories/${data?._id}`} title="عرض الملف الشخصي">
        <div className="flex items-center justify-center relative h-[270px] w-full overflow-hidden">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة الشهيد"
            className="w-full rounded-2xl rounded-b-none object-cover"
            width={1000}
            height={1000}
            blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
            placeholder="blur"
          />
        </div>
      </Link>

      <div className="relative p-4">
        <div className="flex items-center gap-2 text-sm overflow-hidden">
          <p className="text-gray_dark whitespace-nowrap">الشهيد/</p>
          <p className="font-bold text-secondary truncate whitespace-nowrap overflow-hidden text-ellipsis">
            {data?.name}
          </p>
        </div>

        <p className="text-gray-600 text-[13px] mt-2 line-clamp-2 h-9">
          {data?.bio}
        </p>
      </div>

      <hr />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-3 text-[13px]">
          <GiPeaceDove
            style={{
              transform: "scale(-1,1)",
            }}
            size={22}
            className="text-primary"
          />
          <p>{data?.death_date}</p>
        </div>

        <div className="flex items-center gap-3 text-[13px]">
          <HiUser size={22} className="text-primary" />
          <div className="flex items-center gap-1  ">
            <p>{age}</p>
            <p>عاماً</p>
          </div>
        </div>

        <div className="w-full flex items-center gap-2 mt-2">
          <Link
            href={`/stories/${data?._id}`}
            title="عرض الملف الشخصي"
            className="w-full"
          >
            <Button
              title="عرض الملف الشخصي "
              icon={<FaEye />}
              className="bg-primary"
              hasShiningBar={false}
            />
          </Link>

          <FavoriteButton
            story_id={data?._id as string}
            initialFavorite={data?.favorite as boolean}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
