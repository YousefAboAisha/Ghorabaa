import Image from "next/image";
import React from "react";
import image from "@/public/work.jpg";
import { BsDash } from "react-icons/bs";
import MartyrComment from "@/containers/martyrDetails/martyrComment";

const MartyrPage = () => {
  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <div className="relative flex flex-col justify-center items-start w-full min-h-[80vh] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000000d8] bg-fixed rounded-xl before:rounded-xl">
          <Image
            src={image}
            alt="Martyr"
            width={350}
            height={350}
            className="mx-auto rounded-2xl shadow-xl z-[10]"
            priority
            quality={100}
          />
        </div>
        <div className="relative p-4">
          <h4 className="text-[13px] font-bold">
            الشهيد/ محمد عبدالله حسب الله
          </h4>

          <div className="flex items-center gap-8 mt-4">
            <div className="flex items-center gap-2 text-[13px] font-bold ">
              <p className="text-gray-500">ولد بتاريخ: </p>
              <p>25 - 01 - 2002</p>
            </div>

            <div className="flex items-center gap-2 text-[13px] font-bold ">
              <p className="text-gray-500">استشهد بتاريخ: </p>
              <p>8 - 12 - 2023</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-bold mt-2">
            <p className="text-gray-500"> المنطقة: </p>
            <div className="flex items-center gap-1">
              <p>غزة</p>
              <BsDash size={16} />
              <p>تل الهوا</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg">نبذة عن الشهيد </h2>
            <p className="text-gray-600 text-[13px] mt-2">
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
              أجدْ وِصَالاً لروحِه غيرَ أدمُعِي. استُشهد محمد، ودُفن على عُجالة
              قرب مكان نزوحه في مدينة خانيونس، لم يودّعه أحدٌ من أصدقائه، بل
              وأنّ نسبةً كبيرة منهم علِموا نبأ استشهاده بعد فترة طويلة؛ بسبب شدة
              ووطأة الحرب وانقطاع الاتصالات تماماً في ذلك الوقت. في رعاية الله
              وحفظه يا صديقي، أنتم السابقون ونحن اللاحقون بإذن الله، رحمكَ اللهُ
              يا حبيب، والمجد لك يا شهيد، سيظلّ ذكرُك الطيّبُ والحسنُ حاضراً
              فينا إلى أن نلقى الله، ما تنسوا محمد أبداً ❤️
            </p>
          </div>
        </div>
        ``
      </div>

      <div className="flex flex-col gap-2 mb-10 mt-8">
        <h2 className="font-bold text-lg">التعليقات</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MartyrComment />
          <MartyrComment />
          <MartyrComment />
          <MartyrComment />
        </div>
        <div className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto cursor-pointer">
          <p>عرض المزيد</p>
        </div>
      </div>
    </div>
  );
};

export default MartyrPage;
