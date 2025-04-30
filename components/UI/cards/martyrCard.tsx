import Image from "next/image";
import { BsEye } from "react-icons/bs";
import image from "@/public/work.jpg";
import Link from "next/link";
import Button from "../inputs/button";

const MartyrCard = () => {
  return (
    <div className="relative group w-full flex flex-col border bg-white rounded-2xl overflow-hidden hover:shadow-xl duration-700">
      <div className="relative max-h-[300px] overflow-hidden">
        <Image
          src={image || "./user.png"}
          alt="img"
          className="w-full rounded-2xl rounded-b-none group-hover:scale-125 duration-700"
        />
      </div>

      <div className="relative p-4">
        <div className="flex items-center gap-2 text-[13px] ">
          <h4 className="text-gray-500">الشهيد/ </h4>
          <h4 className="font-bold">محمد عبدالله حسب الله</h4>
        </div>
        <p className="text-gray-600 text-[13px] mt-2"></p>

        <div className="flex items-center gap-2 text-[13px] mt-4 font-bold ">
          <p className="text-red-600">استشهد بتاريخ: </p>
          <p> 8 - 12 - 2023 </p>
        </div>

        <div className="flex items-center gap-2 text-[13px] mt-2 font-bold ">
          <p className="text-red-600">العمر: </p>
          <div className="flex items-center gap-1">
            <p>22</p>
            <p>عاماً</p>
          </div>
        </div>

        <Link href={`/martyr/1`} className="mt-4">
          <Button
            title="عرض الملف الشخصي"
            className="bg-primary text-white text-[12px] mt-4"
            icon={<BsEye size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default MartyrCard;
