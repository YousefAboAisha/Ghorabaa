import Image from "next/image";
import React from "react";
import image from "@/public/event.jpg";
import DonationDetailsCard from "@/components/UI/cards/donationDetailsCard";
import Button from "@/components/UI/inputs/button";
import { FaCoins } from "react-icons/fa";

export async function generateMetadata() {
  return {
    title: {
      default: "غُرباء | حملة أيادي الخير",
      template: "%s",
    },
    description: "هذه تفاصيل حملة التبرع",
    icons: {
      apple: "/zad-logo.svg",
      icon: "/zad-logo.svg",
    },
  };
}

const page = () => {
  const currentAmount = 5255;
  const goalAmount = 10000;
  const progress = ((currentAmount / goalAmount) * 100).toFixed(2);

  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <Image
          src={image}
          alt="Donation Campaign Title"
          width={1000}
          height={1000}
          className="mx-auto rounded-2xl shadow-md"
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

          <h4 className="text-lg font-bold mt-2">حملة أيادي الخير</h4>

          <div className="flex flex-col gap-2 mt-4 rounded-md border p-6 text-md">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-2">
                <p>تم جمع مبلغ </p>
                <p className="bg-primary p-1 px-2 text-white rounded-sm">
                  {currentAmount} $
                </p>
                <p>من أصل</p>
                <p className=" bg-gray-300 p-1 px-2 rounded-sm font-bold">
                  {goalAmount} $
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{progress}%</p>
              <div
                className={`relative bg-gray-300 rounded-sm h-1 overflow-hidden w-full`}
              >
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className="absolute bg-primary right-0 z-1 h-full"
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg">تفاصيل الحملة</h2>
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

          <div className="w-full md:w-4/12 mt-4">
            <Button
              title="تبرع الآن"
              className="bg-primary text-white"
              icon={<FaCoins />}
            />
          </div>

          <div className="mt-10">
            <h2 className="font-bold text-lg">آخر عمليات التبرع</h2>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
              <DonationDetailsCard />
            </div>

            <div className="text-primary flex items-center gap-2 justify-center mt-8 hover:underline text-sm w-fit mx-auto cursor-pointer">
              <p>إظهار المزيد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
