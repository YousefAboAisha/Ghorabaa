"use client";
import { StoryInterface } from "@/app/interfaces";
import EditStoryForm from "@/components/UI/forms/editStoryForm";
import Modal from "@/components/UI/modals/modal";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

type EditStoryButtonProps = {
  data: StoryInterface;
};

const EditStoryButton = ({ data }: EditStoryButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div
        title="تعديل القصة"
        onClick={() => setIsOpen(true)}
        className="group absolute top-5 left-5 p-1.5 bg-white border rounded-xl z-10 cursor-pointer"
      >
        <CiEdit size={25} />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} loading={loading}>
        <EditStoryForm loading setLoading={setLoading} data={data} />
      </Modal>
    </>
  );
};

export default EditStoryButton;
