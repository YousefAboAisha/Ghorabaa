"use client";
import MartyrCard from "@/components/UI/cards/martyrCard";
import Heading from "@/components/UI/typography/heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const RecentlyAddedMartyrs = () => {
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
    <div className="mt-24">
      <Heading
        highLightText="قصص مضافة حديثاً"
        highlightColor="before:bg-primary"
        title=""
        details="فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ وَيَسْتَبْشِرُونَ بِالَّذِينَ لَمْ يَلْحَقُوا بِهِم مِّنْ خَلْفِهِمْ أَلَّا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
        className="w-fit"
      />

      <Swiper
        spaceBetween={8}
        modules={[Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={breakboints}
        className="mt-8"
      >
        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <SwiperSlide>
          <MartyrCard />
        </SwiperSlide>

        <Link
          href={"/martyrs"}
          className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto"
        >
          <p>عرض المزيد</p>
          <BsArrowLeft />
        </Link>
      </Swiper>
    </div>
  );
};

export default RecentlyAddedMartyrs;
