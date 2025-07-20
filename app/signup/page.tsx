"use client";

import { BiLock, BiMailSend, BiPhone, BiUser } from "react-icons/bi";
import { PiShootingStarThin } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/components/UI/modals/modal";
import VerifyEmail from "@/components/UI/modals/verifyEmail";

const Signup = () => {
  const [error, setError] = useState<string>("");

  const [isOpenModal, setisOpenModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("يرجى إدخال الاسم رباعي"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "يرجى إدخال أرقام فقط")
      .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
      .required("يرجى إدخال رقم الهاتف"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
      .required("يرجى تأكيد كلمة المرور"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError("");
    setEmail(values.email); // ✅ SET IT EARLY
    setPassword(values.password); // Store password for later use

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "حدث خطأ أثناء إنشاء الحساب");
        return;
      }

      setEmail(values.email as string); // Set email for OTP verification

      setisOpenModal(true); // Open OTP modal
    } catch (error) {
      console.error("Error creating user", error);
      toast.error("حدث خطأ أثناء تسجيل الحساب");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative mb-14 flex items-center justify-center">
        <div className="w-11/12 md:w-7/12 lg:w-5/12 border p-8 rounded-3xl shadow-sm bg-white mt-40">
          <Heading
            highLightText="إنشاء حساب"
            title=""
            highlightColor="before:bg-primary"
            className="mb-8 mx-auto"
            additionalStyles="text-2xl text-center mx-auto"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="flex flex-col gap-4">
                {/* Name Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="الاسم رباعي"
                    label="الاسم رباعي"
                    icon={<BiUser size={20} />}
                    className="focus:border-primary"
                    aria-label="الاسم رباعي"
                    aria-invalid={!!errors.name}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-rejected font-bold text-[10px] mt-1"
                  />
                </div>

                <div>
                  {/* Email Field */}
                  <Field
                    disabled={isSubmitting}
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="البريد الالكتروني"
                    label="البريد الالكتروني"
                    icon={<BiMailSend size={20} />}
                    className="focus:border-primary"
                    aria-label="البريد الالكتروني"
                    aria-invalid={!!errors.email}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-rejected font-bold text-[10px] mt-1"
                  />
                </div>

                <div>
                  {/* Phone Number Field */}
                  <Field
                    disabled={isSubmitting}
                    name="phoneNumber"
                    as={Input}
                    type="text"
                    placeholder="رقم الجوال"
                    label="رقم الجوال"
                    icon={<BiPhone size={20} />}
                    className="focus:border-primary"
                    aria-label="رقم الجوال"
                    aria-invalid={!!errors.phoneNumber}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-rejected font-bold text-[10px] mt-1"
                  />
                </div>

                <div>
                  {/* Password Field */}
                  <Field
                    disabled={isSubmitting}
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="كلمة المرور"
                    label="كلمة المرور"
                    icon={<BiLock size={20} />}
                    className="focus:border-primary"
                    aria-label="كلمة المرور"
                    aria-invalid={!!errors.password}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-rejected font-bold text-[10px] mt-1"
                  />
                </div>

                <div>
                  {/* Confirm Password Field */}
                  <Field
                    disabled={isSubmitting}
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    label="تأكيد كلمة المرور"
                    icon={<BiLock size={20} />}
                    className="focus:border-primary"
                    aria-label="تأكيد كلمة المرور"
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-rejected font-bold text-[10px] mt-1"
                  />
                </div>

                <Button
                  title="إنشاء حساب"
                  type="submit"
                  className="bg-primary mt-2 w-full mx-auto"
                  icon={<PiShootingStarThin size={20} />}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />

                {error && (
                  <div className="rounded-lg p-4 w-full bg-red-100 text-rejected text-[12px]">
                    {error}
                  </div>
                )}

                {!isSubmitting && (
                  <div className="text-center text-[12px] mt-2">
                    إذا كنت تمتلك حساباً، قم بـ
                    <Link
                      className="text-primary font-bold hover:underline"
                      href={"/signin"}
                    >
                      تسجيل الدخول
                    </Link>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setisOpenModal}
        containerClassName="lg:w-[30%]"
        loading={true}
      >
        <VerifyEmail
          setIsOpen={setisOpenModal}
          otp={otp}
          setOtp={setOtp}
          email={email || ""} // Pass email if available, otherwise empty string
          password={password || ""} // Pass password if available, otherwise empty string
        />
      </Modal>
    </>
  );
};

export default Signup;
