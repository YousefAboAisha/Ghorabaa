import Modal from "@/components/UI/modals/modal";
import React, { useState } from "react";

type ShowDetailsButtonProps = {
  // Define any props if needed
  story_id: string;
};

const ShowDetailsButton = ({ story_id }: ShowDetailsButtonProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="text-[12px] hover:underline cursor-pointer text-secondary w-fit">
        إظهار التفاصيل
      </div>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
      ></Modal>
    </>
  );
};

export default ShowDetailsButton;
