"use client";
import { useFavoriteStore } from "@/stores/favoriteStore";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { toast } from "react-toastify";

type FavoriteButtonProps = {
  story_id: string;
  initialFavorite: boolean;
};

const FavoriteButton = ({ story_id, initialFavorite }: FavoriteButtonProps) => {
  const [favorited, setFavorited] = useState(initialFavorite);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchAndUpdateCount } = useFavoriteStore();

  const toggleFavorite = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/updateFavorite/${story_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Required for NextAuth session cookies
          body: JSON.stringify({
            isFavorite: !favorited, // Toggle the current value
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        const errorMsg =
          data?.message || "حدث خطأ أثناء إضافة القصة إلى المحفوظات";
        console.error("Server responded with an error:", errorMsg);
        toast.error(errorMsg);
        return;
      }

      console.log("Favorite Response data", data);
      const isFavorited = data.favorited;

      setFavorited(isFavorited);
      fetchAndUpdateCount();

      if (isFavorited) {
        toast.success("تمت إضافة القصة إلى قائمة المحفوظات");
      } else {
        toast.warn("تمت إزالة القصة من قائمة المحفوظات");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث حالة القصة";
      console.error("Failed to toggle favorite:", error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      title={
        favorited ? "إزالة القصة من المحفوظات" : "إضافة القصة إلى المحفوظات"
      }
      className={`rounded-md flex items-center justify-center p-2 cursor-pointer border`}
      onClick={() => toggleFavorite()}
    >
      {loading ? (
        <AiOutlineLoading3Quarters size={21} className="animate-spin" />
      ) : (
        <BsBookmark size={21} className={`${favorited && "text-red-600"}`} />
      )}
    </div>
  );
};

export default FavoriteButton;
