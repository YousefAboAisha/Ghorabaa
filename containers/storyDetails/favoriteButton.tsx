"use client";
import { useFavoriteStore } from "@/stores/favoriteStore";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

type FavoriteButtonProps = {
  story_id: string;
  initialFavorite: boolean;
};

const FavoriteButton = ({ story_id, initialFavorite }: FavoriteButtonProps) => {
  const [favorited, setFavorited] = useState(initialFavorite);
  const [loading, setLoading] = useState<boolean>(false);

  const { toggleFavorite } = useFavoriteStore();

  const handleToggle = async () => {
    if (loading) return; // Prevent multiple clicks while loading
    setLoading(true);
    await toggleFavorite(story_id, favorited, (newState) => {
      setFavorited(newState); // local state update
    });
    setLoading(false);
  };

  return (
    <div
      title={
        favorited ? "إزالة القصة من المحفوظات" : "إضافة القصة إلى المحفوظات"
      }
      className={`rounded-md flex items-center justify-center p-2 cursor-pointer border`}
      onClick={() => handleToggle()}
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
