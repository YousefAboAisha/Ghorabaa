import Image from "next/image";
import Link from "next/link";
import { GiPeaceDove } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { StoryInterface } from "@/app/interfaces";
import Button from "../inputs/button";
import { FaEye } from "react-icons/fa";
import FavoriteButton from "@/containers/storyDetails/favoriteButton";
import { Session } from "next-auth";
import { HighlightedText } from "../typography/highlightText";
import { dateConversion } from "@/utils/format";
import { FiMapPin } from "react-icons/fi";
import { getAgeLabel, getFullName } from "@/utils/text";

interface Props {
  data?: StoryInterface & { favorite?: boolean };
  session: Session | null;
}

const StoryCard = ({ data, session }: Props) => {
  const fullName = getFullName(data?.name);

  return (
    <div className="relative group w-full flex flex-col border bg-white hover:shadow-xl duration-500 rounded-2xl overflow-hidden">
      <Link href={`/stories/${data?._id}`} title="عرض الملف الشخصي">
        <div className="flex items-center justify-center relative h-[270px] w-full overflow-hidden">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة الشهيد"
            className="w-full rounded-2xl rounded-b-none object-cover min-h-full"
            width={1000}
            height={1000}
            blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
            placeholder="blur"
          />
        </div>
      </Link>

      <div className="relative p-4">
        <div className="flex items-center gap-1 text-[12px] mb-2 font-light">
          <FiMapPin />
          <p>{data?.city}</p>-<p>{data?.neighborhood}</p>
        </div>

        <div className="flex items-center gap-2 text-sm mb-2">
          <p className="font-bold text-secondary truncate">
            <HighlightedText
              highlights={data?.highlight}
              field="name"
              fallback={fullName ?? ""}
            />
          </p>

          {data?.nickname && (
            <p className="text-gray_dark font-normal inline min-w-fit">
              &quot;
              <HighlightedText
                highlights={data?.highlight}
                field="nickname"
                fallback={data?.nickname ?? ""}
              />
              &quot;
            </p>
          )}
        </div>

        {/* Bio with highlighting */}
        <p
          style={{
            lineHeight: "20px",
          }}
          className="text-gray-600 text-[13px] mt-2 line-clamp-2 h-10"
        >
          <HighlightedText
            highlights={data?.highlight}
            field="bio"
            fallback={data?.bio ?? ""}
          />
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
          <p>{dateConversion(data?.death_date as string)}</p>
        </div>

        <div className="flex items-center gap-3 text-[13px]">
          <HiUser size={22} className="text-primary" />
          <p>{getAgeLabel(data?.age as number)}</p>
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

          {session && session.user && (
            <FavoriteButton
              story_id={data?._id as string}
              initialFavorite={data?.favorite as boolean}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
