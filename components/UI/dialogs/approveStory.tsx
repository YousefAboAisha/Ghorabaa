"use client";
import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { StoryInterface } from "@/app/interfaces";
import { getFullName } from "@/utils/text";

type Props = {
  data: StoryInterface & { publisher_name: string };
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ApproveStory = ({
  data,
  refetchData,
  setIsOpen,
  setLoading,
  loading,
}: Props) => {
  console.log("[ApproveStory] data:", data);

  const story_id = data?._id;
  const fullName = data?.name ? getFullName(data.name) : "غير معروف";

  const ApproveStoryHandler = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stories/status/approve/${story_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء قبول القصة";
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
      console.log("✅ massacre approved:", result);

      setIsOpen(false); // Close the modal
      refetchData?.(); // Refetch data
      toast.success("تم قبول طلب إضافة القصة");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("❌ Error approving massacre:", error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">قبول القصة</h2>/
        <p className="text-[12px]">{fullName}</p>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في قبول هذا القصة ؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="قبول الآن"
          className="bg-primary text-white"
          loading={loading}
          onClick={() => ApproveStoryHandler()}
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

export default ApproveStory;
