import Heading from "@/components/UI/typography/heading";
import React from "react";
import { BsTrophy } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiTarget } from "react-icons/pi";

const PlatformDescription = () => {
  return (
    <div className="relative cards-grid-3 gap-4 ">
      <div className="relative flex flex-col gap-4 bg-white p-6 rounded-md w-full border-r-8 border-primary shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#5b913b20] rounded-full flex items-center justify-center shadow-sm">
            <HiOutlineLightBulb size={25} className="text-primary" />
          </div>

          <Heading
            title="رؤيتنا"
            className="z-10 !text-lg"
            detailsStyles="!text-[12px] !mt-0 text-gray_dark"
            details="ما نرنو إليه ونسعى لتحقيقه"
          />

          <HiOutlineLightBulb
            size={15}
            className="text-primary absolute top-3 left-3"
          />
        </div>

        <p className="text-gray-700 leading-relaxed text-sm">
          نتطلع في غرباء أن نصبح مرجعًا رقميًا رائدًا لتخليد ذكرى شهداء فلسطين،
          يُسهم في بناء وعي مجتمعي، ويُحفّز على العطاء، ويجمع الجهود تحت مظلةٍ
          واحدة من الوفاء والكرامة الإنسانية.
        </p>
      </div>

      <div className="relative flex flex-col gap-4 bg-white p-6 rounded-md w-full border-r-8 border-blueColor shadow-md overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2980b920] rounded-full flex items-center justify-center shadow-sm">
            <PiTarget size={25} className="text-blueColor" />
          </div>
          <Heading
            title="رسالتنا "
            className="z-10 !text-lg"
            detailsStyles="!text-[12px] !mt-0 text-gray_dark"
            details="الدافع من إنشاء المنصة"
          />
          <PiTarget
            size={15}
            className="text-blueColor absolute top-3 left-3"
          />
        </div>

        <p className="text-gray-700 leading-relaxed text-sm">
          نعمل في غرباء على توثيق قصص الشهداء في غزة، وإبراز بطولاتهم بلغة
          إنسانية، كما نسعى إلى دعم عائلاتهم معنويًا ومجتمعيًا، من خلال أرشيف
          رقمي متكامل يخلّد تضحياتهم ويمنحهم التكريم الذي يستحقونه.
        </p>
      </div>

      <div className="relative flex flex-col gap-4 bg-white p-6 rounded-md w-full border-r-8 border-pending shadow-md overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f39c1220] rounded-full flex items-center justify-center shadow-sm">
            <BsTrophy size={25} className="text-pending" />
          </div>
          <Heading
            title="أهدافنا"
            className="z-10 !text-lg"
            detailsStyles="!text-[12px] !mt-0 text-gray_dark"
            details="ما سيتم تحقيقه في المستقبل"
          />

          <BsTrophy size={15} className="text-pending absolute top-3 left-3" />
        </div>

        <p className="text-gray-700 leading-relaxed text-sm">
          نطمح في غرباء إلى بناء سجل أرشيفي وإحصائي هو الأول من نوعه في بلادنا،
          حيث سنعمل على جمع أكبر قدر من البيانات والمعلومات الخاصة بالشهداء،
          بحيث نكون مرجعاً موثوقاً به وذا مصداقية عالية، حيث سيصبح من السهل
          علينا إيصال صوتنا ورسالتنا للعالم، لعله يحرّك ساكناً!
        </p>
      </div>
    </div>
  );
};

export default PlatformDescription;
