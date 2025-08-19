import { EventInterface } from "@/app/interfaces";
import { fullDateConversion } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";

type Props = {
  data?: EventInterface;
};

const EventCard = ({ data }: Props) => {
  return (
    <Link href={`/events/${data?._id}`} className="mt-4">
      <div className="relative group w-full flex flex-col border bg-white rounded-lg overflow-hidden hover:shadow-xl duration-700">
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={data?.image || "/notFound.png"}
            alt="img"
            className="w-full rounded-b-none"
            width={300}
            height={300}
          />
        </div>

        <div className="relative p-4">
          <h2 className="font-bold">فعالية {data?.title}</h2>
          <p
            style={{
              lineHeight: "20px",
            }}
            className="text-gray-600 text-[13px] mt-3 line-clamp-4"
          >
            {data?.details || "لا توجد تفاصيل متاحة لهذه الفعالية."}
          </p>
        </div>

        <hr className="mt-2" />

        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="text-primary" size={16} />
            <p>{fullDateConversion(data?.start_date as Date)}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FiMapPin className="text-primary" size={16} />
            <div className="flex items-center gap-1">
              <p>{data?.location.city}</p>-<p>{data?.location.neighborhood}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
