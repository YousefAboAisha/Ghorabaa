"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MassacreInterface } from "@/app/interfaces";
import { MassacreStatus } from "@/app/enums";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Pagination from "./pagination";
import Button from "../inputs/button";
import Modal from "@/components/UI/modals/modal";
import { CiEdit, CiSearch } from "react-icons/ci";
import { BsArchive, BsPlus } from "react-icons/bs";
import MassacreSearch from "../modals/massacreSearch";
import ApproveMassacre from "../dialogs/approveMassacre";
import { GrCheckmark } from "react-icons/gr";
import ArchiveMassacre from "../dialogs/archiveMassacre";

const MassacresTable = () => {
  const [tableData, setTableData] = useState<MassacreInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [massacreData, setMassacreData] = useState<MassacreInterface | null>(
    null
  );

  const [isOpenMassacreSearch, setIsOpenMassacreSearch] = useState(false);

  const [isOpenMassacreApprove, setIsOpenMassacreApprove] = useState(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);

  const [isOpenMassacreArchive, setIsOpenMassacreArchive] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/massacres/fetch?status=${MassacreStatus.PENDING}&page=${page}&limit=10`,
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
        console.log("Fetched massacres Data:", data);
        console.log("Fetched Pagination Data:", pagination);

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
  };

  // Initial URL sync
  useEffect(() => {
    router.push(`/admin/dashboard/massacres?page=${page}`);
  }, []);

  // Refetch on role/page change
  useEffect(() => {
    fetchTableData();
  }, [page]);

  const renderTableActions = (massacre: MassacreInterface) => {
    const status = massacre.status;

    if (status == MassacreStatus.APPROVED)
      return (
        <>
          <BsArchive
            title="أرشفة المجزرة"
            className="cursor-pointer text-rejected"
            size={17}
            onClick={() => {
              setMassacreData(massacre);
              setIsOpenMassacreArchive(true);
            }}
          />

          <CiEdit
            title="تعديل البيانات"
            className="cursor-pointer"
            onClick={() => {
              router.push(
                `/admin/dashboard/massacres/editMassacre?id=${massacre._id}`
              );
            }}
            size={22}
          />
        </>
      );

    if (status == MassacreStatus.PENDING) {
      return (
        <>
          <GrCheckmark
            title="قبول المجزرة"
            className="cursor-pointer text-[green]"
            size={18}
            onClick={() => {
              setMassacreData(massacre);
              setIsOpenMassacreApprove(true);
            }}
          />

          <Link
            href={`/admin/dashboard/massacres/editMassacre/${massacre._id}`}
          >
            <CiEdit
              title="تعديل البيانات"
              className="cursor-pointer"
              size={22}
            />
          </Link>
        </>
      );
    }

    if (status == MassacreStatus.ARCHIVED) {
      return (
        <>
          <GrCheckmark
            title="قبول المجزرة"
            className="cursor-pointer text-[green]"
            size={18}
            onClick={() => {
              setMassacreData(massacre);
              setIsOpenMassacreApprove(true);
            }}
          />

          <Link
            href={`/admin/dashboard/massacres/editMassacre/${massacre._id}`}
          >
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
              "صورة الغلاف",
              "عنوان المجزرة",
              "تاريخ الحدوث",
              "المدينة",
              "الحي",
              "تاريخ النشر",
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
          {tableData.map((massacre: MassacreInterface) => (
            <tr key={massacre._id as string} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-right">
                <div className="relative w-14 h-14 rounded-sm overflow-hidden">
                  <Image
                    src={massacre.cover_image}
                    alt={massacre.title}
                    className="w-full"
                    fill
                  />
                </div>
              </td>

              <td className="py-3 px-4 border-b text-right text-sm text-gray-700 hover:underline">
                <Link
                  title="عرض المستخدم"
                  href={`/massacres/${massacre._id}`}
                  target="_blank"
                >
                  {massacre.title}
                </Link>
              </td>

              <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                {new Date(massacre.date).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </td>

              <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                {massacre.location.city || "غير محدد"}
              </td>

              <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                {massacre.location.neighborhood || "غير محدد"}
              </td>

              <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                {new Date(massacre.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>

              <td className="py-3 px-4 border-b text-right text-[12px]">
                {massacre.status === MassacreStatus.PENDING ? (
                  <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-pending">
                    قيد المراجعة
                  </span>
                ) : massacre.status === MassacreStatus.APPROVED ? (
                  <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-approved">
                    مقبولة
                  </span>
                ) : (
                  <span className="text-white text-[11px] p-1 px-2 rounded-sm bg-rejected">
                    مؤرشفة
                  </span>
                )}
              </td>

              <td className="py-3 px-4 border-b text-right">
                <div className="flex items-center gap-4">
                  {renderTableActions(massacre)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {/* Role Filter + Search */}
      <div className="flex items-center justify-between gap-4">
        <Link className="relative" href={"massacres/addMassacre"}>
          <div className="md:w-fit w-full">
            <Button
              title="مجزرة جديدة"
              className="px-6 w-full bg-primary text-white"
              icon={<BsPlus size={20} />}
            />
          </div>
        </Link>

        <div className="w-full lg:w-fit">
          <Button
            onClick={() => setIsOpenMassacreSearch(true)}
            title="البحث"
            className="bg-secondary text-white px-4"
            icon={<CiSearch size={20} />}
          />
        </div>
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
            router.push(`/admin/dashboard/massacres?page=${newPage}`);
          }
        }}
      />

      {/* Search Modal */}
      <Modal
        isOpen={isOpenMassacreSearch}
        setIsOpen={setIsOpenMassacreSearch}
        containerClassName="!lg:w-3/12"
      >
        <MassacreSearch />
      </Modal>

      {/* Approve massacre Modal */}
      <Modal
        isOpen={isOpenMassacreApprove}
        setIsOpen={setIsOpenMassacreApprove}
        containerClassName="lg:w-[25%]"
        loading={approveLoading}
      >
        <ApproveMassacre
          data={massacreData!}
          setIsOpen={setIsOpenMassacreApprove}
          refetchData={fetchTableData}
          setLoading={setApproveLoading}
          loading={approveLoading}
        />
      </Modal>

      {/* Archive massacre Modal */}
      <Modal
        isOpen={isOpenMassacreArchive}
        setIsOpen={setIsOpenMassacreArchive}
        containerClassName="lg:w-[25%]"
        loading={approveLoading}
      >
        <ArchiveMassacre
          data={massacreData!}
          setIsOpen={setIsOpenMassacreArchive}
          refetchData={fetchTableData}
          setLoading={setArchiveLoading}
          loading={archiveLoading}
        />
      </Modal>
    </>
  );
};

export default MassacresTable;
