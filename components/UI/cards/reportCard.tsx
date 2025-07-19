"use client";
import {
  CommentInterface,
  ReportWithUserDataInterface,
} from "@/app/interfaces";
import React, { useState } from "react";
import Button from "../inputs/button";
import Link from "next/link";
import {
  getReportColor,
  getReportReasonLabel,
  getReportStatusInArabic,
} from "@/utils/text";
import { ReportStatus, Role } from "@/app/enums";
import CommentPreviewCard from "../cards/commentPreviewCard";
import { dateConversion } from "@/utils/format";
import Modal from "../modals/modal";
import { DeleteReport } from "../modals/deleteReport";

type ReportCardProps = {
  data: ReportWithUserDataInterface;
  refetchData?: () => void;
};

const ReportCard = ({ data, refetchData }: ReportCardProps) => {
  const [isOpenReportAction, setIsOpenReportAction] = useState<boolean>(false);

  console.log("Report data ", data);

  const commentData = {
    author_id: data?.content.author_id,
    story_id: data?.content.story_id,
    author_image: data?.reported_user_image || "/notFound.png",
    author_name: data?.reported_user_name || "مستخدم غير معروف",
    text: data?.content?.text || "تعليق غير متوفر",
    author_role: data?.reported_user_role as Role,
    createdAt: new Date(data?.createdAt),
  };

  return (
    <>
      <div className="relative p-6 flex flex-col gap-2 bg-white border rounded-lg pb-8 hover:shadow-md duration-200 h-fit">
        <div className="flex items-center justify-between gap-1 text-[12px] font-light mb-2">
          <div className="flex gap-1 items-center flex-wrap">
            <p className="inline-block min-w-fit">الإبلاغ بواسطة: </p>
            <Link
              href={`/profile/${data?.user_id}`}
              className="font-normal inline-block hover:underline min-w-fit"
            >
              {data?.reporter_name}
            </Link>
          </div>

          <p
            title={getReportStatusInArabic(data?.status)}
            className={`min-w-fit p-1.5 px-2 text-white text-[10px] rounded-md ${getReportColor(
              data?.status
            )}`}
          >
            {getReportStatusInArabic(data?.status)}
          </p>
        </div>

        <CommentPreviewCard data={commentData as CommentInterface} />

        <div className="flex flex-col gap-2">
          <div className="gap-1 text-rejected bg-red-200 w-fit p-1.5 px-2.5 rounded-md text-[12px] mt-2">
            {getReportReasonLabel(data?.reason)}
          </div>

          <p className="text-[13px] mt-2">{data?.details}</p>
        </div>

        <div className="relative mt-2">
          {data?.status == ReportStatus.PENDING && (
            <Button
              onClick={() => setIsOpenReportAction(true)}
              title="مراجعة الإبلاغ"
              className="bg-secondary shadow-none hover:shadow-md !border !border-gray_dark"
            />
          )}
        </div>

        <div className="absolute bottom-0 right-0 px-4 py-2 flex items-center gap-2 text-[12px] font-light">
          <p className="text-[10px] text-gray_dark">
            {dateConversion(data?.createdAt)}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isOpenReportAction}
        setIsOpen={setIsOpenReportAction}
        containerClassName="lg:w-[30%]"
      >
        <DeleteReport
          data={data}
          setIsOpen={setIsOpenReportAction}
          refetchData={refetchData}
        />
      </Modal>
    </>
  );
};

export default ReportCard;
