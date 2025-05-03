import Image from "next/image";
import React from "react";
import image from "@/public/event.jpg";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import ShareModal from "@/containers/events/shareModal";

export async function generateMetadata() {
  return {
    title: {
      default: "غُرباء | فعالية يوم الشهيد",
      template: "%s",
    },
    description: "هذه تفاصيل الفعالية",
    icons: {
      apple: "/zad-logo.svg",
      icon: "/zad-logo.svg",
    },
  };
}

const page = () => {
  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <Image
          src={image}
          alt="Event Title"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-md"
          priority
          quality={100}
        />

        <div className="relative mt-6">
          <div className="flex items-center gap-2 text-[12px] text-gray_dark">
            <p>بواسطة: </p>
            <p>يوسف رشاد أبو عيشة</p>
            <p> | </p>
            <p>16 فبراير 2026</p>
          </div>

          <div className="flex items-center justify-between gap-8">
            <h4 className="text-lg font-bold">فعالية يوم الشهيد</h4>
            <ShareModal />
          </div>

          <div className="flex gap-6 mt-6 text-[13px]">
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <FiCalendar className="text-gray_dark" size={16} />
              <p className="flex items-center gap-1">17 فبراير 2025</p>
            </div>

            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <FiClock className="text-gray_dark" size={16} />
              <p className="flex items-center gap-1">الساعة الخامسة مساءً</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-semibold mt-3">
            <FiMapPin className="text-gray_dark" size={16} />
            <p className="flex items-center gap-1">فندق المشتل</p>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg">تفاصيل الفعالية</h2>
            <p className="text-gray-600 text-md mt-2">
              الشّهيد الصّديق وحبيب القلب المُهندس محمد عبد الله حسب الله، كان
              سَمِحاً، باسماً، عاليَ الخُلق والهِمّة، مُلتزماً ومحبوباً من
              الجميع، متفوقاً في دراسته في كافة مراحله الدراسية، حيث كان من
              أوائل كلية الهندسة في جامعة الأزهر، أمضينا سنين الجامعة في غرفته
              الصغيرة التي كانت في الطابق الأرضي من بيتهم الجميل للغاية، والذي
              كان محمد يعتني بنباتاته وأشجاره عناية فائقة، وكأنهم أبناؤه، فكان
              البيت أشبه بالقصر! وللأسف كما هو الحال مع الكثير منّا، تم استهدافه
              من قبل قوات الاحتلال الصهيونية دون أي سبب، وتدميره بالكامل! كان
              مُثقفاً، حالماً، وطموحاً، يقول لنا دائماً:بديش تضيع عليا مرتبة
              الشرف! عشان أول ما أتخرج أصير معيد مباشرة، وأكمل ماجستير ودكتوراه
              وأصير دكتور جامعي، وبجانب تفوقه فقد كان محمد صاحبَ قضية ومبدأ، فلا
              زلت أذكر يوم عملية الشهيد البطل خيRي علقم البطولية، عندما جاء
              بالسيارة مسرعاً إلى بيوتنا، وقال لنا:اليوم عيد، لازم نتحلّى،
              وبالفعل كان يوم عيد ذاك اليوم! اليوم الأول من الهدنة، كانت تلك آخر
              مرة تحدّثتُ معه فيها، ولا زلت أذكر المحادثة عندما قال لي:وينك يا
              زلمة صرلي شهر برن عليك، حتى وصّيت الشباب يعملولك برواز وصورة
              ويكتبولك الشهيد البطل! بعدين شو بتسووا لليوم في غزة اطلعوا وتعالوا
              عنا، فش إشي في الجنوب. أذكر أن المكالمة قد طالت وقتها بشكل غير
              مألوف، لأنّ مكالماتنا خصوصاً بين الأصحاب المقربين تكون قصيرة، لم
              أدرِ وقتها أنها ستكون المكالمة الأخيرة، المرة الأخيرة التي سأسمع
              فيها صوته! جاءني نبأ استشهاده بعد خروجي مباشرة من الاعتقال
              والتعذيب الشديد من قبل الوحوش البشرية الصهاينة، لم أستوعب الخبر
              حينها؛ لأنني كنت تائهاً مشتتاً، وفكري وعقلي ما يزالان عالقَين في
              عذابات ووحشية المعتقل الذي كنت فيه، فكلّ ما فعلته أو بالأحرى ما
              كنت قادراً على فعله هو الصمت ومن ثم بدأت الدموع تنهمر كالسّيل، فلم
              أجدْ وِصَالاً لروحِه غيرَ أدمُعِي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
