"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MassacreInterface } from "@/app/interfaces";
import MassacreCard from "../../cards/massacreCard";

type Props = {
  data?: MassacreInterface[];
};

const RecentlyAddedMassacresSwiper = ({ data }: Props) => {
  const breakboints = {
    // When window width is >= 640px
    200: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    // When window width is >= 768px
    768: {
      slidesPerView: 3,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 3,
    },
  };

  return (
    <div>
      <Swiper
        spaceBetween={8}
        modules={[Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={breakboints}
        className="mt-8"
      >
        {data?.map((item: MassacreInterface) => (
          <SwiperSlide key={item._id as string} className="pb-10">
            <MassacreCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentlyAddedMassacresSwiper;
