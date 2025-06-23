"use client";
import { useEffect, useMemo, useState } from "react";
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
import { StoryTabsData } from "@/data/storyTabsData";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import Input from "../inputs/input";
import { CiSearch } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";

const AllStoriesTable = () => {
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

  const filteredData = useMemo(() => {
    return tableData.filter((story) =>
      story.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tableData]);

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
            className="text-[red] cursor-pointer"
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
        <HiCheck
          title="قبول القصة"
          className="cursor-pointer text-[green]"
          onClick={() => {
            setIsOpenStoryPreview(true);
            setStoryData(story);
          }}
          size={22}
        />
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

    if (filteredData.length === 0) {
      return <NoDataMessage />;
    }

    if (filteredData && filteredData.length > 0) {
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
            {filteredData?.map((story) => (
              <tr key={story._id as string} className="hover:bg-gray-50">
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
      <div className="flex items-center gap-4 text-sm overflow-auto scrollbar-hidden mb-8">
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
              setSearchQuery("");
            }}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className="w-full md:w-6/12 lg:w-5/12">
        <Input
          placeholder="ابحث عن اسم الشهيد.."
          className="bg-white border focus:border-secondary"
          icon={<CiSearch size={17} className="text-secondary" />}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            tableData.filter((story: StoryInterface) =>
              story.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }}
        />
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
        containerClassName="w-11/12 md:w-7/12 !lg:w-[20%]"
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

export default AllStoriesTable;
