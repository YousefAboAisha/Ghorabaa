"use client";
import { ActiveUserInterface } from "@/app/interfaces";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import TrendingStorySkeletonLoader from "@/components/UI/loaders/trendingStorySkeletonLoader";
import ActiveUserCard from "@/components/UI/cards/activeUserCard";

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
    slidesPerView: 4,
  },
};

const ActiveUsers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ActiveUserInterface[]>([]);

  const [error, setError] = useState<string | null>(null);

  const fetchActiveUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics/users/active/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setLoading(false);
        let errorMsg = "حدث خطأ أثناء جلب البيانات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const { data } = await res.json();
      console.log("📊 Trending stories data:", data);
      setLoading(false);

      setData(data);
    } catch (error) {
      setLoading(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const renderActiveUsers = () => {
    if (error) return <ErrorMessage error={error} />;
    if (loading) return <TrendingStorySkeletonLoader length={4} />;

    if (data.length === 0) return <NoDataMessage className="min-h-[40vh]" />;

    return (
      <Swiper
        breakpoints={breakboints}
        spaceBetween={8}
        modules={[Navigation, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="mt-4 "
      >
        {data.map(
          ({ user_id, name, email, image, stories, comments }, index) => (
            <SwiperSlide key={index} className="pb-10">
              <ActiveUserCard
                user_id={user_id}
                name={name}
                email={email}
                image={image}
                stories={stories}
                comments={comments}
                total={index + 1}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    );
  };

  return <div className="relative w-full mt-6">{renderActiveUsers()}</div>;
};

export default ActiveUsers;
