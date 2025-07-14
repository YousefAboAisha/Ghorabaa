"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Image from "next/image";

type Props = {
  data?: string[];
};

const MassacreMediaSwiper = ({ data }: Props) => {
  return (
    <div className="relative w-full h-[350px] mt-8">
      <Swiper
        modules={[Autoplay, Navigation, EffectCards]}
        speed={700}
        effect="cards" // 👈 Add this
        cardsEffect={{ perSlideOffset: 1 }} // 👈 Optional: enables smooth crossfade
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="relative py-10"
        style={{
          direction: "ltr",
        }}
      >
        {data?.map((elem, index) => {
          return (
            <SwiperSlide key={index} className="py-6 pb-10">
              <div className="relative w-full overflow-hidden group h-[350px] hover:cursor-grab">
                <Image
                  src={"/banner.png"}
                  alt="Event Title"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Prev Button */}
        <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
          <HiChevronLeft size={20} />
        </button>

        {/* Custom Next Button */}
        <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
          <HiChevronRight size={20} />
        </button>
      </Swiper>
    </div>
  );
};

export default MassacreMediaSwiper;
