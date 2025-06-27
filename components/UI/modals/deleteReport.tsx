import React, { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ReportInterface } from "@/app/interfaces";
import { FaTrash } from "react-icons/fa";

type AcceptReportProps = {
  data: ReportInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteReport = ({
  data,
  refetchData,
  setIsOpen,
}: AcceptReportProps) => {
  const report_id = data?._id;
  const content_id = data?.content_id;

  const [keepLoading, setKeepLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteReportHandler = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/delete/${report_id}`,
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
      setDeleteLoading(false);
      refetchData?.(); // Refetch the data after successful update
      toast.warn("تم حذف المحتوى بنجاح!");
    } catch (error) {
      console.error("❌ Error updating story:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const KeepContentHandler = async () => {
    setKeepLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/keep/${report_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("فشل أثناء تحديث حالة الإبلاغ");
      }

      const result = await response.json();
      console.log("✅ Story updated:", result);
      setIsOpen(false); // Close the preview modal
      setKeepLoading(false);
      refetchData?.(); // Refetch the data after successful update
      toast.warn("تم الإبقاء على المحتوى!");
    } catch (error) {
      console.error("❌ Error updating story:", error);
    } finally {
      setKeepLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">تأكيد إجراء الإبلاغ</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        إذا قمت بقبول الإبلاغ، فسيتم حذف المحتوى المُبلّغ عنه نهائيًا. هل أنت
        متأكد من رغبتك في المتابعة؟
      </p>

      <div className="flex items-center gap-2 mt-6">
        <Button
          disabled={keepLoading || deleteLoading}
          onClick={() => KeepContentHandler()}
          title="إبقاء المحتوى"
          className="bg-approved text-white"
          loading={keepLoading}
        />

        <Button
          disabled={keepLoading || deleteLoading}
          title="حذف المحتوى"
          onClick={() => deleteReportHandler()}
          className="!bg-rejected text-white"
          icon={<FaTrash />}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
};

export default DeleteReport;
