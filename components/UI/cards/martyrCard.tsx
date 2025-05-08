import Image from "next/image";
import image from "@/public/hasabo.jpg";
import Link from "next/link";
import { GiPeaceDove } from "react-icons/gi";
import { HiUser } from "react-icons/hi";

const MartyrCard = () => {
  return (
    <Link href={`/martyrs/1`} className="mt-4" title="عرض الملف الشخصي">
      <div className="relative group w-full flex flex-col border bg-white rounded-2xl overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={image}
            alt="صورة الشهيد"
            className="w-full rounded-2xl rounded-b-none group-hover:scale-125 duration-700"
          />
        </div>

        <div className="relative p-4">
          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray_dark">الشهيد/ </p>
            <p className="font-bold text-secondary">محمد عبدالله حسب الله</p>
          </div>
          <p className="text-gray-600 text-[13px] mt-2">
            المهندس الحبيب محمد 🤍 تمرُّ اليوم الذكرى الأولى لأفدح خساراتي،
            وكأنّ جزءًا من روحي برحيلك. عامٌ كاملٌ مضى، وحزني عليكَ لم يكتمل
            بعد، وكأنّ كلَّ يومٍ هو أولُ يوم لِفراقك.
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
            <p className=" ">8 ديسمبر 2023</p>
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
