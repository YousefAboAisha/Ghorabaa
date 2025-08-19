"use client";
import { ContentType } from "@/app/enums";
import ShareDialog from "@/components/UI/dialogs/share";
import Modal from "@/components/UI/modals/modal";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const ShareButton = ({ data }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIsShareModalOpen(true)}
        className="group relative w-fit bg-white p-1 border rounded-md cursor-pointer "
      >
        <CiShare2
          title="مشاركة المحتوى"
          size={24}
          className="group-hover:text-primary text-secondary duration-200"
        />
      </div>

      {/* Share Story Modal  */}
      <Modal
        isOpen={isShareModalOpen}
        setIsOpen={setIsShareModalOpen}
        containerClassName="lg:w-[35%]"
      >
        <ShareDialog content_type={ContentType.STORY} data={data} />
      </Modal>
    </>
  );
};

export default ShareButton;
