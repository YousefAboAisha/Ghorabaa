"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MartyrCard from "./cards/storyCard";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { StoryInterface } from "@/app/interfaces";

type ImagesSwiperProps = {
  data?: StoryInterface[];
};

const ImagesSwiper = ({ data }: ImagesSwiperProps) => {
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
      slidesPerView: 4,
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
        {data?.map((item: StoryInterface) => (
          <SwiperSlide key={item._id as string}>
            <MartyrCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesSwiper;
