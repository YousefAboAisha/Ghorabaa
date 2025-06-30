"use client";
import React, { useEffect, useState } from "react";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import UsersTable from "@/components/UI/tables/usersTable";
import UserGrowthLineChart from "@/components/UI/charts/userGrowthLineChart";
import ActiveUserCard from "@/components/UI/cards/activeUserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface ActiveUserData {
  user_id: string;
  name: string;
  email: string;
  image?: string;
  stories: number;
  comments: number;
  total: number;
}

interface UserGrowthData {
  date: string;
  users: number;
}

const Users = () => {
  const [usersCountLoader, setUsersCountLoader] = useState(true);
  const [activeUsersCount, setActiveUsersCount] = useState(true);

  const [userCountsError, setUserCountsError] = useState<string | null>(null);
  const [activeUsersError, setActiveUsersError] = useState<string | null>(null);

  const [usersData, setUsersData] = useState<UserGrowthData[]>([]);
  const [activeUsersData, setActiveUsersData] = useState<ActiveUserData[]>([]);

  const fetchUserCountStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setUsersCountLoader(false);
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
      console.log("📊 Users Statistics data:", data);
      setUsersData(data);
    } catch (error) {
      setUsersCountLoader(false);
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setUserCountsError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setUsersCountLoader(false);
    }
  };

  const fetchActiveUsersStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/users/active/fetch`,
        { cache: "no-store" }
      );

      if (!res.ok) {
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
      console.log("🔥 Most Active Users data:", data);
      setActiveUsersData(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setActiveUsersError(message);
      console.error("Error fetching statistics:", error);
    } finally {
      setActiveUsersCount(false);
    }
  };

  useEffect(() => {
    fetchUserCountStatistics();
    fetchActiveUsersStatistics();
  }, []);

  const renderUsersCountContent = () => {
    if (usersCountLoader)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    if (userCountsError)
      return (
        <ErrorMessage
          error={userCountsError}
          className="!min-h-full !border-none"
        />
      );
    if (usersData.length > 0) return <UserGrowthLineChart data={usersData} />;
    return null;
  };

  const renderActiveUsersContent = () => {
    if (activeUsersCount)
      return <p className="text-[12px] abs-center">جارٍ جلب التحليلات</p>;
    if (activeUsersError)
      return (
        <ErrorMessage
          error={activeUsersError}
          className="!min-h-full !border-none"
        />
      );
    if (activeUsersData.length === 0) return null;

    return (
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="relative overflow-hidden"
        style={{
          direction: "ltr",
        }}
      >
        {activeUsersData.map(
          ({ user_id, name, email, image, stories, comments }, index) => (
            <SwiperSlide key={index}>
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

        <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full disabled:cursor-not-allowed disabled:opacity-35 ">
          <MdOutlineArrowBackIos />
        </button>
        <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full  disabled:cursor-not-allowed disabled:opacity-35">
          <MdOutlineArrowForwardIos />
        </button>
      </Swiper>
    );
  };

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[60vh]">
        <div className="relative flex items-center justify-center p-0 md:p-12 bg-white border rounded-lg">
          {renderActiveUsersContent()}
        </div>

        <div className="relative bg-white border rounded-lg p-3">
          {renderUsersCountContent()}
        </div>
      </div>

      <div className="mt-12">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
