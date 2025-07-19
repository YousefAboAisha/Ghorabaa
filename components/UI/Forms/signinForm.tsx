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
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/auth-redirect";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError("");

    const res = await signIn("credentials", {
      callbackUrl,
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      toast.success("تم تسجيل الدخول بنجاح!");
      const session = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/session`)
      ).json();
      window.location.href = `/profile/${session?.user?.id}`;
    }

    setSubmitting(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: callbackUrl,
        redirect: true, // Let NextAuth handle the redirection
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoading(false);
    }
  };

  return (
      <div className="w-11/12 md:w-7/12 lg:w-[35%] border p-8 rounded-3xl shadow-sm bg-white mt-[70px] z-10">
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
                  disabled={isSubmitting || loading}
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
                  disabled={isSubmitting || loading}
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
                disabled={isSubmitting || loading}
              />

              <p className="bg-transparent w-full flex justify-center text-sm">
                أو
              </p>

              <Button
                onClick={() => handleGoogleLogin()}
                title={"تسجيل بواسطة جوجل"}
                aria-label="تسجيل بواسطة جوجل"
                className="px-2 py-3 cursor-pointer text-center justify-center rounded-lg text-sm bg-white border !border-gray_dark !text-black shadow-none hover:shadow-none flex items-center gap-2"
                icon={<FcGoogle size={22} />}
                loading={loading}
                disabled={isSubmitting || loading}
              />

              {error && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-rejected text-[12px]">
                  {error}
                </div>
              )}

              {isSubmitting ? null : (
                <div className="text-center text-[12px] mt-2">
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
  );
};

export default SigninForm;
