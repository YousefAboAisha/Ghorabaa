"use client";
import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ContentType } from "@/app/enums";

type Props = {
  content_id: string;
  content_title: string;
  content_type: ContentType;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ApproveDialog = ({
  content_id,
  content_title,
  refetchData,
  setIsOpen,
  setLoading,
  loading,
  content_type,
}: Props) => {
  const getContentRoute = (type: ContentType) => {
    switch (type) {
      case ContentType.STORY:
        return `/admin/stories/status/approve/${content_id}`;

      case ContentType.MASSACRE:
        return `/admin/massacres/status/approve/${content_id}`;

      case ContentType.EVENT:
        return `/admin/events/status/approve/${content_id}`;

      case ContentType.MISSING:
        return `/admin/missings/status/approve/${content_id}`;
    }
  };

  const ApproveHandler = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${getContentRoute(
          content_type
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ غير متوقع!";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }

        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      setIsOpen(false); // Close the modal
      refetchData?.(); // Refetch data
      toast.success("تمت الموافقة على المحتوى ونشره");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("❌ Error while approving content:", error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">قبول المحتوى</h2>/
        <p className="text-[12px]">{content_title}</p>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في قبول هذا المحتوى ؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="قبول الآن"
          className="bg-approved text-white"
          loading={loading}
          onClick={() => ApproveHandler()}
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

export default ApproveDialog;
