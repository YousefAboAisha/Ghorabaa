"use client";

import Input from "@/components/UI/inputs/input";
import Modal from "@/components/UI/modals/modal";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaCheck,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { MdShare } from "react-icons/md";

type ShareModalProps = {
  title: string;
  sharedLink: string;
};

const ShareModal = ({ title, sharedLink }: ShareModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [shareIcon, setShareIcon] = useState(<FiCopy size={18} />);

  const copyToClipboard = async () => {
    setLoading(true);
    setShareIcon(
      <AiOutlineLoading3Quarters size={18} className="animate-spin" />
    );
    await navigator.clipboard.writeText(location.href).then(() => {
      setTimeout(() => {
        setShareIcon(<FaCheck size={18} />);
      }, 1000);

      setTimeout(() => {
        setLoading(false);
        setShareIcon(<FiCopy size={18} />);
      }, 2500);
    });
  };

  return (
    <>
      <div
        title={title}
        onClick={() => setIsOpen(true)}
        className="text-secondary bg-white border rounded-lg p-2 cursor-pointer hover:shadow-md duration-300"
      >
        <MdShare size={20} />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative flex flex-col gap-2 p-6">
          <h2 className="text-center text-xl font-semibold">{title}</h2>

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
                className="bg-secondary h-full text-white flex items-center justify-center p-4 rounded-xl rounded-l-none absolute right-0 top-[50%] -translate-y-[50%]"
                onClick={copyToClipboard}
              >
                {shareIcon}
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex flex-col gap-2">
            <h4 className="text-md font-light">مشاركة عبر</h4>
            <div className="flex flex-row items-center gap-3 mt-2 text-secondary">
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaFacebook size={25} />
              </div>
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaInstagram size={25} />
              </div>
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaX size={25} />
              </div>
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaLinkedin size={25} />
              </div>
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaWhatsapp size={25} />
              </div>
              <div className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200">
                <FaTelegram size={25} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
