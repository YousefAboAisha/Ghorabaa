// components/CookieConsentBanner.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-8 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بمواصلة التصفح، أنت توافق
            على {""}
            <Link
              target="_blank"
              href="/privacyPolicy"
              className="text-primary font-semibold  hover:underline"
            >
              سياسة الخصوصية
            </Link>
            <span className="mx-1">و</span>
            <Link
              target="_blank"
              href="/termsOfService"
              className="text-primary font-semibold hover:underline"
            >
              شروط الخدمة
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/95"
          >
            قبول الكل
          </button>
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            رفض
          </button>
        </div>
      </div>
    </div>
  );
}
