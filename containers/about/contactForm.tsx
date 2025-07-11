"use client";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import TextArea from "@/components/UI/inputs/textArea";
import Heading from "@/components/UI/typography/heading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import { BsSendFill } from "react-icons/bs";
import { ContactFormSchema } from "@/utils/validators";

const initialValues = {
  title: "",
  details: "",
};

const ContactForm = () => {
  return (
    <div className="relative cards-grid-2 gap-10 min-h-[30vh] mt-32">
      <div className="flex flex-col gap-4">
        <Heading
          title=""
          highLightText="تواصل معنا"
          highlightColor="before:bg-blueColor"
          className="z-10"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={ContactFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              // 👇 Send updated form data with uploaded image URL
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/users/update`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ ...values }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                console.log("User details updated:", data);
                window.location.reload();
              } else {
                console.error("Failed to update user details:", data.error);
              }
            } catch (error) {
              console.error("Error updating user details:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="relative flex flex-col gap-4">
              {/* name Field */}
              <div>
                <Field
                  name="title"
                  type="text"
                  as={Input}
                  placeholder="عنوان الرسالة"
                  className={`focus:!border-blueColor !bg-white`}
                  aria-label="عنوان الرسالة"
                  required={false}
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              {/* phone number Field */}
              <div>
                <Field
                  required={false}
                  name="details"
                  as={TextArea}
                  type="text"
                  placeholder="تفاصيل الرسالة.."
                  className={`focus:!border-blueColor bg-white border`}
                  aria-label="تفاصيل الرسالة.."
                  aria-invalid={!!errors.details}
                />

                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              <div className="lg:w-1/3 md:w-1/2 w-full">
                <Button
                  title={"إرسال"}
                  type="submit"
                  className="bg-blueColor text-white "
                  disabled={isSubmitting}
                  hasShiningBar={false}
                  loading={isSubmitting}
                  icon={<BsSendFill />}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex items-center justify-center">
        <Image
          alt="صورة تواصل معنا"
          src={"/email.svg"}
          width={420}
          height={420}
        />
      </div>
    </div>
  );
};

export default ContactForm;
