import React from "react";

const Hero = () => {
  return (
    <div className="section relative bg-home-landing w-full min-h-[40vh] lg:bg-cover bg-center rounded-lg flex flex-col justify-center p-8 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-[#000000a4] before:rounded-lg mt-24 bg-fixed">
      <div className="flex flex-col justify-center items-center text-white z-10">
        <h2 className="text-6xl font-bold text-white mb-6 text-center">
          الفعاليات القادمة
        </h2>

        <p className="text-center w-full md:w-6/12 text-gray_light">
          وحزني عليكَ لم يكتمل بعد، وكأنّ كلَّ يومٍ هو أولُ يوم لِفراقك. لم
          أستطع أن كما يليق بك, فقد كنت لي أكثرَ من أخ ورفيق وصديق وسند. خلفك
          فراغاً لا يملؤه شيء، وذكراك التي لا تفارقني.
        </p>
      </div>
    </div>
  );
};

export default Hero;
