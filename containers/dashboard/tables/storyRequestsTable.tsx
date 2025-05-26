"use client";
import { useEffect, useState } from "react";
import ShowDetailsButton from "../showDetailsButton";
import { StoryInterface } from "@/app/interfaces";
import TableLoader from "./tableLoader";
import Image from "next/image";
import { StoryStatus } from "@/app/enums";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import StoryPreview from "../storyPreview";
// import UserPreview from "./userPreview";

const StoryRequestsTable = () => {
  const [tableData, setTableData] = useState<
    (StoryInterface & { publisher_name: string })[]
  >([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpenStoryPreview, setIsOpenStoryPreview] = useState<boolean>(false);
  // const [isOpenUserPreview, setIsOpenUserPreview] = useState<boolean>(false);
  // const [userData, setUserData] = useState<UserInterface>();
  const [storyData, setStoryData] = useState<
    StoryInterface & { publisher_name: string }
  >();

  const fetchTableData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/story/fetchAll`
      );
      const res = await response.json();
      console.log("[ADMIN] All Stories Data", res);

      if (response.ok && Array.isArray(res.data)) {
        setTableData(res.data);
      } else {
        console.error("Unexpected response structure:", res);
        setTableData([]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const renderTableContent = () => {
    if (tableLoading) {
      return <TableLoader />;
    }

    if (error) {
      return <ErrorMessage message={error as string} />;
    }

    if (tableData.length === 0) {
      return <NoDataMessage />;
    }

    if (tableData && tableData.length > 0) {
      return (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الناشر
              </th> */}

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
                {/* <td
                  onClick={() => {
                    setIsOpenUserPreview(true);
                    setIsOpenStoryPreview(false);
                  }}
                  className="py-3 px-4 border-b text-right text-sm text-gray-700 hover:underline cursor-pointer"
                >
                  {story.publisher_name}
                </td> */}

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {story.name}
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
                  <div
                    onClick={() => {
                      setIsOpenStoryPreview(true);
                      setStoryData(story);
                    }}
                  >
                    <ShowDetailsButton story_id={story._id as string} />
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
      <Modal isOpen={isOpenStoryPreview} setIsOpen={setIsOpenStoryPreview}>
        <StoryPreview
          data={storyData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenStoryPreview}
        />
      </Modal>

      {/* <Modal isOpen={isOpenUserPreview} setIsOpen={setIsOpenUserPreview}>
        <UserPreview />
      </Modal> */}
    </>
  );
};

export default StoryRequestsTable;
