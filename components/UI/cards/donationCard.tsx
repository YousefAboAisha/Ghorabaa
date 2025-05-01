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
          <h4>حملة الإحسان الخيرية</h4>

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
                <h4>نسبة الاكتمال</h4>
                <h4 className="text-primary font-bold">{progress}%</h4>
              </div>

              <div className="flex items-center gap-2">
                <h4 className="font-bold">{currentAmount} $ </h4>
                <FiArrowLeft />
                <h4 className="text-gray_dark">{goalAmount} $</h4>
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
              <h4 className="">بواسطة | </h4>
              <h4 className="flex items-center gap-1">يوسف رشاد أبو عيشة</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DonationCard;
