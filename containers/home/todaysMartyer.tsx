import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDash, BsEye } from "react-icons/bs";

const TodaysMartyr = () => {
  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-start">
        <Heading
          title=""
          highLightText="شهيد اليوم"
          details="وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ ۚ بَلْ أَحْيَاءٌ وَلَٰكِن لّا تَشْعُرُونَ"
          highlightColor="before:bg-primary"
        />

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row items-center gap-4 text-[14px]">
            <h4 className="font-bold text-lg  ">محمد عبدالله حسب الله</h4>
            <div className="flex items-center gap-1 text-red-500 font-bold">
              <h5>(2002</h5>
              <BsDash size={20} />
              <h5>2023)</h5>
            </div>
          </div>

          <p className="text-[13px]">
            المهندس الحبيب محمد 🤍 تمرُّ اليوم الذكرى الأولى لأفدح خساراتي،
            وكأنّ جزءًا من روحي برحيلك. عامٌ كاملٌ مضى، وحزني عليكَ لم يكتمل
            بعد، وكأنّ كلَّ يومٍ هو أولُ يوم لِفراقك. لم أستطع أن كما يليق بك,
            فقد كنت لي أكثرَ من أخ ورفيق وصديق وسند. خلفك فراغاً لا يملؤه شيء،
            وذكراك التي لا تفارقني. كنت البسمة التي تزيّن أيامنا، تملأ المكان
            بهجة، وتبثُ فينا الحياة أينما حللت. لم تكن تأخذ الدنيا بجديّة، بل
            كنتَ تعاملها بطريقتك. غيابك لم يكن نهاية، بل بداية لحكاية خالدة، لأن
            الشهداء أحياء عند ربهم يرزقون. ستبقى حياً في قلبي، وفي دعائي، وفي كل
            لحظة أسترجع فيها صوتك وضحكتك. الأيام من بعدك موحشة ومليئة بالكسر
            وفقدان الشغف بالحياة . أصبح كل شيئ ميتاً في عيني . 23 عاماً كنت فيها
            نِعم الأخ والسند ، نِعم الصاحب و الرفيق . رحمك اللّٰه يا قطعة مني،
            رحمك اللّٰه بقدر ما تمنّينا بقائك . رحمك اللّٰه يا روحاً انتزعت من
            روحي، يا حزن قلبي الأول، ما أطول غيابك و ما أشد الشوق. عسانا غداً فى
            الجنَّة نأنَس بأحبابٍ فَارقوا دُنيانا بَاكرًا وَلم نشبع مِنْهُم،
            عسانا نَمسحُ عن وجوهِ بعضِنَا التعب ونقول سويًا &quot;واللَّهِ ما
            رَأينا شقاءً قط&quot;. عَسانا بِمُجالسة الحبيب المُصطفى نحظىٰ وفي
            بَساتين الروحِ والرَيحانِ نركُض، وتُزيَن عُيوننا بِرؤية وَجههِ
            الكريم. إنَّ عزائي أن لقاءنا حتميُّ مهما تأجل. أسأل اللّٰه أن تكون
            شفيعًا لي، وأن يجمعنا في دار الخلود. اللهم اجعل مقامه في أعالي
            الجنان، وارزقني صبرًا يكفي لثقل هذا الفقد، واجمعنا به في مستقر رحمتك
            كما جمعتنا في الدنيا على المحبة والخير
          </p>
        </div>

        <Link href={`/martyrs/1`} className="mt-4">
          <Button
            title="عرض الملف الشخصي"
            className="w-full bg-primary text-[12px] px-4"
            icon={<BsEye size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>

      <Image
        src={"/event.jpg"}
        width={1000}
        height={1000}
        alt="Today's martyr"
        className="shadow-2xl rounded-2xl self-center"
      />
    </div>
  );
};

export default TodaysMartyr;
