import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { StoryInterface } from "@/app/interfaces";

type DeleteStory = {
  data: StoryInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const DeleteStory = ({
  data,
  setIsOpen,
  setLoading,
  loading,
}: DeleteStory) => {
  const story_id = data._id;
  const story_title = data.name;

  const deleteStory = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stories/delete/${story_id}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the story.");
      }

      const result = await response.json();
      console.log("✅ Story updated:", result);
      setIsOpen(false); // Close the preview modal
      setLoading(false);
      toast.success("تم حذف القصة بنجاح!");

      setTimeout(() => {
        window.location.href = "/stories"; // Redirect to the stories page
      }, 1000); // Reload the page after a short delay
    } catch (error) {
      console.error("❌ Error updating story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold min-w-fit">حذف القصة</h2>

          <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
            الشهيد/ {story_title || "عنوان القصة غير معرّف"}
          </p>
        </div>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في حذف هذا التعليق؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="حذف الآن"
          className="bg-[red] text-white"
          loading={loading}
          onClick={() => deleteStory()}
          disabled={loading}
        />

        <Button
          onClick={() => setIsOpen(false)}
          title="إلغاء الأمر"
          className="!bg-transparent !border-gray_dark !text-secondary !shadow-none hover:shadow-md"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default DeleteStory;
