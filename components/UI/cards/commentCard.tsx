"use client";
import { CommentInterface } from "@/app/interfaces";
import { dateConversion } from "@/utils/format";
import { getRoleInArabic } from "@/utils/text";
import Image from "next/image";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Modal from "../modals/modal";
import DeleteComment from "../modals/deleteComment";
import { Session } from "next-auth";
import { Role } from "@/app/enums";
import { MdOutlineReport } from "react-icons/md";
import ReportComment from "../modals/reportComment";

type CommentCardProps = {
  data: CommentInterface;
  session: Session | null;
  refetchData?: () => void;
  showActionButtons?: boolean;
};

const CommentCard = ({
  data,
  refetchData,
  session,
  showActionButtons = false,
}: CommentCardProps) => {
  const { author_id, author_image, author_name, text, createdAt, author_role } =
    data;

  const current_user_id = session?.user.id;
  const current_user_role = session?.user.role;

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenDeleteComment, setIsOpenDeleteComment] =
    useState<boolean>(false);

  const [isOpenReportComment, setIsOpenReportComment] =
    useState<boolean>(false);

  console.log("author_id", author_id);
  console.log("user_id", current_user_id);

  const isCommentOwner = author_id === current_user_id;
  const isAdmin = current_user_role === Role.ADMIN;

  return (
    <>
      <div className="group relative flex flex-col gap-4 p-5 rounded-3xl rounded-tr-none border bg-white shadow-sm w-full h-fit hover:shadow-md duration-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-full">
            {author_image ? (
              <Image
                src={author_image}
                width={45}
                height={45}
                alt="صورة الملف الشخصي للمعلق"
                className="rounded-full"
              />
            ) : (
              <div className="p-8">
                <FaUserCircle size={14} className="mx-auto text-gray_dark" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-[13px] font-semibold">{author_name}</h5>
            <p className="text-primary text-[10px] font-semibold">
              {getRoleInArabic(author_role!)}
            </p>
          </div>
        </div>

        <p className="text-[14px] mb-4 text-wrap font-light">{text}</p>

        <p className="text-gray-500 text-[11px] absolute bottom-2 left-6">
          {createdAt ? dateConversion(createdAt) : "تاريخ غير متوفر"}
        </p>

        {showActionButtons && (
          <div className="absolute top-2 left-2 flex flex-col gap-0.5">
            {(isCommentOwner || isAdmin) && (
              <div
                onClick={() => setIsOpenDeleteComment(true)}
                title="حذف التعليق"
                className="opacity-0 group-hover:opacity-100 items-center justify-center p-2 text-[red] hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <BsTrash size={17} />
              </div>
            )}

            {session && (
              <div
                onClick={() => setIsOpenReportComment(true)}
                title="إبلاغ عن التعليق"
                className="opacity-0 group-hover:opacity-100 items-center justify-center p-2 text-gray_dark hover:bg-gray_light duration-200 rounded-full cursor-pointer"
              >
                <MdOutlineReport size={17} />
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpenDeleteComment}
        setIsOpen={setIsOpenDeleteComment}
        loading={loading}
        containerClassName="lg:w-[440px]"
      >
        <DeleteComment
          refetchData={refetchData!}
          setIsOpen={setIsOpenDeleteComment}
          setLoading={setLoading}
          loading={loading}
          data={data}
        />
      </Modal>

      <Modal
        isOpen={isOpenReportComment}
        setIsOpen={setIsOpenReportComment}
        loading={loading}
        containerClassName="lg:w-[33%]"
      >
        <ReportComment
          setIsOpen={setIsOpenReportComment}
          setLoading={setLoading}
          loading={loading}
          data={data}
        />
      </Modal>
    </>
  );
};

export default CommentCard;
