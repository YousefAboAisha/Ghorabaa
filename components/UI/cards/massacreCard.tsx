import Link from "next/link";
import Image from "next/image";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { arabicDateConversion } from "@/utils/format";
import { MassacreInterface } from "@/app/interfaces";

type Props = {
  data: MassacreInterface;
};

export default function MassacreCard({ data }: Props) {
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
  } = data;

  return (
    <Link
      href={`/massacres/${_id}`}
      style={{
        direction: "rtl",
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border rounded-xl overflow-hidden p-10 px-16 hover:shadow-md duration-300"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 mt-4 ">
          {/* title */}

          <h2 className="text-2xl font-semibold mb-2">{title}</h2>

          <div className="flex items-center flex-wrap gap-2">
            {["مقاومة", "حصار", "غزة", "مجزرة"]?.map((keywrod, index) => {
              return (
                <div
                  key={index}
                  className="border bg-[#5b913b40] rounded-xl p-1.5 px-3 text-[10px]"
                >
                  #{keywrod}
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-2 text-[12px]">
            <div className="flex items-center gap-2">
              <GrCalendar size={20} className="text-primary" />
              <p className="text-[12px]">
                {arabicDateConversion(date as Date)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <GrLocation size={20} className="text-primary font-bold" />
              <div className="flex items-center gap-1">
                <p>{location.city}</p>-<p>{location.neighborhood}</p>
              </div>
            </div>
          </div>

          <p className="font-light mt-2 line-clamp-[10] text-[15px]">
            {description}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2 mt-4">
          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 shadow-sm items-center rounded-md ">
            <p className="text-[12px]">شهداء</p>
            <p className="font-bold text-rejected">{deaths}+</p>
          </div>

          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 shadow-sm items-center rounded-md ">
            <p className="text-[12px]">إصابات</p>
            <p className="font-bold text-pending">{injuries}+</p>
          </div>

          <div className="flex flex-col gap-2 flex-1 flex-grow p-6 shadow-sm items-center rounded-md ">
            <p className="text-[12px] ">منازل مدمرة</p>
            <p className="font-bold text-secondary">{destroyedHouses}+</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[65vh]">
        <Image
          src={cover_image || "/notFound.png"}
          alt={`صورة ${title}`}
          fill
          className="rounded-xl w-full"
        />{" "}
      </div>
    </Link>
  );
}
