import Image from "next/image";
import Link from "next/link";
import { BsEye, BsTrash } from "react-icons/bs";
import { StoryInterface } from "@/app/interfaces";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FavoriteCardProps = {
  data?: StoryInterface;
  refetchData?: () => void;
};

const FavoriteCard = ({ data, refetchData }: FavoriteCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const removeFromFavorites = async (story_id: string) => {
    try {
      setLoading(true);

      const res = await fetch("/api/story/updateFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for NextAuth session cookies
        body: JSON.stringify({
          story_id: story_id,
          isFavorite: false, // Toggle the current value
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server responded with an error:", data.message);
        return; // Optional: show toast or error message to user
      }

      if (refetchData) refetchData();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group mt-4">
      <div
        title="عرض الملف الشخصي"
        className="relative group w-full flex flex-col border rounded-3xl overflow-hidden duration-700"
      >
        <div className="relative h-[350px]">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة الشهيد"
            className="w-full rounded-3xl object-cover h-full"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 absolute bottom-0 group-hover:opacity-100 opacity-0 duration-300 left-0 w-full h-full p-6 text-white bg-[#00000084]">
          <div className="flex flex-col items-center gap-2 font-semibold text-md">
            <p>الشهيد</p>
            <p className="truncate flex">{data?.name}</p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 w-full absolute bottom-4">
            <Link
              title="عرض الملف الشخصي للشهيد"
              href={`/stories/${data?._id}`}
              className="flex items-center justify-center rounded-xl border border-gray_light shadow-sm p-3 "
            >
              <BsEye className="text-white" size={20} />
            </Link>

            <div
              title="إزالة من القصص المحفوظة"
              className="flex items-center justify-center rounded-xl border border-gray_light shadow-sm p-3 cursor-pointer "
              onClick={() => removeFromFavorites(data?._id as string)}
            >
              {loading ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                <BsTrash className="text-red-600" size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
