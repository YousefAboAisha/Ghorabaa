import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextArea from "../inputs/textArea";
import { CommentInterface } from "@/app/interfaces";
import Select from "../inputs/selectInput";
import { ReportReasonsData } from "@/data/reportReasonsData";
import { ReportValidationSchema } from "@/utils/validators";

type ReportCommentProps = {
  data: CommentInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ReportComment = ({ setIsOpen, data }: ReportCommentProps) => {
  const comment_id = data?._id;

  const initialValues = {
    rejectReason: "",
    rejectDetails: "",
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">إبلاغ عن التعليق</h2>
      </div>

      <hr className="mt-4" />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={ReportValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log("Submitting report with values:", values);

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/reports/create`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  comment_id,
                  rejectReason: values.rejectReason,
                  rejectDetails: values.rejectDetails,
                }),
              }
            );

            if (!res.ok) {
              let errorMsg = "حدث خطأ أثناء جلب البيانات";
              try {
                const errorResponse = await res.json();
                errorMsg = errorResponse?.error || errorMsg;
              } catch {
                errorMsg = res.statusText || errorMsg;
              }

              throw new Error(errorMsg);
            }

            const result = await res.json();
            console.log("✅ Story updated:", result);
            resetForm();
            setIsOpen(false);
            toast.warn("تم إرسال البلاغ بنجاح");
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            toast.error(message);
            console.error("Error fetching favorite stories:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          console.log("Errors:", errors);
          console.log("Form Values", values);

          return (
            <Form className="flex flex-col gap-4 mt-6">
              <div>
                <Select
                  name="rejectReason"
                  disabled={isSubmitting}
                  title="قم باختيار سبب الإبلاغ..."
                  options={ReportReasonsData}
                  label="سبب الإبلاغ"
                  onChange={(e) =>
                    setFieldValue("rejectReason", e.target.value)
                  }
                  className={`focus:border-primary`}
                />
                <ErrorMessage
                  name="rejectReason"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              {/* Notes Field with Word Counter */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="rejectDetails"
                  as={TextArea}
                  placeholder="مزيد من التفاصيل حول سبب الرفض (اختياري)"
                  label="تفاصيل إضافية (اختياري)"
                  className={`w-full focus:border-primary text-[13px] font-light`}
                />
              </div>

              <Button
                type="submit"
                title="إبلاغ الآن"
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

export default ReportComment;
