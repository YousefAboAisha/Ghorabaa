"use client";
import { StoryInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import TextArea from "@/components/UI/inputs/textArea";
import { useStatisticsStore } from "@/stores/storiesTableStore";
import { getFullName } from "@/utils/text";
import { StoryRejectValidationSchema } from "@/utils/validators";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";

type RejectDialogProps = {
  data: StoryInterface & { publisher_name: string };
  refetchData: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const RejectDialog = ({
  data,
  refetchData,
  setIsOpen,
  setLoading,
}: RejectDialogProps) => {
  const { fetchStatistics } = useStatisticsStore();
  const story_id = data?._id;

  const fullName = getFullName(data?.title);

  const initialValues = {
    rejectReason: "",
  };

  return (
    <div className="relative flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">رفض القصة</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px] font-light">
        سيترتب على هذا الإجراء رفض طلب إضافة قصة الشهيد{" "}
        <span className="inline text-rejected font-semibold">{fullName}</span>{" "}
        المقدمة من قِبل المستخدم{" "}
        <span className="font-semibold inline">{data?.publisher_name}</span>. هل
        أنت متأكد من رغبتك في المتابعة؟
      </p>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={StoryRejectValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setLoading(true); // Set loading state to true

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stories/status/reject/${story_id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  rejectReason: values.rejectReason,
                }),
              }
            );

            if (!response.ok) {
              setLoading(false); // Reset loading state
              throw new Error("Failed to update the story.");
            }

            resetForm(); // ✅ Clear form values
            setIsOpen(false); // Close the preview modal
            refetchData?.(); // Refetch the data after successful update
            fetchStatistics();
            toast.warn("تم رفض طلب إضافة القصة");
          } catch (error) {
            setLoading(false); // Reset loading state
            console.error("❌ Error updating story:", error);
          } finally {
            setSubmitting(false);
            setLoading(false); // Reset loading state
          }
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <Form className="flex flex-col gap-4 mt-6">
              {/* Notes Field with Word Counter */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="rejectReason"
                  as={TextArea}
                  placeholder="قم بكتابة سبب الرفض"
                  label="سبب الرفض"
                  className={`w-full focus:border-primary text-sm font-light`}
                />

                {/* Word Counter */}
                <div className="flex justify-between mt-1">
                  <ErrorMessage
                    name="rejectReason"
                    component="div"
                    className="text-red-500 font-semibold text-[10px]"
                  />

                  <div className="text-[10px] text-gray-500 self-end">
                    عدد الكلمات:{" "}
                    {values.rejectReason?.trim().split(/\s+/).filter(Boolean)
                      .length || 0}{" "}
                    / 5
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                title="رفض القصة"
                className="bg-rejected mt-4"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RejectDialog;
