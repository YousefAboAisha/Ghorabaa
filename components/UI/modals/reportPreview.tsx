"use client";
import {
  CommentInterface,
  ReportWithUserDataInterface,
} from "@/app/interfaces";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../inputs/button";
import Link from "next/link";
import { getReportReasonLabel } from "@/utils/text";
import { Role } from "@/app/enums";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CommentPreviewCard from "../cards/commentPreviewCard";

type ReportPreviewProps = {
  data: ReportWithUserDataInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
};

const ReportPreview = ({
  data,
  setIsOpen,
  refetchData,
  setLoading,
  loading,
}: ReportPreviewProps) => {
  const commentData = {
    author_id: data?.user_id,
    author_image: data?.reported_user_image || "/notFound.png",
    author_name: data?.reported_user_name || "مستخدم غير معروف",
    text: data?.content?.text || "تعليق غير متوفر",
    author_role: data?.reported_user_role as Role,
    createdAt: new Date(data?.createdAt),
  };

  const AcceptReportHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/accept/${data?._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the story.");
      }

      setIsOpen(false); // Close the preview modal
      setLoading(false);
      refetchData?.(); // Refetch the data after successful update
      toast.warn("تم حذف المحتوى بنجاح!");
    } catch (error) {
      console.error("❌ Error updating story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 flex flex-col gap-2 bg-white">
      <Link
        title="الذهاب إلى التعليق"
        href={`/stories/${data?.content?.story_id}#COMMENT`}
        target="_blank"
        className="relative h-fit"
      >
        <CommentPreviewCard data={commentData as CommentInterface} />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="gap-1 text-rejected bg-red-200 w-fit p-1.5 px-2.5 rounded-md text-[12px] mt-2">
          {getReportReasonLabel(data?.reason)}
        </div>

        <p className="text-sm mt-2">{data?.details}</p>
      </div>

      <div className="mt-2">
        <Button
          title="حذف المحتوى"
          onClick={() => AcceptReportHandler()}
          className="bg-rejected text-white"
          icon={<FaTrash />}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ReportPreview;
