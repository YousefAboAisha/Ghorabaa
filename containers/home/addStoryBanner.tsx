"use client";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
// import { FiCalendar, FiMap, FiMapPin } from "react-icons/fi";

const AddStoryBanner = () => {
  return (
    <div className="section relative bg-event-banner w-full min-h-[40vh] lg:bg-cover bg-center rounded-lg flex flex-col justify-center p-8 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-overlay before:rounded-lg mt-24 bg-fixed">
      <div className="flex flex-col z-10">
        <Heading
          title="ساهم في تخليد إرث أقمارنا"
          details="قم بإضافة تفاصيل عن حياة الشهداء العظماء لإبقاء طيفهم حاضراً فينا."
          className="w-fit text-white !text-4xl !font-bold"
        />

        <Link
          href={"/addStory"}
          className="w-6/12 md:w-6/12 lg:w-2/12 outline-none"
        >
          <Button
            title="إضافة قصة"
            className="bg-primary w-full h-full mt-4"
            icon={<FaPlus />}
          />
        </Link>
      </div>
    </div>
  );
};

export default AddStoryBanner;
