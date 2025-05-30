import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { CommentInterface } from "@/app/interfaces";

type DeleteCommentProps = {
  data: CommentInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const DeleteComment = ({
  data,
  refetchData,
  setIsOpen,
  setLoading,
  loading,
}: DeleteCommentProps) => {
  const comment_id = data._id;

  const deleteCommentHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comment/delete/${comment_id}`,
        {
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
      refetchData?.(); // Refetch the data after successful update
      toast.warn("تم حذف التعليق بنجاح!");
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
        <h2 className="text-xl font-bold">حذف التعليق</h2>
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
          onClick={() => deleteCommentHandler()}
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

export default DeleteComment;
