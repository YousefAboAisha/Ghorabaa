"use client";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
// import { FiCalendar, FiMap, FiMapPin } from "react-icons/fi";

const EventBanner = () => {
  return (
    <div className="section relative bg-event-banner w-full min-h-[40vh] lg:bg-cover bg-center rounded-lg flex flex-col justify-center p-8 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-overlay before:rounded-lg mt-24 bg-fixed">
      <div className="flex flex-col z-10">
        <h2 className="text-6xl font-bold text-white mb-6">15 فبراير 2023</h2>

        <Heading
          title="فعالية يوم الشهيد"
          details="اترك أثراً في نفوس أهالي الشهداء وكن دعماً لهم"
          className="w-fit text-white"
        />

        <Link
          href={"/events"}
          className="w-6/12 md:w-6/12 lg:w-2/12 outline-none"
        >
          <Button
            title="عرض التفاصيل"
            className="bg-primary w-full h-full mt-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default EventBanner;
