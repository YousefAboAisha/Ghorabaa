"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

import { MassacreInterface } from "@/app/interfaces";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import MassacreCard from "../../cards/massacreCard";

type Props = {
  data?: MassacreInterface[];
};

const RecentlyAddedSwiper = ({ data }: Props) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
      effect="coverflow"
      speed={1000}
      fadeEffect={{ crossFade: true }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      className="relative mt-8 pb-10"
      style={{
        direction: "ltr",
      }}
    >
      {data?.map((item: MassacreInterface) => (
        <SwiperSlide key={item._id as string} className="overflow-hidden">
          <MassacreCard data={item} />
        </SwiperSlide>
      ))}

      {/* Custom Prev Button */}
      <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <HiChevronLeft size={20} />
      </button>

      {/* Custom Next Button */}
      <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <HiChevronRight size={20} />
      </button>
    </Swiper>
  );
};

export default RecentlyAddedSwiper;
