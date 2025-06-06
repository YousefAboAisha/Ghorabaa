"use client";
import Input from "@/components/UI/inputs/input";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiCopy } from "react-icons/fi";

type ShareModalProps = {
  story_title: string;
};

const ShareStory = ({ story_title }: ShareModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shareIcon, setShareIcon] = useState(<FiCopy size={18} />);
  const [sharedLink, setSharedLink] = useState("");

  const copyToClipboard = async () => {
    console.log(loading);
    setLoading(true);
    setShareIcon(
      <AiOutlineLoading3Quarters size={22} className="animate-spin" />
    );
    await navigator.clipboard.writeText(location.href).then(() => {
      setTimeout(() => {
        setShareIcon(<FiCheck size={22} className="text-[green]" />);
      }, 500);

      setTimeout(() => {
        setLoading(false);
        setShareIcon(<FiCopy size={22} />);
      }, 1200);
    });
  };

  useEffect(() => {
    // This runs only on the client
    setSharedLink(window.location.href);
  }, []);

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative flex flex-col gap-2 p-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold min-w-fit">مشاركة القصة</h2>

          <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
            الشهيد/ {story_title || "عنوان القصة غير معرّف"}
          </p>
        </div>
      </div>

      <hr className="mt-4" />

      <div className="relative mt-4 flex flex-col gap-2">
        <h4 className="text-md font-light">نسخ الرابط</h4>
        <div className="relative border rounded-xl cursor-pointer mt-2">
          <Input
            title=""
            placeholder=""
            readOnly
            className="border-none pr-8"
            value={sharedLink}
          />

          <div
            title="نسخ الرابط"
            className="h-full border-l bg-gray_light flex items-center justify-center p-4 rounded-xl rounded-l-none absolute right-0 top-[50%] -translate-y-[50%]"
            onClick={copyToClipboard}
          >
            {shareIcon}
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col gap-2">
        <h4 className="text-md font-light">مشاركة عبر</h4>
        <div className="flex flex-row items-center gap-3 mt-2 text-secondary">
          <div
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  sharedLink
                )}`
              )
            }
          >
            <FaFacebook size={25} />
          </div>
          <div
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  sharedLink
                )}&text=${encodeURIComponent("الشهيد/ " + story_title)}`
              )
            }
          >
            <FaXTwitter size={25} />
          </div>
          <div
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  sharedLink
                )}&title=${encodeURIComponent("الشهيد/ " + story_title)}`
              )
            }
          >
            <FaLinkedin size={25} />
          </div>
          <div
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://wa.me/?text=${encodeURIComponent(
                  "الشهيد/ " + story_title + " " + sharedLink
                )}`
              )
            }
          >
            <FaWhatsapp size={25} />
          </div>
          <div
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://t.me/share/url?url=${encodeURIComponent(
                  sharedLink
                )}&text=${encodeURIComponent("الشهيد/ " + story_title)}`
              )
            }
          >
            <FaTelegram size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStory;
