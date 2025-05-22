"use client";
import { StoryInterface } from "@/app/interfaces";
import EditStoryModal from "@/components/UI/modals/editStoryModal";
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
        onClick={() => setIsOpen(true)}
        className="group absolute top-2 left-2 p-1 bg-white border rounded-md z-10 cursor-pointer"
      >
        <CiEdit size={25} className="group-hover:text-primary duration-200" />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} loading={loading}>
        <EditStoryModal loading setLoading={setLoading} data={data} />
      </Modal>
    </>
  );
};

export default EditStoryButton;
