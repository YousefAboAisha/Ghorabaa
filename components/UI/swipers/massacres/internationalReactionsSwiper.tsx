"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import InternationalReactionCard from "../../cards/internationalReactionCard";

type Props = {
  data?: string[];
};

const breakboints = {
  // When window width is >= 640px
  200: {
    slidesPerView: 1,
  },

  800: {
    slidesPerView: 2,
  },
  // When window width is >= 1024px
  1024: {
    slidesPerView: 2,
  },
};

const InternationalReactionsSwiper = ({ data }: Props) => {
  return (
    <div className="mt-24">
      <h2 className="font-bold text-lg">ردود الفعل العالمية</h2>

      <Swiper
        breakpoints={breakboints}
        spaceBetween={16}
        speed={700}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000 }}
      >
        {data?.map((elem, index) => {
          return (
            <SwiperSlide key={index} className="py-6 pb-10">
              <InternationalReactionCard text={elem} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default InternationalReactionsSwiper;
