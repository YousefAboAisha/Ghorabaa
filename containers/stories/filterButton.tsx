"use client";
import Modal from "@/components/UI/modals/modal";
import SearchFilters from "@/components/UI/modals/searchFilters";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        containerClassName="lg:w-[35%]"
      >
        <SearchFilters setIsOpen={setIsOpen} />
      </Modal>

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm rounded-md bg-white border shadow-sm p-3 w-fit cursor-pointer hover:text-primary duration-200 "
      >
        <p className="hidden md:block">عوامل التصفية</p>
        <CiFilter size={22} />
      </div>
    </>
  );
};

export default FilterButton;
