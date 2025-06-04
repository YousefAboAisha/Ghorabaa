"use client";
import { useEffect, useState } from "react";
import { StoryInterface } from "@/app/interfaces";
import Image from "next/image";
import { StoryStatus } from "@/app/enums";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import { HiCheck } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import PreviewStory from "@/components/UI/modals/storyPreview";
import RejectStory from "@/components/UI/modals/rejectStory";
import Link from "next/link";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";

const StoryRequestsTable = () => {
  const [tableData, setTableData] = useState<
    (StoryInterface & { publisher_name: string })[]
  >([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpenStoryPreview, setIsOpenStoryPreview] = useState<boolean>(false);
  const [isOpenStoryReject, setIsOpenStoryReject] = useState<boolean>(false);
  const [storyData, setStoryData] = useState<
    StoryInterface & { publisher_name: string }
  >();

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stories/pending/fetch`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("حدث خطأ أثناء جلب البيانات");
        }

        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) setTableData(data);
        else setTableData([]);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const renderTableContent = () => {
    if (tableLoading) {
      return <DashboardTableSkeletonLoader />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (tableData.length <= 0) {
      return <NoDataMessage />;
    }

    if (tableData && tableData.length > 0) {
      return (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                اسم الشهيد
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                المدينة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الحي
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                تاريخ النشر
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الصورة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الحالة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                العمليات
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((story) => (
              <tr key={story._id as string} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.status == StoryStatus.APPROVED ? (
                    <Link
                      title="عرض القصة"
                      className="hover:underline"
                      href={`/stories/${story._id}`}
                      target="_blank"
                    >
                      {story.name}
                    </Link>
                  ) : (
                    story.name
                  )}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.city || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.neighborhood || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {new Date(story.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 border-b text-right">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </td>

                <td className="py-3 px-4 border-b text-right text-[12px]">
                  {story.status === StoryStatus.PENDING ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-yellow-500">
                      قيد المراجعة
                    </span>
                  ) : story.status === StoryStatus.APPROVED ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-primary">
                      مقبول
                    </span>
                  ) : (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-red-500">
                      مرفوض
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 border-b text-right">
                  <div className="flex items-center gap-2.5">
                    <HiCheck
                      title="قبول القصة"
                      className="cursor-pointer text-[green]"
                      onClick={() => {
                        setIsOpenStoryPreview(true);
                        setStoryData(story);
                      }}
                      size={22}
                    />

                    <MdOutlineClose
                      title="رفض القصة"
                      className="text-[red] cursor-pointer"
                      onClick={() => {
                        setIsOpenStoryReject(true);
                        setStoryData(story);
                      }}
                      size={22}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <>
      <div className="overflow-x-auto">{renderTableContent()}</div>

      {/* Preview Story Modal */}
      <Modal isOpen={isOpenStoryPreview} setIsOpen={setIsOpenStoryPreview}>
        <PreviewStory
          data={storyData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenStoryPreview}
        />
      </Modal>

      {/* Reject Story Modal */}
      <Modal
        isOpen={isOpenStoryReject}
        setIsOpen={setIsOpenStoryReject}
        containerClassName="!lg:w-3/12 "
      >
        <RejectStory
          data={storyData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenStoryReject}
        />
      </Modal>
    </>
  );
};

export default StoryRequestsTable;
