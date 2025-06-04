"use client";
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

  const toggleFavorite = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/updateFavorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for NextAuth session cookies
        body: JSON.stringify({
          story_id,
          isFavorite: !favorited, // Toggle the current value
        }),
      });

      const data = await res.json();
      console.log("Favorite Response data", data);
      const isFavorited = data.favorited;

      if (!res.ok) {
        console.error("Server responded with an error:", data.message);
        toast.error("حدث خطأ أثناء إضافة القصة إلى المحفوظات");
        return; // Optional: show toast or error message to user
      }
      setFavorited(isFavorited);
      if (isFavorited) {
        toast.success("تمت إضافة القصة إلى قائمة المحفوظات");
      } else {
        toast.warn("تمت إزالة القصة من قائمة المحفوظات");
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
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
