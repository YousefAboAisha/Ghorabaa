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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comments/delete/${comment_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء حذف التعليق";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }

        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      const result = await res.json();
      console.log("✅ Comment deleted:", result);

      setIsOpen(false); // Close the modal
      refetchData?.(); // Refetch data
      toast.warn("تم حذف التعليق بنجاح!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("❌ Error deleting comment:", error);
      toast.error(message);
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
          className="bg-rejected text-white"
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
