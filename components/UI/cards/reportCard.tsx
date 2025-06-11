"use client";
import {
  CommentInterface,
  ReportWithUserDataInterface,
} from "@/app/interfaces";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../inputs/button";
import Link from "next/link";
import {
  getReportColor,
  getReportReasonLabel,
  getReportStatusInArabic,
} from "@/utils/text";
import { ReportStatus, Role } from "@/app/enums";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CommentPreviewCard from "../cards/commentPreviewCard";
import { dateConversion } from "@/utils/format";

type ReportCardProps = {
  data: ReportWithUserDataInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
};

const ReportCard = ({
  data,
  setIsOpen,
  refetchData,
  setLoading,
  loading,
}: ReportCardProps) => {
  console.log("Report data ", data);

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

      const result = await response.json();
      console.log("✅ Story updated:", result);
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

  const renderReportStatusContent = (status: ReportStatus) => {
    if (status == ReportStatus.PENDING) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <Button
            title="حذف المحتوى"
            onClick={() => AcceptReportHandler()}
            className="text-rejected bg-white shadow-none hover:shadow-sm !border !border-gray_light"
            icon={<FaTrash />}
            loading={loading}
          />

          <Button
            title="إبقاء المحتوى"
            className="text-approved bg-white shadow-none hover:shadow-sm !border !border-gray_light"
            icon={<FaTrash />}
            loading={loading}
          />
        </div>
      );
    }

    if (status == ReportStatus.RESOLVED) {
      return (
        <p className="text-rejected border p-2 text-[12px] rounded-md w-fit">
          تم التحقق من الإبلاغ وحذف المحتوى
        </p>
      );
    }

    if (status == ReportStatus.REJECTED) {
      return (
        <p className="text-approved border p-2 text-[12px] rounded-md w-fit">
          تم التحقق من الإبلاغ والإبقاء على المحتوى
        </p>
      );
    }
  };

  return (
    <div className="relative p-6 flex flex-col gap-2 bg-white border rounded-lg pb-10 hover:shadow-md duration-200">
      <div className="flex items-center gap-2 text-[12px] font-light mb-2">
        <p>الإبلاغ بواسطة: </p>
        <p className="font-normal">{data?.reporter_name}</p>
      </div>

      <Link
        title="الذهاب إلى التعليق"
        href={`/stories/${data?.content?.story_id}#COMMENT`}
        target="_blank"
        className="relative h-fit"
      >
        <CommentPreviewCard data={commentData as CommentInterface} />
      </Link>

      <p
        title={getReportStatusInArabic(data?.status)}
        className={`absolute top-3 left-3 w-3 h-3 text-white text-[10px] rounded-full cursor-pointer hover:shadow-md duration-200 ${getReportColor(
          data?.status
        )}`}
      ></p>

      <div className="flex flex-col gap-2">
        <div className="gap-1 text-[red] bg-red-200 w-fit p-1.5 px-2.5 rounded-md text-[12px] mt-2">
          {getReportReasonLabel(data?.reason)}
        </div>

        <p className="text-[13px] mt-2">{data?.details}</p>
      </div>

      <div className="relative mt-2">
        {data?.status == ReportStatus.PENDING && (
          <div className="flex items-center gap-2 mt-2">
            <Button
              title="حذف المحتوى"
              onClick={() => AcceptReportHandler()}
              className="text-rejected bg-white shadow-none hover:shadow-sm !border !border-gray_light"
              icon={<FaTrash />}
              loading={loading}
            />

            <Button
              title="إبقاء المحتوى"
              className="text-approved bg-white shadow-none hover:shadow-sm !border !border-gray_light"
              icon={<FaTrash />}
              loading={loading}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 px-4 py-2 flex items-center gap-2 text-[12px] font-light">
        <p className="text-[10px] text-gray_dark">
          {dateConversion(data?.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
