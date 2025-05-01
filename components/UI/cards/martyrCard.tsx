import Image from "next/image";
import image from "@/public/hasabo.jpg";
import Link from "next/link";

const MartyrCard = () => {
  return (
    <Link href={`/martyrs/1`} className="mt-4" title="عرض الملف الشخصي">
      <div className="relative group w-full flex flex-col border bg-white rounded-2xl overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={image}
            alt="img"
            className="w-full rounded-2xl rounded-b-none group-hover:scale-125 duration-700"
          />
        </div>

        <div className="relative p-4">
          <div className="flex items-center gap-2 text-[13px] ">
            <h4 className="text-gray-500">الشهيد/ </h4>
            <h4 className="font-bold">محمد عبدالله حسب الله</h4>
          </div>
          <p className="text-gray-600 text-[13px] mt-2">
            المهندس الحبيب محمد 🤍 تمرُّ اليوم الذكرى الأولى لأفدح خساراتي،
            وكأنّ جزءًا من روحي برحيلك. عامٌ كاملٌ مضى، وحزني عليكَ لم يكتمل
            بعد، وكأنّ كلَّ يومٍ هو أولُ يوم لِفراقك.
          </p>

          <hr className="my-2" />

          <div className="flex items-center gap-2 text-[12px] mt-4 font-bold ">
            <h4 className="text-red-600">استشهد بتاريخ: </h4>
            <h4> 8 - 12 - 2023 </h4>
          </div>

          <div className="flex items-center gap-2 text-[12px] mt-2 font-bold ">
            <h4 className="text-red-600">العمر: </h4>
            <div className="flex items-center gap-1">
              <h4>22</h4>
              <h4>عاماً</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MartyrCard;
