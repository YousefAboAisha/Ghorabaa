import Image from "next/image";
import Link from "next/link";
import { MartyrName, MissingInterface } from "@/app/interfaces";
import Button from "../inputs/button";
import { FaEye } from "react-icons/fa";
import { dateConversion } from "@/utils/format";
import { FiMapPin } from "react-icons/fi";
import { getAgeLabel, getFullName } from "@/utils/text";
import { StoryWatermark } from "../watermark/storyWatermark";

interface Props {
  data?: MissingInterface;
}

const MissingCard = ({ data }: Props) => {
  const fullName = getFullName(data?.title as MartyrName);

  return (
    <div className="relative group w-full flex flex-col border bg-white hover:shadow-xl duration-500 rounded-2xl overflow-hidden">
      <Link href={`/missings/${data?._id}`} title={`ملف المفقود | ${fullName}`}>
        <div className="relative flex items-center justify-center h-[270px] w-full overflow-hidden">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة المفقود"
            className="w-full rounded-2xl rounded-b-none object-cover min-h-full"
            width={1000}
            height={1000}
            blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
            placeholder="blur"
          />
          <StoryWatermark />
        </div>
      </Link>

      <div className="relative p-4">
        <div className="flex items-center gap-1 text-[12px] mb-2 font-light">
          <FiMapPin />
          <p>{data?.location.city}</p>-<p>{data?.location.neighborhood}</p>
        </div>

        <div className="flex items-center gap-2 text-sm mb-2">
          <p className="font-bold text-secondary truncate">{fullName}</p>

          {data?.nickname && (
            <p className="text-gray_dark font-normal inline min-w-fit">
              &quot; {data?.nickname} &quot;
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
          {data?.details}
        </p>
      </div>

      <hr />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-[13px]">
          <p className="font-semibold text-rejected">تاريخ الاختفاء: </p>
          <p>{dateConversion(data?.missing_date as string)}</p>
        </div>

        <div className="flex items-center gap-2 text-[13px]">
          <p className="font-semibold text-rejected"> العمر: </p>
          <p>{getAgeLabel(data?.age as number)}</p>
        </div>

        <div className="w-full flex items-center gap-2 mt-2">
          <Link
            href={`/missings/${data?._id}`}
            title="عرض الملف الشخصي"
            className="w-full"
          >
            <Button
              title="عرض التفاصيل"
              icon={<FaEye />}
              className="bg-secondary"
              hasShiningBar={false}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissingCard;
