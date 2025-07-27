import Link from "next/link";
import Image from "next/image";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { arabicDateConversion } from "@/utils/format";
import { MassacreInterface } from "@/app/interfaces";

type Props = {
  data: MassacreInterface;
};

export default function MassacreBanner({ data }: Props) {
  const {
    _id,
    title,
    cover_image,
    date,
    location,
    description,
    deaths,
    injuries,
    destroyedHouses,
    tags,
  } = data;

  return (
    <Link
      href={`/massacres/${_id}`}
      style={{
        direction: "rtl",
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-secondary border rounded-xl overflow-hidden md:p-10 md:px-16 p-4 hover:shadow-md duration-300"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 mt-4 text-white ">
          {/* title */}

          <h2 className="text-2xl font-semibold mb-2">{title}</h2>

          {tags && tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              {tags.slice(0, 5).map((keywrod, index) => {
                return (
                  <div
                    key={index}
                    className="bg-primary/50 text-white rounded-xl p-1.5 px-3 text-[10px]"
                  >
                    #{keywrod}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-6 mt-2 text-[12px]">
            <div className="flex items-center gap-2 text-white">
              <GrCalendar size={20} className="text-primary" />
              <p className="text-[12px]">
                {arabicDateConversion(date as Date)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <GrLocation size={20} className="text-primary" />
              <div className="flex items-center gap-1 text-white">
                <p>{location.city}</p>-<p>{location.neighborhood}</p>
              </div>
            </div>
          </div>

          <p className="font-light mt-2 line-clamp-[10] text-[15px] text-white">
            {description}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2 mt-4 text-white">
          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 border border-[#dddddd46] items-center rounded-md ">
            <p className="text-[12px]">شهداء</p>
            <p className="font-bold text-xl">{deaths}+</p>
          </div>

          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 border border-[#dddddd46] items-center rounded-md ">
            <p className="text-[12px]">إصابات</p>
            <p className="font-bold text-xl">{injuries}+</p>
          </div>

          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 border border-[#dddddd46] items-center rounded-md ">
            <p className="text-[12px] ">منازل مدمرة</p>
            <p className="font-bold text-xl">{destroyedHouses}+</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[65vh] min-h-[300px]">
        <Image
          src={cover_image || "/notFound.png"}
          alt={`صورة ${title}`}
          fill
          sizes="100vw"
          quality={80}
          className="rounded-xl object-cover"
        />
      </div>
    </Link>
  );
}
