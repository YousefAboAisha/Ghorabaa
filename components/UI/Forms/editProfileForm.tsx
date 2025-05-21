"use client";
import React from "react";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { BsSend } from "react-icons/bs";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdNumbers } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa";

type EditProfileFormProps = {
  data: {
    name: string;
    phone_number: string;
    id_number: string;
  };
};

const EditProfileForm = ({ data }: EditProfileFormProps) => {
  const { name, phone_number, id_number } = data;
  const initialValues = {
    name: name || "",
    phone_number: phone_number || "",
    id_number: id_number || "",
  };

  // Updated validationSchema to include image validation (optional)
  const validationSchema = Yup.object({
    name: Yup.string().required("يرجى كتابة الاسم"),

    phone_number: Yup.string()
      .matches(
        /^(059|056)\d{7}$/,
        "رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 059 أو 056"
      )
      .required("يُرجى إضافة رقم الهاتف"),

    id_number: Yup.string()
      .matches(/^\d{9}$/, "رقم الهوية يجب أن يتكون من 9 أرقام")
      .required("يُرجى إضافة رقم الهوية"),
  });

  return (
    <div className="relative w-full p-4">
      <h2 className="text-xl font-semibold">تعديل البيانات</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {  setSubmitting }) => {
          try {
            const response = await fetch("/api/user/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
              credentials: "include", // 👈 THIS IS CRITICAL
            });

            const data = await response.json();

            if (response.ok) {
              console.log("User details updated:", data);
              window.location.reload();
            } else {
              console.error("Failed to add User details:", data.error);
            }
          } catch (error) {
            console.error("Error updating User details:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="relative mt-6 flex flex-col gap-4">
            {/* Notes Field */}
            <div>
              <Field
                required={false}
                name="name"
                as={Input}
                type="text"
                placeholder="اسم المستخدم"
                className={`focus:border-primary bg-white border`}
                aria-label="اسم المستخدم"
                aria-invalid={!!errors.name}
                icon={<FaUser />}
              />

              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            <div>
              <Field
                required={false}
                name="phone_number"
                as={Input}
                type="tel"
                placeholder="رقم الهاتف"
                className={`focus:border-primary bg-white border`}
                aria-label="رقم الهاتف"
                aria-invalid={!!errors.phone_number}
                icon={<FaPhone />}
                style={{
                  direction: "rtl",
                }}
              />

              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            <div>
              <Field
                required={false}
                name="id_number"
                as={Input}
                type="tel"
                placeholder="رقم الهوية"
                className={`focus:border-primary bg-white border`}
                aria-label="رقم الهوية"
                aria-invalid={!!errors.id_number}
                icon={<MdNumbers size={20} />}
                style={{
                  direction: "rtl",
                }}
              />

              <ErrorMessage
                name="id_number"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            <div className="w-full md:w-6/12 lg:w-4/12 mt-2">
              <Button
                title={"تأكيد"}
                type="submit"
                className="bg-primary text-white"
                disabled={isSubmitting}
                hasShiningBar={false}
                icon={<BsSend />}
                loading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
