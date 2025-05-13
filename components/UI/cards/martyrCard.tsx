import Image from "next/image";
import Link from "next/link";
import { GiPeaceDove } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { StoryInterface } from "@/app/interfaces";

interface MartyrCardProps {
  data: StoryInterface;
}

const MartyrCard = ({ data }: MartyrCardProps) => {
  return (
    <Link
      href={`/martyrs/${data._id}`}
      className="mt-4"
      title="عرض الملف الشخصي"
    >
      <div className="relative group w-full flex flex-col border bg-white rounded-2xl overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={data.image}
            alt="صورة الشهيد"
            className="w-full rounded-2xl rounded-b-none group-hover:scale-125 duration-700"
            width={500}
            height={500}
          />
        </div>

        <div className="relative p-4">
          <div className="flex items-center gap-2 text-sm overflow-hidden">
            <p className="text-gray_dark whitespace-nowrap">الشهيد/</p>
            <p className="font-bold text-secondary truncate whitespace-nowrap overflow-hidden text-ellipsis">
              {data.name}
            </p>
          </div>

          <p className="text-gray-600 text-[13px] mt-2 line-clamp-3">
            {data.bio}{" "}
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
            <p className=" ">{data.death_date}</p>
          </div>

          <div className="flex items-center gap-3 text-[13px]">
            <HiUser size={22} className="text-primary" />
            <div className="flex items-center gap-1  ">
              <p>22</p>
              <p>عاماً</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MartyrCard;
