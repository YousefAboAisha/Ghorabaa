import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const DonationCard = () => {
  const currentAmount = 6724;
  const goalAmount = 10000;
  const progress = ((currentAmount / goalAmount) * 100).toFixed(2);

  console.log("[progress]", progress);

  return (
    <Link href={`/donationCampaigns/1`} className="mt-4">
      <div className="relative group w-full flex flex-col border bg-white rounded-lg overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={"/event.jpg"}
            alt="img"
            className="w-full rounded-b-none"
            width={1000}
            height={1000}
          />
        </div>

        <div className="relative p-4">
          <h2 className="font-bold">حملة الإحسان الخيرية</h2>

          <p className="text-gray-600 text-[13px] mt-2">
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل
            الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية
            هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه تفاصيل الفعالية هذه
            تفاصيل الفعالية هذه تفاصيل الفعالية.
          </p>

          <div className="flex flex-col gap-2 mt-6 text-md">
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <p>نسبة الاكتمال</p>
                <p className="text-primary font-bold">{progress}%</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-bold">{currentAmount} $ </p>
                <FiArrowLeft />
                <p className="text-gray_dark">{goalAmount} $</p>
              </div>
            </div>

            <div
              className={`relative bg-gray_light rounded-xl h-1  overflow-hidden`}
            >
              <div
                style={{
                  width: `${progress}%`,
                }}
                className="absolute bg-primary right-0 z-10 h-full rounded-xl"
              ></div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray_dark">
              <p className="">بواسطة | </p>
              <p className="flex items-center gap-1">يوسف رشاد أبو عيشة</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DonationCard;
