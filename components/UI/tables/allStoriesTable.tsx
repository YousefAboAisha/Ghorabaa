"use client";
import { useCallback, useEffect, useState } from "react";
import { StoryInterface } from "@/app/interfaces";
import { ContentType, StoryStatus } from "@/app/enums";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import { HiCheck } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { StoryStatusData } from "@/data/storyTabsData";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import { CiEdit, CiSearch, CiTrash } from "react-icons/ci";
import { useStatisticsStore } from "@/stores/storiesTableStore";
import Input from "../inputs/input";
import Select from "../inputs/selectInput";
import { getFullName } from "@/utils/text";
import ApproveDialog from "../dialogs/approve";
import RejectDialog from "../dialogs/reject";
import DeleteDaialog from "../dialogs/delete";
import Image from "next/image";

const AllStoriesTable = () => {
  const [tableData, setTableData] = useState<
    (StoryInterface & { publisher_name: string })[]
  >([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Approve Story Modal state variables
  const [isOpenStoryApprove, setIsOpenStoryApprove] = useState<boolean>(false);
  const [isStoryApproveLoading, setIsStoryApproveLoading] =
    useState<boolean>(false);

  const [isOpenStoryReject, setIsOpenStoryReject] = useState<boolean>(false);
  const [isStoryRejectLoading, setIsStoryRejectLoading] =
    useState<boolean>(false);

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

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { fetchStatistics } = useStatisticsStore();

  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/admin/stories/fetch?status=${currentTap}&page=${page}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}`
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
      console.log("📊 All Stories Table data:", data);

      setTableData(Array.isArray(data) ? data : []);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      console.error("Error fetching table data:", error);
    } finally {
      setTableLoading(false);
    }
  }, [currentTap, page, searchQuery]); // Add dependencies here

  const renderTableActions = (
    story: StoryInterface & { publisher_name: string }
  ) => {
    const status = story.status;

    if (status == StoryStatus.APPROVED)
      return (
        <>
          <CiTrash
            title="حذف القصة"
            className="cursor-pointer text-rejected"
            onClick={() => {
              setIsDeleteModalOpen(true);
              setStoryData(story);
            }}
            size={22}
          />

          <Link href={`/admin/dashboard/stories/editStory/${story?._id}`}>
            <CiEdit
              title="تعديل البيانات"
              className="cursor-pointer"
              size={22}
            />
          </Link>
        </>
      );

    if (status == StoryStatus.PENDING) {
      return (
        <>
          <HiCheck
            title="قبول القصة"
            className="cursor-pointer text-[green]"
            onClick={() => {
              setIsOpenStoryApprove(true);
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

          <CiTrash
            title="حذف القصة"
            className="cursor-pointer text-rejected"
            onClick={() => {
              setIsDeleteModalOpen(true);
              setStoryData(story);
            }}
            size={22}
          />

          <Link href={`/admin/dashboard/stories/editStory/${story?._id}`}>
            <CiEdit
              title="تعديل البيانات"
              className="cursor-pointer"
              size={22}
            />
          </Link>
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
              setIsOpenStoryApprove(true);
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

          <Link href={`/admin/dashboard/stories/editStory/${story?._id}`}>
            <CiEdit
              title="تعديل البيانات"
              className="cursor-pointer"
              size={22}
            />
          </Link>
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
      console.log("Table data", tableData);

      return (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                #
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
               الصورة
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
            {tableData?.map((story, index) => {
              const fullName = getFullName(story?.title);

              return (
                <tr key={story._id as string} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center text-sm text-gray-700">
                    {(page - 1) * 10 + index + 1}
                  </td>

                  <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                    <div className="relative w-12 h-12 overflow-hidden rounded">
                      <Image
                        src={story.image || "/notFound.png"}
                        alt={fullName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width:  768px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  </td>

                    <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                    {story?.id_number || "غير محدد"}
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
                        {fullName}
                      </Link>
                    ) : (
                      fullName
                    )}
                  </td>

                  <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                    {story?.location?.city || "غير محدد"}
                  </td>

                  <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                    {story?.location?.neighborhood || "غير محدد"}
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
                      {story.publisher_name.split(" ").slice(0, 1) ||
                        "غير محدد"}
                    </Link>
                  </td>

                  <td className="py-3 px-4 border-b text-right">
                    <div className="flex items-center gap-2.5">
                      {renderTableActions(story)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  useEffect(() => {
    router.push(`/admin/dashboard/stories?page=${page}`);
    fetchTableData(); // Add this line to fetch data immediately
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch data when currentTap, page, or searchQuery changes
  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTap, page]); // Add fetchTableData as dependency

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchTableData();
      } else if (searchQuery.length === 0) {
        fetchTableData();
      }
    }, 700); // debounce

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <>
      <div className="relative w-full flex items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="البحث عن الشهيد"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                fetchTableData();
              }
            }}
            icon={<CiSearch size={20} className="text-gray-500" />}
            className="border bg-white focus:border-secondary"
          />
        </div>

        <div className="border rounded-[8px] min-w-fit">
          <Select
            title="حالة القصص"
            options={StoryStatusData}
            value={currentTap}
            onChange={(e) => {
              setPage(1);
              setSearchQuery("");
              router.push(`/admin/dashboard/stories?page=1`);
              setCurrentTap(e.target.value as StoryStatus);
            }}
            className="bg-white z-10 !pr-2 px-6 focus:border-secondary  text-right"
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
            router.push(`/admin/dashboard/stories?page=${newPage}`);
          }
        }}
      />

      {/* Approve Story Modal */}
      <Modal
        isOpen={isOpenStoryApprove}
        setIsOpen={setIsOpenStoryApprove}
        containerClassName="w-11/12 md:w-7/12 lg:w-[30%]"
        loading={isStoryApproveLoading}
      >
        <ApproveDialog
          data={storyData!}
          refetchData={() => {
            fetchTableData();
            fetchStatistics();
          }}
          setLoading={setIsStoryApproveLoading}
          loading={isStoryApproveLoading}
          setIsOpen={setIsOpenStoryApprove}
          content_type={ContentType.STORY}
        />
      </Modal>

      {/* Reject Story Modal */}
      <Modal
        isOpen={isOpenStoryReject}
        setIsOpen={setIsOpenStoryReject}
        containerClassName="w-11/12 md:w-7/12 !lg:w-[20%]"
        loading={isStoryRejectLoading}
      >
        <RejectDialog
          data={storyData!}
          refetchData={() => {
            fetchTableData();
            fetchStatistics();
          }}
          setIsOpen={setIsOpenStoryReject}
          setLoading={setIsStoryRejectLoading}
        />
      </Modal>

      {/* Delete Story Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        containerClassName="lg:w-[30%]"
        loading={isDeleteLoading}
      >
        <DeleteDaialog
          setIsOpen={setIsDeleteModalOpen}
          setLoading={setIsDeleteLoading}
          loading={isDeleteLoading}
          data={storyData!}
          callback={() => {
            fetchTableData();
            fetchStatistics();
          }}
          content_type={ContentType.STORY}
        />
      </Modal>
    </>
  );
};

export default AllStoriesTable;
