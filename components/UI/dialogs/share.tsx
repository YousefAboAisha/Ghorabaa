"use client";
import { ContentType } from "@/app/enums";
import Input from "@/components/UI/inputs/input";
import { getFullName } from "@/utils/text";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiCopy } from "react-icons/fi";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  content_type: ContentType;
};

const ShareDialog = ({ data, content_type }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shareIcon, setShareIcon] = useState(<FiCopy size={18} />);
  const [sharedLink, setSharedLink] = useState("");

  const content_title =
    content_type === ContentType.STORY ? getFullName(data?.title) : data?.title;

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

  const getShareTitle = (type: ContentType) => {
    switch (type) {
      case ContentType.STORY:
        return "مشاركة القصة";

      case ContentType.EVENT:
        return "مشاركة الفعالية";

      case ContentType.MASSACRE:
        return "مشاركة المجزرة";

      default:
        return "";
    }
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
          <h2 className="text-xl font-semibold min-w-fit">
            {getShareTitle(content_type)}
          </h2>

          <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
            / {content_title || `العنوان غير معرّف`}
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
            dir="ltr"
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
            title="مشاركة عبر فيسبوك"
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
            title="مشاركة عبر منصة إكس"
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  sharedLink
                )}&text=${encodeURIComponent(getShareTitle(content_type))}`
              )
            }
          >
            <FaXTwitter size={25} />
          </div>

          <div
            title="مشاركة عبر لينكد إن"
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  sharedLink
                )}&title=${encodeURIComponent(getShareTitle(content_type))}`
              )
            }
          >
            <FaLinkedin size={25} />
          </div>

          <div
            title="مشاركة عبر واتساب"
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://wa.me/?text=${encodeURIComponent(
                  getShareTitle(content_type) + " " + sharedLink
                )}`
              )
            }
          >
            <FaWhatsapp size={25} />
          </div>

          <div
            title="مشاركة عبر تيليغرام"
            className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
            onClick={() =>
              openShareWindow(
                `https://t.me/share/url?url=${encodeURIComponent(
                  sharedLink
                )}&text=${encodeURIComponent(getShareTitle(content_type))}`
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

export default ShareDialog;
