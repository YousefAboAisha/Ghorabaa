"use client";
import { StoryStatus } from "@/app/enums";
import { UserInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import { dateConversion } from "@/utils/format";
import { StoryPreviewValidationSchema } from "@/utils/validators";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

type EditUserProps = {
  data: UserInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditUser = ({ data, refetchData, setIsOpen }: EditUserProps) => {
  const initialValues = {
    bio: "",
    city: "",
    neighborhood: "",
  };

  return (
    <div className="relative p-8 flex flex-col gap-2">
      <Image
        src={data?.image || "/notFound.png"}
        alt="صورة الشهيد"
        width={90}
        height={90}
        className="mx-auto z-[10] max-h-[60vh] object-cover rounded-full shadow-xl"
        priority
        quality={100}
      />

      <div className="flex items-center flex-wrap gap-2 font-light text-[12px] mt-1">
        <p>بواسطة: </p>
        <p>{data?.name}</p>
        <p> | </p>
        <p>{dateConversion(data?.createdAt)}</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="font-semibold">{data?.name}</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={StoryPreviewValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/story/status/approve`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    credential: "include",
                  },
                  body: JSON.stringify({
                    ...values,
                    status: StoryStatus.APPROVED,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to update the story.");
              }

              const result = await res.json();
              console.log("✅ Story updated:", result);
              setIsOpen(false); // Close the preview modal
              refetchData?.(); // Refetch the data after successful update
              toast.success("تم تحديث ونشر القصة بنجاح!");
              // Optionally show a toast or redirect
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    title="تعديل البيانات"
                    className="bg-primary text-white"
                    disabled={isSubmitting}
                    icon={<FiEdit size={18} />}
                    loading={isSubmitting}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
