"use client";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
// import { FiCalendar, FiMap, FiMapPin } from "react-icons/fi";

const EventBanner = () => {
  return (
    <div className="section relative bg-home-landing w-full min-h-[40vh] lg:bg-cover bg-center rounded-lg flex flex-col justify-center p-8 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-overlay before:rounded-lg mt-24 bg-fixed">
      <div className="flex flex-col z-10">
        <h2 className="text-6xl font-bold text-white mb-6">15 فبراير 2023</h2>

        <Heading
          highLightText="فعالية يوم الشهيد"
          highlightColor="before:bg-secondary"
          details="اترك أثراً في نفوس أهالي الشهداء وكن دعماً لهم"
          title=""
          className="w-fit text-white"
        />

        {/* <div className="mt-4 flex flex-col gap-2 z-10 text-white">
          <div className="flex flex-row items-center gap-4">
            <FiMapPin />
            <div className="flex items-center gap-2">
              <p>غزة </p> -<p>تل الهوا</p> -<p>صالة رشاد الشوا</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <FiCalendar />
            <p>15 فبراير  2025</p>
          </div>
        </div> */}

        <Link
          href={"/signin"}
          className="w-6/12 md:w-6/12 lg:w-2/12 outline-none"
        >
          <Button
            title="عرض التفاصيل"
            className="bg-secondary w-full h-full mt-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default EventBanner;
