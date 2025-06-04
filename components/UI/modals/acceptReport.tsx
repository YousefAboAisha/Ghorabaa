import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ReportInterface } from "@/app/interfaces";

type AcceptReportProps = {
  data: ReportInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const AcceptReport = ({
  data,
  refetchData,
  setIsOpen,
  setLoading,
  loading,
}: AcceptReportProps) => {
  const report_id = data?._id;
  const content_id = data?.content._id;

  const AcceptReportHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/accept/${report_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content_id,
          }),
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

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">قبول الإبلاغ</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        سيؤدي قبول الإبلاغ إلى حذف المحتوى المحدد، هل تريد الاستمرار في الإجراء؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="حذف المحتوى"
          className="bg-[red] text-white"
          loading={loading}
          onClick={() => AcceptReportHandler()}
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

export default AcceptReport;
