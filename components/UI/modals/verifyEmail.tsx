import React, { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../inputs/button";
import Input from "../inputs/input";
import { signIn } from "next-auth/react";

type VerifyEmailProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  otp: string; // Optional prop to pass OTP directly
  setOtp: Dispatch<SetStateAction<string>>; // Optional prop to set OTP
  email: string; // Optional prop to pass email directly
  password: string; // Optional prop to pass password for auto sign-in
};

export const VerifyEmail = ({
  setIsOpen,
  otp,
  setOtp,
  email,
  password,
}: VerifyEmailProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const VerifyEmailHandler = async () => {
    setError(null); // Reset error state
    setLoading(true);

    if (!otp) {
      setError("يرجى إدخال رمز التحقق.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
          credentials: "include", // If your server needs cookies
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "حدث خطأ أثناء التحقق من البريد الإلكتروني.");
        return;
      }

      // Auto sign-in after signup
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.error) {
        toast.error("تم إنشاء الحساب، لكن فشل تسجيل الدخول");
      } else {
        toast.success("تم تسجيل الدخول بنجاح!");
        window.location.reload();
      }

      setIsOpen(false);
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      setError("حدث خطأ أثناء التحقق من البريد الإلكتروني.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">تأكيد البريد الالكتروني</h2>
      </div>

      <hr className="mt-4" />

      <p className="text-sm text-gray-600 mt-4">
        يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب. إذا لم تتلقَ البريد،
        يمكنك إعادة إرسال رمز التحقق.
      </p>

      <Input
        placeholder="رمز التحقق - XXXXXX"
        className="mt-2"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="flex items-center gap-2 mt-6">
        <Button
          disabled={loading}
          title="تأكيد"
          onClick={() => VerifyEmailHandler()}
          className="!bg-primary text-white"
          loading={loading}
        />
      </div>

      {error && (
        <div className="rounded-lg p-4 mt-4 w-full bg-red-100 text-rejected text-[12px]">
          {error}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
