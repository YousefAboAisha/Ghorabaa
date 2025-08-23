"use client";
import { useEffect, useState } from "react";
import { ReportWithUserDataInterface } from "@/app/interfaces";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import ReportCard from "../cards/reportCard";
import ReportCardSkeltonLoader from "../loaders/reportCardSkeletonLoader";

const ReportsTable = () => {
  const [tableData, setTableData] = useState<ReportWithUserDataInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/fetch?page=${page}&limit=9`
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
        setTableData(data);
        setTotalPages(pagination.totalPages);
      } else {
        setTableData([]);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setError(message);
      console.error("Error fetching reports table data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    router.push(`/admin/dashboard/reports?page=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderTableContent = () => {
    if (tableLoading) {
      return (
        <ReportCardSkeltonLoader length={6} className="!mt-8 cards-grid-3" />
      );
    }

    if (error) {
      return <ErrorMessage error={error as string} />;
    }

    if (tableData.length <= 0) {
      return <NoDataMessage />;
    }

    if (tableData && tableData.length > 0) {
      return (
        <div className="cards-grid-3">
          {tableData.map((report) => (
            <ReportCard
              key={report._id as string}
              data={report}
              refetchData={fetchTableData}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="mt-8">{renderTableContent()}</div>

      {/* Pagination is here */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (newPage !== page) {
            setPage(newPage);
            router.push(`/admin/dashboard/reports?page=${newPage}`);
          }
        }}
      />
    </>
  );
};

export default ReportsTable;
