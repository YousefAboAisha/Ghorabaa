"use client";
import { useEffect, useState } from "react";
import { StoryInterface } from "@/app/interfaces";
import { StoryStatus } from "@/app/enums";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import { HiCheck } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import PreviewStory from "@/components/UI/modals/storyPreview";
import RejectStory from "@/components/UI/modals/rejectStory";
import Link from "next/link";
import { StoryTabsData } from "@/data/storyTabsData";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import Button from "../inputs/button";
import StorySearch from "../modals/storySearch";
import { CiSearch, CiTrash } from "react-icons/ci";
import { DeleteStory } from "../modals/deleteStory";
import { useStatisticsStore } from "@/stores/storiesTableStore";

const AllStoriesTable = () => {
  const [tableData, setTableData] = useState<
    (StoryInterface & { publisher_name: string })[]
  >([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenStoryPreview, setIsOpenStoryPreview] = useState<boolean>(false);
  const [isStoryPreviewLoading, setIsStoryPreviewLoading] =
    useState<boolean>(false);

  const [isOpenStoryReject, setIsOpenStoryReject] = useState<boolean>(false);
  const [isStoryRejectLoading, setIsStoryRejectLoading] =
    useState<boolean>(false);

  const [isOpenStorySearch, setIsOpenStorySearch] = useState<boolean>(false);

  // Delete Story Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const [storyData, setStoryData] = useState<
    StoryInterface & { publisher_name: string }
  >();
  const [currentTap, setCurrentTap] = useState<StoryStatus>(
    StoryStatus.APPROVED
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const { fetchStatistics } = useStatisticsStore();

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stories/fetch?status=${currentTap}&page=${page}&limit=10`
      );

      if (!res.ok) {
        let errorMsg = "حدث خطأ أثناء جلب البيانات";
        try {
          const errorResponse = await res.json();
          errorMsg = errorResponse?.error || errorMsg;
        } catch {
          errorMsg = res.statusText || errorMsg;
        }

        throw new Error(errorMsg);
      }

      const { data, pagination } = await res.json();

      if (data && Array.isArray(data)) {
        console.log("pagination data", pagination);
        setTableData(data);
        setTotalPages(pagination.totalPages);
        console.log("table's pagination", pagination);
      } else {
        setTableData([]);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      console.error("Error fetching table data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    router.push(`/admin/dashboard?page=${page}`);
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [currentTap, page]);

  const getBorderColor = (status: StoryStatus) => {
    if (status !== currentTap) return ""; // ✅ Only add color to active tab
    switch (status) {
      case StoryStatus.APPROVED:
        return "border-approved";
      case StoryStatus.PENDING:
        return "border-pending";
      case StoryStatus.REJECTED:
        return "border-rejected";
      default:
        return "";
    }
  };

  const renderTableActions = (
    story: StoryInterface & { publisher_name: string }
  ) => {
    const status = story.status;

    if (status == StoryStatus.APPROVED) return <p>-</p>;
    if (status == StoryStatus.PENDING) {
      return (
        <>
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
            className="text-rejected cursor-pointer"
            onClick={() => {
              setIsOpenStoryReject(true);
              setStoryData(story);
            }}
            size={22}
          />
        </>
      );
    }

    if (status == StoryStatus.REJECTED) {
      return (
        <>
          <HiCheck
            title="قبول القصة"
            className="cursor-pointer text-approved"
            onClick={() => {
              setIsOpenStoryPreview(true);
              setStoryData(story);
            }}
            size={22}
          />

          <CiTrash
            title="حذف القصة"
            className="cursor-pointer text-rejected"
            onClick={() => {
              setIsDeleteModalOpen(true);
              setStoryData(story);
            }}
            size={22}
          />
        </>
      );
    }
  };

  const renderTableContent = () => {
    if (tableLoading) {
      return <DashboardTableSkeletonLoader />;
    }

    if (error) {
      return <ErrorMessage error={error as string} />;
    }

    if (tableData.length === 0) {
      return <NoDataMessage />;
    }

    if (tableData && tableData.length > 0) {
      return (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                #
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                رقم الهوية
              </th>

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
                الحالة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الناشر
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                العمليات
              </th>
            </tr>
          </thead>

          <tbody>
            {tableData?.map((story, index) => (
              <tr key={story._id as string} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-center text-sm text-gray-700">
                  {(page - 1) * 10 + index + 1}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.id_number || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.status == StoryStatus.APPROVED ||
                  StoryStatus.PENDING ? (
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
                  {story.effectiveDate
                    ? new Date(story.effectiveDate).toLocaleDateString(
                        "ar-EG",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-[12px]">
                  {story.status === StoryStatus.PENDING ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-pending">
                      قيد المراجعة
                    </span>
                  ) : story.status === StoryStatus.APPROVED ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-approved">
                      مقبول
                    </span>
                  ) : (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-rejected">
                      مرفوض
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  <Link
                    title="عرض القصة"
                    className="hover:underline"
                    href={`/profile/${story.publisher_id}`}
                    target="_blank"
                  >
                    {story.publisher_name.split(" ").slice(0, 1) || "غير محدد"}
                  </Link>
                </td>

                <td className="py-3 px-4 border-b text-right">
                  <div className="flex items-center gap-2.5">
                    {renderTableActions(story)}
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
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm mb-8">
        <div className="flex items-center gap-4 overflow-auto scrollbar-hidden ">
          {StoryTabsData.map(({ label, status }) => (
            <div
              key={status}
              title={label}
              className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit select-none ${getBorderColor(
                status
              )}`}
              onClick={() => {
                setPage(1);
                router.push(`/admin/dashboard?page=1`);
                setCurrentTap(status);
              }}
            >
              <p>{label}</p>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-fit">
          <Button
            onClick={() => setIsOpenStorySearch(true)}
            title="البحث"
            className="bg-secondary text-white px-4"
            icon={<CiSearch size={20} />}
          />
        </div>
      </div>

      {/* Render the table content */}
      <div className="relative mt-8 overflow-x-auto">
        {renderTableContent()}
      </div>

      {/* Pagination is here */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (newPage !== page) {
            setPage(newPage);
            router.push(`/admin/dashboard?page=${newPage}`);
          }
        }}
      />

      {/* Preview Story Modal */}
      <Modal
        isOpen={isOpenStoryPreview}
        setIsOpen={setIsOpenStoryPreview}
        loading={isStoryPreviewLoading}
      >
        <PreviewStory
          data={storyData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenStoryPreview}
          setLoading={setIsStoryPreviewLoading}
        />
      </Modal>

      {/* Reject Story Modal */}
      <Modal
        isOpen={isOpenStoryReject}
        setIsOpen={setIsOpenStoryReject}
        containerClassName="w-11/12 md:w-7/12 !lg:w-[20%]"
        loading={isStoryRejectLoading}
      >
        <RejectStory
          data={storyData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenStoryReject}
          setLoading={setIsStoryRejectLoading}
        />
      </Modal>

      <Modal
        isOpen={isOpenStorySearch}
        setIsOpen={setIsOpenStorySearch}
        containerClassName="!lg:w-3/12"
      >
        <StorySearch />
      </Modal>

      {/* Delete Story Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        containerClassName="lg:w-[30%]"
        loading={isDeleteLoading}
      >
        <DeleteStory
          setIsOpen={setIsDeleteModalOpen}
          setLoading={setIsDeleteLoading}
          loading={isDeleteLoading}
          data={storyData!}
          callback={() => {
            fetchTableData();
            fetchStatistics();
          }}
        />
      </Modal>
    </>
  );
};

export default AllStoriesTable;
