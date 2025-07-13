"use client";
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

import MassacreCard from "@/components/UI/cards/masscareCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Masscares = () => {
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
      className="relative py-10"
      style={{
        direction: "ltr",
      }}
    >
      <SwiperSlide className="pb-10">
        <MassacreCard
          id="shujaiyya-2014"
          title="مجزرة الشجاعية"
          date="2014-07-20"
          location={{ city: "غزة", neighborhood: "الشجاعية" }}
          deathToll={{ total: 120 }}
          injuries={{ total: 500 }}
          media={[
            {
              type: "image",
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEuFwVul9ILfE5vNnplbWsLQoaQaDVnJkUA&s",
            },
          ]}
          description="
            في صبيحة يوم الأحد، الموافق 20 يوليو 2014، ارتكبت قوات الاحتلال
            الإسرائيلي واحدة من أفظع المجازر في حي الشجاعية شرق مدينة غزة، خلال
            العدوان على القطاع في صيف عام 2014. قُصفت المنطقة بشكل كثيف وعشوائي،
            حيث استخدمت المدفعية الثقيلة والطائرات الحربية لتدمير المنازل على
            رؤوس ساكنيها، دون سابق إنذار. استمرت المجزرة لساعات طويلة، مُخلفة
            وراءها مشاهد مروعة من الجثث المتناثرة، والبيوت المدمرة، والصرخات
            المكتومة تحت الأنقاض. قُتل خلال هذه المجزرة أكثر من 72 شهيدًا،
            معظمهم من الأطفال والنساء، وجُرح المئات، فيما اضطر عشرات العائلات
            إلى الفرار سيرًا على الأقدام وسط النيران والركام. تحولت الشجاعية إلى
            مدينة أشباح، وأصبحت المجزرة رمزًا لوحشية الاحتلال، ولصمت العالم أمام
            الجرائم المتكررة بحق المدنيين في غزة. رغم الدمار، بقيت الشجاعية
            شامخة، وصار شهداؤها عنوانًا للبطولة والصمود في وجه الظلم والعدوان."
        />
      </SwiperSlide>

      <SwiperSlide className="pb-10">
        <MassacreCard
          id="shujaiyya-2014"
          title="مجزرة الشجاعية"
          date="2014-07-20"
          location={{ city: "غزة", neighborhood: "الشجاعية" }}
          deathToll={{ total: 120 }}
          injuries={{ total: 500 }}
          media={[
            {
              type: "image",
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEuFwVul9ILfE5vNnplbWsLQoaQaDVnJkUA&s",
            },
          ]}
          description="
            في صبيحة يوم الأحد، الموافق 20 يوليو 2014، ارتكبت قوات الاحتلال
            الإسرائيلي واحدة من أفظع المجازر في حي الشجاعية شرق مدينة غزة، خلال
            العدوان على القطاع في صيف عام 2014. قُصفت المنطقة بشكل كثيف وعشوائي،
            حيث استخدمت المدفعية الثقيلة والطائرات الحربية لتدمير المنازل على
            رؤوس ساكنيها، دون سابق إنذار. استمرت المجزرة لساعات طويلة، مُخلفة
            وراءها مشاهد مروعة من الجثث المتناثرة، والبيوت المدمرة، والصرخات
            المكتومة تحت الأنقاض. قُتل خلال هذه المجزرة أكثر من 72 شهيدًا،
            معظمهم من الأطفال والنساء، وجُرح المئات، فيما اضطر عشرات العائلات
            إلى الفرار سيرًا على الأقدام وسط النيران والركام. تحولت الشجاعية إلى
            مدينة أشباح، وأصبحت المجزرة رمزًا لوحشية الاحتلال، ولصمت العالم أمام
            الجرائم المتكررة بحق المدنيين في غزة. رغم الدمار، بقيت الشجاعية
            شامخة، وصار شهداؤها عنوانًا للبطولة والصمود في وجه الظلم والعدوان."
        />
      </SwiperSlide>

      <SwiperSlide className="pb-10">
        <MassacreCard
          id="shujaiyya-2014"
          title="مجزرة الشجاعية"
          date="2014-07-20"
          location={{ city: "غزة", neighborhood: "الشجاعية" }}
          deathToll={{ total: 120 }}
          injuries={{ total: 500 }}
          media={[
            {
              type: "image",
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEuFwVul9ILfE5vNnplbWsLQoaQaDVnJkUA&s",
            },
          ]}
          description="
            في صبيحة يوم الأحد، الموافق 20 يوليو 2014، ارتكبت قوات الاحتلال
            الإسرائيلي واحدة من أفظع المجازر في حي الشجاعية شرق مدينة غزة، خلال
            العدوان على القطاع في صيف عام 2014. قُصفت المنطقة بشكل كثيف وعشوائي،
            حيث استخدمت المدفعية الثقيلة والطائرات الحربية لتدمير المنازل على
            رؤوس ساكنيها، دون سابق إنذار. استمرت المجزرة لساعات طويلة، مُخلفة
            وراءها مشاهد مروعة من الجثث المتناثرة، والبيوت المدمرة، والصرخات
            المكتومة تحت الأنقاض. قُتل خلال هذه المجزرة أكثر من 72 شهيدًا،
            معظمهم من الأطفال والنساء، وجُرح المئات، فيما اضطر عشرات العائلات
            إلى الفرار سيرًا على الأقدام وسط النيران والركام. تحولت الشجاعية إلى
            مدينة أشباح، وأصبحت المجزرة رمزًا لوحشية الاحتلال، ولصمت العالم أمام
            الجرائم المتكررة بحق المدنيين في غزة. رغم الدمار، بقيت الشجاعية
            شامخة، وصار شهداؤها عنوانًا للبطولة والصمود في وجه الظلم والعدوان."
        />
      </SwiperSlide>

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

export default Masscares;
