import React, { Dispatch, SetStateAction } from "react";

type ModalType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bg?: string;
  zIndex?: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
};

const Modal = ({
  setIsOpen,
  isOpen,
  bg = "bg-[#000000e7]",
  className,
  zIndex = "z-[50]",
  loading = false,
  children,
}: ModalType) => {
  return (
    // pointer-events-none to hide modal and disable interactions.
    <>
      <div
        className={`fixed w-screen h-screen left-0 top-0 duration-300 z-[20]  ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${bg} ${zIndex} `}
        onClick={() => {
          if (loading) return;
          if (!loading) setIsOpen(false);
        }}
      ></div>

      <div
        className={`abs-center fixed bg-white max-h-[90%] z-100 w-11/12 md:w-7/12 lg:w-5/12 z-[1000] overflow-y-auto rounded-xl ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } duration-300 ${className} `}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
