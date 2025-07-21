import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

const PlatformVideo = () => {
  return (
    <div className="relative cards-grid-2 gap-8 rounded-md border bg-white p-8 -translate-y-20">
      <div className="relative order-2 md:order-1 flex flex-col gap-2">
        <Heading
          title="الشهيد/ محمد عبد الله حسب الله"
          className="!text-xl"
          details="هذه المنصة صدقة جارية عن روح شهيدنا من صديقه المخلص يوسف رشاد أبو عيشة"
          detailsStyles="!text-sm !font-light"
        />

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <GrLocation className="text-secondary" /> <p>غزة</p>-<p>تل الهوا</p>
          </div>

          <div className="flex items-center flex-wrap gap-4 md:gap-4 lg:gap-8 mt-1">
            <div className="flex items-center gap-2">
              <p>تاريخ الميلاد: </p>
              <p className="font-semibold">Jan, 25th 2002</p>
            </div>

            <div className="flex items-center gap-2">
              <p>تاريخ الاستشهاد: </p>
              <p className="font-semibold">Dec, 8th 2023</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <h2 className="font-semibold text-lg">نبذة عن الشهيد</h2>
          <p className="relative font-light line-clamp-[12]">
            نتطلع في غرباء أن نصبح مرجعًا رقميًا رائدًا لتخليد ذكرى شهداء
            فلسطين، يُسهم في بناء وعي مجتمعي، ويُحفّز على العطاء، ويجمع الجهود
            تحت مظلةٍ واحدة من الوفاء والكرامة الإنسانية. نعمل في غرباء على
            توثيق قصص الشهداء في غزة، وإبراز بطولاتهم بلغة إنسانية، كما نسعى إلى
            دعم عائلاتهم معنويًا ومجتمعيًا، من خلال أرشيف رقمي متكامل يخلّد
            تضحياتهم ويمنحهم التكريم الذي يستحقونه. نطمح في غرباء إلى بناء سجل
            أرشيفي وإحصائي هو الأول من نوعه في بلادنا، حيث سنعمل على جمع أكبر
            قدر من البيانات والمعلومات الخاصة بالشهداء، بحيث نكون مرجعاً موثوقاً
            به وذا مصداقية عالية، حيث سيصبح من السهل علينا إيصال صوتنا ورسالتنا
            للعالم، لعله يحرّك ساكناً! نتطلع في غرباء أن نصبح مرجعًا رقميًا
            رائدًا لتخليد ذكرى شهداء فلسطين، يُسهم في بناء وعي مجتمعي، ويُحفّز
            على العطاء، ويجمع الجهود تحت مظلةٍ واحدة من الوفاء والكرامة
            الإنسانية. نعمل في غرباء على توثيق قصص الشهداء في غزة، وإبراز
            بطولاتهم بلغة إنسانية، كما نسعى إلى دعم عائلاتهم معنويًا ومجتمعيًا،
            من خلال أرشيف رقمي متكامل يخلّد تضحياتهم ويمنحهم التكريم الذي
            يستحقونه. نطمح في غرباء إلى بناء سجل أرشيفي وإحصائي هو الأول من نوعه
            في بلادنا، حيث سنعمل على جمع أكبر قدر من البيانات والمعلومات الخاصة
            بالشهداء، بحيث نكون مرجعاً موثوقاً به وذا مصداقية عالية، حيث سيصبح
            من السهل علينا إيصال صوتنا ورسالتنا للعالم، لعله يحرّك ساكناً!
          </p>
        </div>

        <Link
          href={"/stories/6832db7efb30ee41b7badd59"}
          className="relative md:w-fit w-full mt-4"
        >
          <Button
            title="الملف الشخصي"
            className="bg-secondary text-white w-full px-6"
            icon={<FaEye />}
            hasShiningBar
          />
        </Link>
      </div>

      <div className="order-1 md:order-2 flex items-center justify-center">
        <Image
          src={"/hasabo.jpg"}
          width={500}
          height={500}
          alt="الشهيد محمد حسب الله"
          className="bg-cover rounded-2xl shadow-md w-full"
        />
      </div>
    </div>
  );
};

export default PlatformVideo;
