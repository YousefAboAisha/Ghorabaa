"use client";

import Input from "@/components/UI/inputs/input";
import Modal from "@/components/UI/modals/modal";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FiCopy, FiLink } from "react-icons/fi";

const ShareModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div
        title="مشاركة الفعالية"
        onClick={() => setIsOpen(true)}
        className="bg-gray_light rounded-md border cursor-pointer p-2 hover:shadow-md duration-200"
      >
        <FiLink size={20} />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative flex flex-col gap-2 p-6">
          <h2 className="text-center text-xl font-semibold">مشاركة الفعالية</h2>

          <div className="relative mt-4 flex flex-col gap-2">
            <h4 className="text-md font-light">نسخ الرابط</h4>
            <div className="relative border rounded-xl cursor-pointer mt-2">
              <Input
                title=""
                placeholder=""
                readOnly
                className="border-none pr-8"
                value={"https://twitter.com/home?lang=ar"}
              />
              <div
                title="نسخ الرابط"
                className="bg-secondary h-full text-white flex items-center justify-center p-4 rounded-xl rounded-l-none absolute right-0 top-[50%] -translate-y-[50%]"
              >
                <FiCopy size={18} className="" />
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
