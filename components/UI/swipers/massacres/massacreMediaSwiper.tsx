"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Image from "next/image";

type Props = {
  data?: string[];
};

const MassacreMediaSwiper = ({ data }: Props) => {
  return (
    <div className="relative w-full h-[400px] mt-8">
      <Swiper
        modules={[Autoplay, Navigation, EffectCreative, Pagination]}
        speed={1000}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
            rotate: [0, 0, -15],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
            rotate: [0, 0, 15],
          },
        }}
        grabCursor={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span key=${index} class="${className} bg-primary !w-3 !h-3"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="relative h-full"
        style={{ direction: "ltr" }}
      >
        {data?.map((elem, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-xl group">
              <Image
                src={elem}
                alt={`Massacre media ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority={index < 3}
              />
              <div
                dir="rtl"
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6"
              >
                <span className="text-white font-medium text-lg">
                  صورة {index + 1}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <HiChevronLeft size={24} className="text-gray-800" />
        </button>

        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <HiChevronRight size={24} className="text-gray-800" />
        </button>
      </Swiper>
    </div>
  );
};

export default MassacreMediaSwiper;
