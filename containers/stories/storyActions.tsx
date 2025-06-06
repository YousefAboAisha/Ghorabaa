"use client";
import { Role } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import EditStoryForm from "@/components/UI/Forms/editStoryForm";
import { DeleteStory } from "@/components/UI/modals/deleteStory";
import Modal from "@/components/UI/modals/modal";
import ShareStory from "@/components/UI/modals/shareStory";
import { Session } from "next-auth";
import { useState } from "react";
import { CiEdit, CiShare2, CiTrash } from "react-icons/ci";

type StoryActionsProps = {
  data: StoryInterface;
  session: Session | null;
};

const StoryActions = ({ data, session }: StoryActionsProps) => {
  // Share Story Modal state variables
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Edit Story Modal state variables
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

  // Delete Story Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const current_user_id = session?.user.id;
  const current_user_role = session?.user.role;

  const isStoryOwner = data.publisher_id === current_user_id;
  const isAdmin = current_user_role === Role.ADMIN;

  return (
    <>
      <div className="fixed left-2 md:right-10 lg:right-10  top-[50%] -translate-y-[50%] z-[11] w-fit">
        <div className="flex flex-col gap-4">
          <div
            title="مشاركة قصة الشهيد"
            className="flex items-center justify-center border bg-white p-2 text-secondary hover:text-primary duration-100 cursor-pointer rounded-lg shadow-sm"
            onClick={() => setIsShareModalOpen(true)}
          >
            <CiShare2 size={30} />
          </div>

          {(isStoryOwner || isAdmin) && (
            <div
              title="تعديل القصة"
              className="flex items-center justify-center border bg-white p-2 text-secondary hover:text-blueColor duration-100 cursor-pointer rounded-lg shadow-sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <CiEdit size={30} />
            </div>
          )}

          {(isStoryOwner || isAdmin) && (
            <div
              title="حذف القصة"
              className="flex items-center justify-center border bg-white p-2 text-secondary hover:text-[red] duration-100 cursor-pointer rounded-lg shadow-sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <CiTrash size={30} />
            </div>
          )}
        </div>
      </div>

      {/* Edit Story Modal */}
      <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
        <EditStoryForm
          data={data}
          setLoading={setIsEditLoading}
          loading={isEditLoading}
        />
      </Modal>

      {/* Share Story Modal  */}
      <Modal
        isOpen={isShareModalOpen}
        setIsOpen={setIsShareModalOpen}
        containerClassName="lg:w-[35%]"
      >
        <ShareStory story_title={data.name} />
      </Modal>

      {/* Delete Story Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        containerClassName="lg:w-[30%]"
      >
        <DeleteStory
          setIsOpen={setIsDeleteModalOpen}
          setLoading={setIsDeleteLoading}
          loading={isDeleteLoading}
          data={data}
        />
      </Modal>
    </>
  );
};

export default StoryActions;
