"use client";
import { useEffect, useState } from "react";
import { ReportInterface } from "@/app/interfaces";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import {
  getContentColor,
  getContentTypeInArabic,
  getReportColor,
  getReportReasonLabel,
  getReportStatusInArabic,
} from "@/utils/text";
import ReportPreview from "../modals/reporPreview";

const ReportsTable = () => {
  const [tableData, setTableData] = useState<ReportInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenReportPreview, setIsOpenReportPreview] =
    useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportInterface>();

  const fetchTableData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/report/fetchAll`
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
      return <DashboardTableSkeletonLoader />;
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
              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                عنوان القصة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                سبب الإبلاغ
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                تاريخ الإبلاغ
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                نوع المحتوى
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                الحالة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[13px] font-medium">
                العمليات
              </th>
            </tr>
          </thead>

          <tbody>
            {tableData?.map((report) => (
              <tr key={report._id as string} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-[13px] text-right">
                  {report.content_name || "مستخدم غير معروف"}
                </td>

                <td className="py-3 px-4 border-b text-right text-[13px]">
                  {getReportReasonLabel(report.reason)}
                </td>

                <td className="py-3 px-4 border-b text-right text-[13px]">
                  {new Date(report.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td className={`py-3 px-4 border-b text-right text-[13px]`}>
                  {report.content_type && (
                    <p
                      style={{
                        backgroundColor: getContentColor(report.content_type),
                      }}
                      className={`w-fit p-1.5 px-2.5 rounded-sm text-white`}
                    >
                      {getContentTypeInArabic(report.content_type)}
                    </p>
                  )}
                </td>

                <td className={`py-3 px-4 border-b text-right text-[13px]`}>
                  <p
                    className={`w-fit p-1.5 px-2.5 rounded-sm text-white ${getReportColor(
                      report.status
                    )}`}
                  >
                    {getReportStatusInArabic(report.status)}
                  </p>
                </td>

                <td className="py-3 px-4 border-b text-right text-[13px]">
                  <p
                    onClick={() => {
                      setIsOpenReportPreview(true);
                      setReportData(report);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    مُراجعة الإبلاغ
                  </p>
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

      {/* Edit user Modal */}
      <Modal
        isOpen={isOpenReportPreview}
        setIsOpen={setIsOpenReportPreview}
        containerClassName="lg:w-[35%]"
        loading={loading}
      >
        <ReportPreview
          setIsOpen={setIsOpenReportPreview}
          data={reportData!}
          setLoading={setLoading}
        />
      </Modal>
    </>
  );
};

export default ReportsTable;
