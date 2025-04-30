import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCoins } from "react-icons/fa";

const DonationBanner = () => {
  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-8 bg-primary rounded-xl overflow-hidden">
      <div className="flex flex-col items-start p-8">
        <Heading
          title=""
          highLightText="حملات التبرع"
          details="وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ ۚ بَلْ أَحْيَاءٌ وَلَٰكِن لّا تَشْعُرُونَ"
          highlightColor="before:bg-primary"
          className="text-white"
        />

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row items-center gap-4 text-[14px]">
            <h4 className="font-bold text-lg  text-white">
              كن دعماً وعوناً لأهالي الشهداء، واترك سهماً نافعاً
            </h4>
          </div>

          <p className="text-[13px] text-gray-50">
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
            رَأينا شقاءً قط&quot;
          </p>
        </div>

        <Link href={`/martyr/1`} className="mt-4 lg:w-4/12 md:6/12 w-full">
          <Button
            title="تبرع الآن"
            className="w-full bg-white !text-black font-bold text-[12px]"
            icon={<FaCoins size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>

      <Image
        src={"/donation.jpg"}
        width={1000}
        height={1000}
        alt="Today's martyr"
        className="shadow-2xl z-10 h-full"
      />
    </div>
  );
};

export default DonationBanner;
