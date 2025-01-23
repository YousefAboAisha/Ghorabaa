import Image from "next/image";
import { BsEye } from "react-icons/bs";
import image from "@/public/majd.png";
import Link from "next/link";
import Button from "../inputs/button";
export type TalentCardType = {
  id: number;
  name?: string | undefined;
  isFullTime?: boolean | undefined;
  major?: string | undefined;
  profileURL?: string | undefined;
  rate?: number | undefined;
  skills?: string[] | undefined;
  university?: string | undefined;
  bio?: string | undefined;
};

const MartyerCard = ({ name, id, major }: TalentCardType) => {
  return (
    <div className="relative group w-full flex flex-col items-center border bg-white rounded-2xl p-4">
      <div className="relative">
        <Image
          src={image || "./user.png"}
          alt="img"
          className="w-[85px] h-[85px] rounded-full border border-light"
        />
      </div>

      <h2 className="mt-4 text-sm">{name}</h2>

      <p className="text-primary text-[12px] mt-1">{major}</p>

      <div className="flex flex-col justify-center mb-6 mt-4 w-full">
        <h4 className="text-[13px] font-bold">الشهيد/ محمد عبدالله حسب الله</h4>
        <p className="text-gray-600 text-[13px] mt-2">
          تجربتي كانت رائعة! الخدمة كانت سريعة والمنتج تجاوز توقعاتي. أنصح
          الجميع بهذه الخدمةتجربتي كانت رائعة!
        </p>

        <div className="flex items-center gap-2 text-[13px] mt-4 font-bold ">
          <p className="text-red-600">استشهد بتاريخ: </p>
          <p>8 - 12 - 2023</p>
        </div>

        <div className="flex items-center gap-2 text-[13px] mt-2 font-bold ">
          <p className="text-red-600">العمر: </p>
          <div className="flex items-center gap-1">
            <p>22</p>
            <p>عاماً</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Link href={`/talents/${id}`}>
          <Button
            title="عرض الملف الشخصي"
            className="bg-primary text-white text-[12px]"
            icon={<BsEye size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default MartyerCard;
