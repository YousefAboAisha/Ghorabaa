"use client";
import { MassacreInterface } from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import ShareContent from "@/components/UI/modals/shareContent";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";

type Props = {
  data: MassacreInterface;
};

const MassacreActions = ({ data }: Props) => {
  // Share Story Modal state variables
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed left-2 md:right-10 lg:right-10  top-[50%] -translate-y-[50%] z-[11] w-fit">
        <div className="flex flex-col gap-4">
          <div
            title="مشاركة المجزرة"
            className="flex items-center justify-center border bg-white p-2 text-secondary hover:text-primary duration-100 cursor-pointer rounded-lg shadow-sm"
            onClick={() => setIsShareModalOpen(true)}
          >
            <CiShare2 size={30} />
          </div>
        </div>
      </div>

      {/* Share Story Modal  */}
      <Modal
        isOpen={isShareModalOpen}
        setIsOpen={setIsShareModalOpen}
        containerClassName="lg:w-[35%]"
      >
        <ShareContent type="المجزرة" story_title={data.title} />
      </Modal>
    </>
  );
};

export default MassacreActions;
