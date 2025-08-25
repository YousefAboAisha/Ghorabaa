import { ContentType, EventStatus, Role } from "@/app/enums";
import { EventInterface } from "@/app/interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";
import { fullDateConversion } from "@/utils/format";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { BsEye } from "react-icons/bs";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import ShareButton from "../stories/shareButton";
import LogVisit from "./logVisits";
import { getServerSession } from "next-auth";

type Props = {
  id: string;
};

const EventDetails = async ({ id }: Props) => {
  const session = await getServerSession();

  const storyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/events/fetch/${id}`,
    {
      cache: "no-store", // optional but recommended if dynamic
    }
  );

  if (!storyResponse.ok) {
    notFound(); // redirects to 404 page
  }

  const data: EventInterface = await storyResponse.json();

  const isAdmin =
    session?.user.role === Role.ADMIN || session?.user.role === Role.EDITOR;
  const isApproved = data.status === EventStatus.APPROVED;

  if (!isApproved && !isAdmin) {
    notFound(); // only allow access if approved, OR user is admin/owner
  }

  return (
    <div className="mt-[70px] min-h-screen">
      {data.status === EventStatus.APPROVED && <LogVisit event_id={id} />}

      <div className="flex flex-col gap-2 mt-24">
        <PageTitles content_title={data.title} />

        <Image
          src={data?.image || "/notFound.png"}
          alt="Event Title"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-md"
          priority
          quality={100}
        />

        <div className="relative mt-1 ">
          <div className="flex flex- justify-between text-[11px]">
            <div className="flex items-center gap-2 text-gray_dark">
              <p>تاريخ النشر: </p>
              <p>{fullDateConversion(data.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2 text-gray_dark">
              <p title="المشاهدات">{data?.visits || 0}</p>
              <BsEye title="المشاهدات" size={18} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-8 mt-6">
            <h4 className="text-lg font-bold">فعالية {data.title}</h4>
            {/* Share content button */}
            {data && (
              <ShareButton data={data!} content_type={ContentType.EVENT} />
            )}
          </div>

          <div className="flex flex-col gap-2 mt-4 text-sm">
            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-primary" size={16} />
              <p>{fullDateConversion(data?.start_date as Date)}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-primary" size={16} />
              <p>{fullDateConversion(data?.end_date as Date)}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FiMapPin className="text-primary" size={16} />
              <div className="flex items-center gap-1">
                <p>{data.location.city}</p>-<p>{data.location.neighborhood}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg">تفاصيل الفعالية</h2>
            <p className="text-gray-600 text-md mt-2">{data.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
