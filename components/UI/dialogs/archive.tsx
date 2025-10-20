import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ContentType } from "@/app/enums";

type Props = {
  content_type: ContentType;
  content_id: string;
  content_title: string;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ArchiveDialog = ({
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
      case ContentType.MASSACRE:
        return `/admin/massacres/status/archive/${content_id}`;

      case ContentType.EVENT:
        return `/admin/events/status/archive/${content_id}`;

      case ContentType.MISSING:
        return `/admin/missings/status/archive/${content_id}`;
    }
  };

  const ArchiveDialogHandler = async () => {
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
        let errorMsg = "حدث خطأ أثناء أرشفة المحتوى";
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
      toast.success("تمت أرشفة المحتوى بنجاح");
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
        <h2 className="text-xl font-bold">أرشفة المحتوى</h2>/
        <p className="text-[12px]">{content_title}</p>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في أرشفة هذا المحتوى؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="أرشفة الآن"
          className="bg-rejected text-white"
          loading={loading}
          onClick={() => ArchiveDialogHandler()}
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

export default ArchiveDialog;
