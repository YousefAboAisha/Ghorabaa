import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { getFullName } from "@/utils/text";
import { ContentType } from "@/app/enums";

type Props = {
  content_type: ContentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  callback?: () => void;
};

export const DeleteDaialog = ({
  data,
  setIsOpen,
  setLoading,
  loading,
  callback,
  content_type,
}: Props) => {
  const content_id = data?._id;
  const content_title =
    content_type === ContentType.STORY ? getFullName(data?.title) : data?.title;

  const getContentRoute = (type: ContentType) => {
    switch (type) {
      case ContentType.STORY:
        return `/admin/stories/delete/${content_id}`;
      case ContentType.MASSACRE:
        return `/admin/massacres/status/delete/${content_id}`;
      case ContentType.EVENT:
        return `/admin/events/status/delete/${content_id}`;
      case ContentType.COMMENT:
        return `/admin/comments/delete/${content_id}`;
      default:
        return ""; // or handle unexpected types
    }
  };

  const DeleteDaialog = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${getContentRoute(
          content_type
        )}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the content.");
      }

      const result = await response.json();
      console.log("✅ Content updated:", result);
      setIsOpen(false); // Close the preview modal
      setLoading(false);
      if (typeof callback === "function") {
        callback(); // Call the callback function if provided
      }
      toast.success("تم حذف المحتوى بنجاح!");
    } catch (error) {
      console.error("❌ Error updating content:", error);
      toast.error("حدث خطأ أثناء حذف المحتوى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold min-w-fit">حذف المحتوى</h2>

          <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
            / {content_title || "عنوان المحتوى غير معرّف"}
          </p>
        </div>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في حذف هذا المحتوى؟
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Button
          title="حذف الآن"
          className="bg-rejected text-white"
          loading={loading}
          onClick={() => DeleteDaialog()}
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

export default DeleteDaialog;
