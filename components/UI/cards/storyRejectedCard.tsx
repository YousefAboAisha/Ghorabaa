import { StoryInterface } from "@/app/interfaces";
import { FaCircle } from "react-icons/fa";
import Modal from "../modals/modal";
import { useState } from "react";
import EditRejectedStoryForm from "../forms/editRejectedStoryModal";
import { dateConversion } from "@/utils/format";

interface StoryCardsProps {
  data: StoryInterface;
}

const StoryRejectedCard = ({ data }: StoryCardsProps) => {
  const [isOpen, setIOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIOpen(true)}
        className="relative flex flex-col gap-1 bg-white p-4 border rounded-lg hover:shadow-md duration-500 cursor-pointer"
      >
        <FaCircle className="absolute top-2 left-2 text-red-600" size={10} />

        <h2 className="truncate">الشهيد/ {data?.name}</h2>

        <p className="font-light text-[13px] mb-2 line-clamp-3">{data?.bio}</p>

        <p className=" text-red-600 rounded-sm w-fit font-semibold text-[11px] mb-4">
          {data?.rejectReason}
        </p>

        <span className="absolute bottom-2 left-2 text-[10px] text-gray_dark mt-2">
          {data?.createdAt ? dateConversion(data.createdAt) : null}
        </span>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIOpen} loading={loading}>
        <EditRejectedStoryForm
          setLoading={setLoading}
          setIsOpen={setIOpen}
          data={data}
        />
      </Modal>
    </>
  );
};

export default StoryRejectedCard;
