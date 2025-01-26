"use client";
import React, { useState } from "react";
import { BiIdCard, BiLock, BiSend, BiUser } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowDown, FiSend } from "react-icons/fi";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import TextArea from "@/components/UI/inputs/textArea";

const AddMartyer = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setFormErrors("");

    try {
      const response = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, rememberMe }),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Sign in Error:", data.error);
        return;
      }

      // Show success toast
      toast.success("تم تسجيل الدخول بنجاح!");

      // Redirect to profile after a short delay
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);

      console.log("User has been created successfully!", data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message);
      toast.error("حدث خطأ أثناء تسجيل الدخول"); // Show error toast
      console.error("Error creating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mb-14 flex items-center justify-center">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-11/12 md:w-7/12 lg:w-6/12 border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <Heading
          title="إضافة قصة"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              {/* First name Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="id_number"
                  as={Input}
                  type="text"
                  placeholder="رقم الهوية"
                  label="رقم الهوية"
                  icon={BiIdCard}
                  className={`focus:border-primary ${
                    errors.id_number && "!border-[red]"
                  }`}
                  aria-label="رقم الهوية"
                  aria-invalid={!!errors.id_number}
                />
                <ErrorMessage
                  name="id_number"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* First name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="first_name"
                    as={Input}
                    type="text"
                    placeholder="الاسم الأول"
                    label="الاسم الأول"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.first_name && "!border-[red]"
                    }`}
                    aria-label="الاسم الأول"
                    aria-invalid={!!errors.first_name}
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                {/* Last name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="father_name"
                    as={Input}
                    type="text"
                    placeholder="اسم الأب"
                    label="اسم الاب"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.father_name && "!border-[red]"
                    }`}
                    aria-label="اسم الأب"
                    aria-invalid={!!errors.father_name}
                  />
                  <ErrorMessage
                    name="father_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Grand father name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="grandFather_name"
                    as={Input}
                    type="text"
                    placeholder="اسم الجد"
                    label="اسم الجد"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.grandFather_name && "!border-[red]"
                    }`}
                    aria-label="اسم الجد"
                    aria-invalid={!!errors.grandFather_name}
                  />
                  <ErrorMessage
                    name="grandFather_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                {/* Family name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="last_name"
                    as={Input}
                    type="text"
                    placeholder="اسم العائلة"
                    label="اسم العائلة"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.last_name && "!border-[red]"
                    }`}
                    aria-label="اسم العائلة"
                    aria-invalid={!!errors.last_name}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Birth date name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="last_name"
                    as={Input}
                    type="date"
                    placeholder="تاريخ الميلاد"
                    label="تاريخ الميلاد"
                    className={`focus:border-primary ${
                      errors.last_name && "!border-[red]"
                    }`}
                    aria-label="تاريخ الميلاد"
                    aria-invalid={!!errors.last_name}
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="last_name"
                    as={Input}
                    type="date"
                    placeholder="تاريخ الاستشهاد"
                    label="تاريخ الاستشهاد"
                    className={`focus:border-primary ${
                      errors.last_name && "!border-[red]"
                    }`}
                    aria-label="تاريخ الاستشهاد"
                    aria-invalid={!!errors.last_name}
                  />
                  <ErrorMessage
                    name="death_date"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              <div>
                <Select
                  disabled={isSubmitting}
                  label="المدينة"
                  options={leasingPlansOptions}
                  title="اختر المدينة التي عاش فيها الشهيد..."
                  icon={<FiArrowDown />}
                  value={values.city}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                  className={`focus:border-primary ${
                    errors.city && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              <div>
                <Select
                  disabled={isSubmitting}
                  label="الحي"
                  options={leasingPlansOptions}
                  title="اختر الحي الذي عاش فيها الشهيد..."
                  icon={<FiArrowDown />}
                  value={values.neighbourhood}
                  onChange={(e) =>
                    setFieldValue("neighbourhood", e.target.value)
                  }
                  className={`focus:border-primary ${
                    errors.neighbourhood && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="neighbourhood"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              <div>
                <Field
                  name="notes"
                  as={TextArea}
                  type="date"
                  placeholder="عن حياة الشهيد..."
                  label="السيرة الذاتية"
                  className={`w-full focus:border-primary`}
                  value={values.notes}
                />
              </div>

              {/* Submit Button */}
              <Button
                title={"إرسال"}
                type="submit"
                className="bg-primary w-full hover:shadow-lg"
                icon={<BiSend className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
              />

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
                  {formErrors}
                </div>
              )}

              {isSubmitting ? null : (
                <div className="text-center text-sm mt-2 ">
                  إذا كنت لا تمتلك حساباً، قم بـ
                  <Link
                    className="text-primary font-bold hover:underline"
                    href={"/signup"}
                  >
                    الانضمام إلينا
                  </Link>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddMartyer;
