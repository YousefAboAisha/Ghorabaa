import { useState } from "react";
import Modal from "../modals/modal";
import { FaCircleCheck } from "react-icons/fa6";
import Button from "../inputs/button";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";

const SuccessMessage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const modalHandler = () => {
    setIsOpen(true);
  };

  return (
    <Modal
      containerClassName="w-11/12 md:w-7/12 lg:w-4/12 p-10"
      isOpen={isOpen}
      setIsOpen={modalHandler}
      zIndex="z-[1001]"
    >
      <div className="w-full flex flex-col items-center gap-4">
        <FaCircleCheck size={100} className="text-primary" />
        <h2 className="text-3xl font-semibold">تم إرسال بياناتك بنجاح</h2>
        <p>سيتم التواصل معك في أقرب وقت ممكن!</p>
        <Link href={"/"} className="w-full md:w-7/12 lg:w-5/12 mt-2">
          <Button
            title="العودة للصفحة الرئيسية"
            className="bg-primary"
            hasShiningBar={false}
            icon={<FaSignInAlt />}
          />
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessMessage;
