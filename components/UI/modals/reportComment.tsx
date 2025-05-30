import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { StoryRejectValidationSchema } from "@/utils/validators";
import TextArea from "../inputs/textArea";
import { CommentInterface } from "@/app/interfaces";

type ReportCommentProps = {
  data: CommentInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ReportComment = ({ setIsOpen, data }: ReportCommentProps) => {
  const comment_id = data._id;

  const initialValues = {
    rejectReason: "",
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">إبلاغ عن التعليق</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6 text-[15px]">
        هل أنت متأكد من رغبتك في حذف هذا التعليق؟
      </p>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={StoryRejectValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comment/report/${comment_id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  rejectReason: values.rejectReason,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update the story.");
            }

            const result = await response.json();
            console.log("✅ Story updated:", result);
            resetForm();
            setIsOpen(false);
            toast.warn("تم رفض طلب إضافة القصة");
          } catch (error) {
            console.error("❌ Error updating story:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, values }) => {
          console.log("Errors:", errors);
          console.log("Form Values", values);

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
                title="إبلاغ الآن"
                className="bg-[red] mt-4"
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

export default ReportComment;
