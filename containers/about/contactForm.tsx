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
import { toast } from "react-toastify";

const initialValues = {
  title: "",
  details: "",
};

const ContactForm = () => {
  return (
    <div className="relative cards-grid-2 gap-10 min-h-[30vh] mt-32">
      <div className="flex flex-col gap-4">
        <Heading title="تواصل معنا" className="z-10" />

        <Formik
          initialValues={initialValues}
          validationSchema={ContactFormSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              // 👇 Send updated form data with uploaded image URL
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/contact/create`,
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
                toast.success("تم إرسال رسالتك بنجاح!");
                resetForm(); // Reset the form after successful submission
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
          {({ isSubmitting, errors, values }) => {
            console.log("Form Errors: ", errors);
            console.log("Form Values: ", values);

            return (
              <Form className="relative flex flex-col gap-4">
                {/* Message title Field */}
                <div>
                  <Field
                    name="title"
                    type="text"
                    as={Input}
                    placeholder="عنوان الرسالة"
                    className={`focus:!border-secondary !bg-white`}
                    aria-label="عنوان الرسالة"
                    required={false}
                  />

                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                {/* Message Details Field */}
                <div>
                  <Field
                    required={false}
                    name="details"
                    as={TextArea}
                    type="text"
                    placeholder="تفاصيل الرسالة.."
                    className={`focus:!border-secondary bg-white border`}
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
                    className="bg-secondary text-white "
                    disabled={isSubmitting}
                    hasShiningBar={false}
                    loading={isSubmitting}
                    icon={<BsSendFill />}
                  />
                </div>
              </Form>
            );
          }}
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
