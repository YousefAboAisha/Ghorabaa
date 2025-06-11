"use client";
import { useEffect, useMemo, useState } from "react";
import { ReportWithUserDataInterface } from "@/app/interfaces";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import Input from "../inputs/input";
import { CiSearch } from "react-icons/ci";
import ReportCard from "../cards/reportCard";
import ReportCardSkeltonLoader from "../loaders/reportCardSkeletonLoader";

const ReportsTable = () => {
  const [tableData, setTableData] = useState<ReportWithUserDataInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reports/fetch?page=${page}&limit=9`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("حدث خطأ أثناء جلب البيانات");
        }

        return res.json();
      })
      .then(({ data, pagination }) => {
        if (data && Array.isArray(data)) {
          console.log("pagination data", pagination);

          setTableData(data);
          console.log("table's data", data);

          setTotalPages(pagination.totalPages);
          console.log("table's pagination", pagination);
        } else setTableData([]);
        // You can also use pagination.totalPages if you want to render pages dynamically
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    router.push(`/admin/dashboard/reports?page=${page}`);
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [page]);

  const filteredData = useMemo(() => {
    return tableData.filter((report) =>
      report.reporter_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tableData]);

  const renderTableContent = () => {
    if (tableLoading) {
      return (
        <ReportCardSkeltonLoader length={6} className="!mt-8 cards-grid-3" />
      );
    }

    if (error) {
      return <ErrorMessage error={error as string} />;
    }

    if (filteredData.length <= 0) {
      return <NoDataMessage />;
    }

    if (filteredData && filteredData.length > 0) {
      return (
        <div className="cards-grid-3">
          {filteredData.map((report) => (
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
      <div className="w-full md:w-6/12 lg:w-5/12">
        <Input
          placeholder="ابحث عن اسم الشخص الذي قدم البلاغ.."
          className="bg-white border focus:border-secondary"
          icon={<CiSearch size={17} className="text-secondary" />}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            tableData.filter((report: ReportWithUserDataInterface) =>
              report.reporter_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          }}
        />
      </div>

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
