"use client";
import React, { useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSearchParams } from "next/navigation";

const Signin = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"; // default fallback

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
      const response = await fetch(`/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
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
      console.error("Error while signing in", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signIn("google", {
        callbackUrl: callbackUrl,
        redirect: false,
      });

      if (result?.url) {
        const popup = window.open(
          result.url,
          "googleSignIn",
          "width=500,height=600"
        );

        const pollTimer = setInterval(() => {
          if (popup?.closed) {
            clearInterval(pollTimer);
            window.location.reload();
          }
        }, 500);
      } else {
        setLoading(false); // fallback if signIn fails
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoading(false);
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

      <div className="w-11/12 md:w-7/12 lg:w-[35%] border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <Heading
          title="تسجيل الدخول"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-4">
              {/* Email Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="البريد الالكتروني"
                  label="البريد الالكتروني"
                  icon={<BiUser />}
                  className={`focus:border-primary`}
                  aria-label="البريد الالكتروني"
                  aria-invalid={!!errors.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[10px]"
                />
              </div>

              {/* Password Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="كلمة المرور"
                  label="كلمة المرور"
                  icon={<BiLock />}
                  className={`focus:border-primary`}
                  aria-label="كلمة المرور"
                  aria-invalid={!!errors.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[10px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                title={"تسجيل الدخول"}
                type="submit"
                className="bg-primary w-full hover:shadow-lg"
                icon={<PiSignIn size={22} className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
              />

              <p className="bg-transparent w-full flex justify-center text-sm">
                أو
              </p>

              {/* Submit Button */}
              <div
                onClick={() => handleGoogleLogin()}
                className="px-2 py-3 cursor-pointer text-center justify-center rounded-lg text-sm bg-white border border-gray_dark shadow-none hover:shadow-none flex items-center gap-2"
                title={"تسجيل بواسطة جوجل"}
                aria-label="تسجيل بواسطة جوجل"
              >
                تسجيل بواسطة جوجل
                {loading ? (
                  <AiOutlineLoading3Quarters
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <FcGoogle size={20} />
                )}
              </div>

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-[12px]">
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
                    إنشاء حساب
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

export default Signin;
