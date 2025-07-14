import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  label: string;
  icon: StaticImageData;
  classname?: string;
  count: number;
};

const MassacreStatisticsCard = ({ label, icon, count }: Props) => {
  return (
    <div className="relative p-6 w-full bg-white rounded-md flex items-center gap-4 border overflow-hidden">
      <div className="relative w-12 h-12 flex-shrink-0">
        <Image
          src={icon} // assumes your image is named like the key
          alt={`${label} logo`}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-extrabold text-2xl"> {count}+ </p>

        <h2 className="text-[14px] text-gray_dark">{label}</h2>
      </div>
    </div>
  );
};

export default MassacreStatisticsCard;
