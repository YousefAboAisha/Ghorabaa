"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MartyrName, MissingInterface } from "@/app/interfaces";
import { ContentType, MissingStatus } from "@/app/enums";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Pagination from "./pagination";
import Button from "../inputs/button";
import Modal from "@/components/UI/modals/modal";
import { CiEdit, CiSearch } from "react-icons/ci";
import { BsArchive, BsPlus } from "react-icons/bs";
import { GrCheckmark } from "react-icons/gr";
import Input from "../inputs/input";
import ApproveDialog from "../dialogs/approve";
import ArchiveDialog from "../dialogs/archive";
import { getFullName } from "@/utils/text";

const MissingsTable = () => {
  const [tableData, setTableData] = useState<MissingInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [missingData, setMissingData] = useState<MissingInterface | null>(null);

  const [isOpenMissingApprove, setIsOpenMissingApprove] = useState(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);

  const [isOpenMissingArchive, setIsOpenMissingArchive] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/admin/missings/fetch?&page=${page}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}`,
        { cache: "no-store" }
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

      if (Array.isArray(data)) {
        setTableData(data);
        setTotalPages(pagination.totalPages);
      } else {
        setTableData([]);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
    } finally {
      setTableLoading(false);
    }
  }, [page, searchQuery]);

  // Initial URL sync
  useEffect(() => {
    router.push(`/admin/dashboard/missings?page=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch on role/page change
  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderTableActions = (missing: MissingInterface) => {
    const status = missing.status;

    if (status == MissingStatus.APPROVED)
      return (
        <>
          <BsArchive
            title="أرشفة البلاغ"
            className="cursor-pointer text-rejected"
            size={17}
            onClick={() => {
              setMissingData(missing);
              setIsOpenMissingArchive(true);
            }}
          />

          <CiEdit
            title="تعديل البيانات"
            className="cursor-pointer"
            onClick={() => {
              router.push(
                `/admin/dashboard/missings/editMissing/${missing._id}`
              );
            }}
            size={22}
          />
        </>
      );

    if (status == MissingStatus.PENDING) {
      return (
        <>
          <GrCheckmark
            title="قبول البلاغ"
            className="cursor-pointer text-[green]"
            size={18}
            onClick={() => {
              setMissingData(missing);
              setIsOpenMissingApprove(true);
            }}
          />

          <Link href={`/admin/dashboard/missings/editMissing/${missing._id}`}>
            <CiEdit
              title="تعديل البيانات"
              className="cursor-pointer"
              size={22}
            />
          </Link>
        </>
      );
    }

    if (status == MissingStatus.ARCHIVED) {
      return (
        <>
          <GrCheckmark
            title="قبول البلاغ"
            className="cursor-pointer text-[green]"
            size={18}
            onClick={() => {
              setMissingData(missing);
              setIsOpenMissingApprove(true);
            }}
          />

          <Link href={`/admin/dashboard/missings/editMissing/${missing._id}`}>
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
    if (tableLoading) return <DashboardTableSkeletonLoader />;
    if (error) return <ErrorMessage error={error} />;
    if (tableData.length === 0) return <NoDataMessage />;

    return (
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {[
              "#",
              "الصورة",
              "اسم المفقود",
              "تاريخ الاختفاء",
              "المدينة",
              "الحي",
              "تاريخ البلاغ",
              "الحالة",
              "العمليات",
            ].map((title, i) => (
              <th
                key={i}
                className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((missing: MissingInterface, index) => {
            const fullName = getFullName(missing?.title);

            return (
              <tr key={missing._id as string} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-center text-sm text-gray-700">
                  {(page - 1) * 10 + index + 1}
                </td>

                <td className="py-3 px-4 border-b text-right">
                  <div className="relative w-12 h-12 overflow-hidden rounded">
                    <Image
                      src={missing.image}
                      alt={fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width:  768px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700 hover:underline">
                  <Link
                    title="عرض البلاغ"
                    href={`/missings/${missing._id}`}
                    target="_blank"
                  >
                    {fullName}
                  </Link>
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {new Date(missing.missing_date).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {missing.location.city || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {missing.location.neighborhood || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {new Date(missing.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td className="py-3 px-4 border-b text-right text-[12px]">
                  {missing.status === MissingStatus.PENDING ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-pending">
                      قيد المراجعة
                    </span>
                  ) : missing.status === MissingStatus.APPROVED ? (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-approved">
                      مقبول
                    </span>
                  ) : (
                    <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-rejected">
                      مؤرشف
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 border-b text-right">
                  <div className="flex items-center gap-4">
                    {renderTableActions(missing)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchTableData();
      } else if (searchQuery.length === 0) {
        fetchTableData();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <>
      {/* Search + Add New */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="البحث عن شخص مفقود"
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

        <Link className="relative min-w-fit" href={"/addMissing"}>
          <div className="md:w-fit w-full">
            <Button
              title="بلاغ جديد"
              className="px-6 w-full bg-secondary text-white"
              icon={<BsPlus size={20} />}
            />
          </div>
        </Link>
      </div>

      {/* Table */}
      <div className="relative mt-8 overflow-x-auto">
        {renderTableContent()}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (newPage !== page) {
            setPage(newPage);
            router.push(`/admin/dashboard/missings?page=${newPage}`);
          }
        }}
      />

      {/* Approve Missing Person Report Modal */}
      <Modal
        isOpen={isOpenMissingApprove}
        setIsOpen={setIsOpenMissingApprove}
        containerClassName="lg:w-[25%]"
        loading={approveLoading}
      >
        <ApproveDialog
          content_id={missingData?._id as string}
          content_title={getFullName(missingData?.title as MartyrName)}
          setIsOpen={setIsOpenMissingApprove}
          refetchData={fetchTableData}
          setLoading={setApproveLoading}
          loading={approveLoading}
          content_type={ContentType.MISSING}
        />
      </Modal>

      {/* Archive Missing Person Report Modal */}
      <Modal
        isOpen={isOpenMissingArchive}
        setIsOpen={setIsOpenMissingArchive}
        containerClassName="lg:w-[30%]"
        loading={archiveLoading}
      >
        <ArchiveDialog
          content_id={missingData?._id as string}
          content_title={getFullName(missingData?.title as MartyrName)}
          setIsOpen={setIsOpenMissingArchive}
          refetchData={fetchTableData}
          setLoading={setArchiveLoading}
          loading={archiveLoading}
          content_type={ContentType.MISSING}
        />
      </Modal>
    </>
  );
};

export default MissingsTable;
