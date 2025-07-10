import SupportCard from "@/components/UI/cards/supportCard";
import React from "react";
import { BiDonateHeart } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { PiShareNetwork } from "react-icons/pi";

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      {/* Hero section */}
      <div className="relative flex items-center justify-center p-8 min-h-[45vh] bg-secondary-banner rounded-2xl ">
        <div className="flex flex-col justify-center items-center gap-4 -translate-y-8">
          <h2 className="font-bold text-white text-5xl">منصة غُربَاء</h2>
        </div>
      </div>

      {/* Support grid Cards */}
      <div className="cards-grid-3 gap-4 mt-12 -translate-y-40 container">
        <SupportCard
          title="أثر مستدام"
          icon={
            <BiDonateHeart size={25} className="text-rejected scale-[-1,1]" />
          }
          classname="bg-[#c2361630]"
          details="تبرّعك ليس مجرد مالٍ يُرسل، بل حياةٌ تُوهب، ودفقة أمل تُحيي قلباً أرهقته المِحن."
        />

        <SupportCard
          title="رسالة وفاء"
          icon={
            <BiDonateHeart size={25} className="text-blueColor scale-[-1,1]" />
          }
          classname="bg-[#2980b930]"
          details="كل تبرّع هو كلمة وفاء لروحٍ لم ترحل من ذاكرتنا، وسندٌ لعائلة تنتظر العون."
        />

        <SupportCard
          title="مساهمة مجتمعية"
          icon={<PiShareNetwork className="text-pending" size={25} />}
          classname="bg-[#f39c1230]"
          details="شارك في غرس بذور التكاتف، واجعل من عونك جسراً يعبر به مجتمعنا نحو التقدّم والرُقي."
        />

        <SupportCard
          title="دعم الإبداع"
          icon={<BsStar className="text-approved" size={25} />}
          classname="bg-[#44bd3230]"
          details="استثمر في العقول اللامعة، وكن سبباً في انطلاق شرارة الإبداع التي تصنع التغيير."
        />

        <SupportCard
          title="رسالة وفاء"
          icon={
            <BiDonateHeart size={25} className="text-blueColor scale-[-1,1]" />
          }
          classname="bg-[#2980b930]"
          details="كل تبرّع هو كلمة وفاء لروحٍ لم ترحل من ذاكرتنا، وسندٌ لعائلة تنتظر العون."
        />

        <SupportCard
          title="مساهمة مجتمعية"
          icon={<PiShareNetwork className="text-pending" size={25} />}
          classname="bg-[#f39c1230]"
          details="شارك في غرس بذور التكاتف، واجعل من عونك جسراً يعبر به مجتمعنا نحو التقدّم والرُقي."
        />
      </div>
    </div>
  );
};

export default SupportUs;
