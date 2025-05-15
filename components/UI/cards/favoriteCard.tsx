import Image from "next/image";
import image from "@/public/hasabo.jpg";
import Link from "next/link";
import { BsEye, BsTrash } from "react-icons/bs";

const FavoriteCard = () => {
  return (
    <div className="relative group mt-4">
      <div
        title="عرض الملف الشخصي"
        className="relative group w-full flex flex-col border rounded-3xl overflow-hidden duration-700"
      >
        <div className="relative">
          <Image src={image} alt="صورة الشهيد" className="w-full rounded-3xl" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 absolute bottom-0 group-hover:opacity-100 opacity-0 duration-300 left-0 w-full h-full p-6 text-white bg-[#00000084]">
          <div className="flex items-center gap-2 font-semibold text-md">
            <p>الشهيد/ </p>
            <p>محمد عبدالله حسب الله</p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 w-full absolute bottom-4">
            <Link
              title="عرض الملف الشخصي للشهيد"
              href={"/stories/1"}
              className="flex items-center justify-center rounded-xl border border-gray_light shadow-sm p-3 "
            >
              <BsEye className="text-white" size={20} />
            </Link>

            <div
              title="إزالة من القصص المحفوظة"
              className="flex items-center justify-center rounded-xl border border-gray_light shadow-sm p-3 cursor-pointer "
            >
              <BsTrash className="text-red-600" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
