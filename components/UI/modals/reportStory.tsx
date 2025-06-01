import React, { Dispatch, SetStateAction } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextArea from "../inputs/textArea";
import { StoryInterface } from "@/app/interfaces";
import Select from "../inputs/selectInput";
import { ReportReasonsData } from "@/data/reportReasonsData";
import { ReportValidationSchema } from "@/utils/validators";

type ReportStoryProps = {
  data: StoryInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const ReportStory = ({ setIsOpen, data }: ReportStoryProps) => {
  const story_id = data._id;
  const story_title = data.name;

  const initialValues = {
    rejectReason: "",
    rejectDetails: "",
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-4">
        <BiInfoCircle size={25} />
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold min-w-fit">إبلاغ عن القصة</h2>

          <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
            الشهيد/ {story_title || "عنوان القصة غير معرّف"}
          </p>
        </div>
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
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/report/create`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  story_id,
                  rejectReason: values.rejectReason,
                  rejectDetails: values.rejectDetails,
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
            toast.warn("تم إرسال الإبلاغ بنجاح");
          } catch (error) {
            console.error("❌ Error updating story:", error);
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

                {/* Word Counter */}
                <div className="flex justify-between mt-1">
                  <ErrorMessage
                    name="rejectDetails"
                    component="div"
                    className="text-red-500 font-semibold text-[10px]"
                  />

                  <div className="text-[10px] text-gray-500 self-end">
                    عدد الكلمات:{" "}
                    {values.rejectDetails?.trim().split(/\s+/).filter(Boolean)
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

export default ReportStory;
