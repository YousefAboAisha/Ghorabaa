import SupportCard from "@/components/UI/cards/supportCard";
import Image from "next/image";
import React from "react";
import { BiDonateHeart } from "react-icons/bi";
import { BsEnvelopeAt, BsStar, BsWhatsapp } from "react-icons/bs";
import { PiShareNetwork } from "react-icons/pi";

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      <div className="relative flex items-center justify-center p-8 min-h-[45vh] bg-secondary rounded-2xl ">
        <div className="flex flex-col justify-center items-center gap-4 -translate-y-8">
          <h2 className="font-bold text-white text-5xl">دعم المنصة</h2>
          <p className="text-sm text-center text-gray_light font-light w-full lg:w-[70%]">
            تبرعك ليس مجرد مبلغ يُرسل، بل هو روح تُنعش، وكرامة تُستعاد، وجسرٌ
            بينك وبين السماء. غزة لا تحتمل التأجيل… والفرج قد يبدأ منك.
          </p>
        </div>
      </div>

      {/* Support grid Cards */}
      <div className="cards-grid-3 gap-6 mt-12 -translate-y-40 container">
        <SupportCard
          title="تبرّع هادف"
          icon={
            <BiDonateHeart size={25} className="text-blueColor scale-[-1,1]" />
          }
          classname="bg-[#2980b930]"
          details="تبرّعك ليس مجرد مالٍ يُرسل، بل حياةٌ تُوهب، ودفقة أمل تُحيي قلباً أرهقته المِحن."
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
      </div>

      {/* Donation QR code */}
      <div className="relative flex items-center justify-center -translate-y-10">
        <div className="absolute flex flex-col items-center justify-center gap-10 text-secondary">
          <h2 className="font-bold text-2xl md:text-5xl lg:text-7xl duration-300">
            تَـــــــــــــــــــــــــــــــــــــــــــــبرّع
          </h2>

          <h2 className="font-bold text-2xl md:text-5xl lg:text-7xl duration-300">
            الــــــــــــــــــــــــــــــــــــآن
          </h2>
        </div>

        <Image
          src={"/bopQr.png"}
          width={300}
          height={300}
          alt="BOP user details"
          className="z-10 shadow-md rounded-3xl"
        />
      </div>

      <div className="relative mt-20 cards-grid-3">
        <div className="flex items-center gap-4 bg-white p-8 rounded-md border border-r-8 border-r-pending">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f39c1230]">
            <BsEnvelopeAt className="text-pending" size={22} />
          </div>

          <div className="flex flex-col gap-2">
            <h2>البريد الالكتروني</h2>
            <p className="text-sm text-gray_dark">yousef.aboesha@hotmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-8 rounded-md border border-r-8 border-r-approved">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#44bd3230]">
            <BsWhatsapp className="text-approved" size={22} />
          </div>

          <div className="flex flex-col gap-2">
            <h2>الواتس آب</h2>
            <p
              style={{
                direction: "ltr",
              }}
              className="text-sm text-gray_dark"
            >
              +970 592551405
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-8 rounded-md border border-r-8 border-r-blueColor">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2980b930]">
            <BsEnvelopeAt className="text-blueColor" size={22} />
          </div>

          <div className="flex flex-col gap-2">
            <h2>نسعد باستقبال رسائلكم</h2>
            <p className="text-sm text-gray_dark">yousef.aboesha@hotmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
