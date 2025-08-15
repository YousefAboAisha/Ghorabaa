"use client";
import { StoryInterface } from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import ShareContent from "@/components/UI/modals/shareContent";
import { getFullName } from "@/utils/text";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";

type Props = {
  data?: StoryInterface;
};

const ShareButton = ({ data }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="group relative w-fit bg-white p-1 border rounded-md ">
        <CiShare2
          title="مشاركة قصة الشهيد"
          size={24}
          onClick={() => setIsShareModalOpen(true)}
          className="group-hover:text-primary cursor-pointer text-secondary duration-200"
        />
      </div>

      {/* Share Story Modal  */}
      <Modal
        isOpen={isShareModalOpen}
        setIsOpen={setIsShareModalOpen}
        containerClassName="lg:w-[35%]"
      >
        <ShareContent type="الشهيد" story_title={getFullName(data?.name)} />
      </Modal>
    </>
  );
};

export default ShareButton;
