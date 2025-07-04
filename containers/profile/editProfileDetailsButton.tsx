"use client";
import EditProfileDetails from "@/components/UI/modals/editProfileDetails";
import Modal from "@/components/UI/modals/modal";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

type editProfileDetailsButtonProps = {
  data: {
    name: string;
    phone_number: string;
    id_number: string;
    image?: string;
  };
};

const EditProfileDetailsButton = ({ data }: editProfileDetailsButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div
        title="تعديل القصة"
        onClick={() => setIsOpen(true)}
        className="group absolute top-7 right-7 p-1.5 bg-[#ffffff52] backdrop-blur-md rounded-full z-10 cursor-pointer hover:shadow-xl duration-300"
      >
        <CiEdit size={25} className="text-white" />
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        containerClassName="lg:w-[28%]"
      >
        <EditProfileDetails loading setLoading={setLoading} data={data} />
      </Modal>
    </>
  );
};

export default EditProfileDetailsButton;
