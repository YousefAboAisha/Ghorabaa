"use client";
import { useEffect, useMemo, useState } from "react";
import { UserInterface } from "@/app/interfaces";
import Image from "next/image";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import EditUser from "@/components/UI/modals/editUser";
import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import { getRoleColor, getRoleInArabic } from "@/utils/text";
import Input from "../inputs/input";
import { CiSearch } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";

const UsersTable = () => {
  const [tableData, setTableData] = useState<UserInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenEditUser, setIsOpenEditUser] = useState<boolean>(false);
  const [userData, setuserData] = useState<UserInterface>();
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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/fetch?page=${page}&limit=10`
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
      console.error("Error fetching users table data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    router.push(`/admin/dashboard/users?page=${page}`);
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [page]);

  const filteredData = useMemo(() => {
    return tableData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tableData]);

  const renderTableContent = () => {
    if (tableLoading) {
      return <DashboardTableSkeletonLoader />;
    }

    if (error) {
      return <ErrorMessage error={error as string} />;
    }

    if (filteredData.length <= 0) {
      return <NoDataMessage />;
    }

    if (filteredData && filteredData.length > 0) {
      return (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                الصورة
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                اسم المستخدم
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                البريد الالكتروني
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                رقم الهاتف
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                تاريخ الإنشاء
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                نوع الحساب
              </th>

              <th className="py-3 px-4 border-b text-right text-sm text-[12px] font-medium">
                العمليات
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((user) => (
              <tr key={user._id as string} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-right">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-full border"
                  />
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {user.name}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {user.email || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {user.phone_number || "غير محدد"}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td className={`py-3 px-4 border-b text-right text-[12px]`}>
                  <p
                    style={{
                      backgroundColor: getRoleColor(user.role),
                    }}
                    className={`w-fit p-1.5 px-2.5 rounded-sm text-white`}
                  >
                    {getRoleInArabic(user.role)}
                  </p>
                </td>

                <td className="py-3 px-4 border-b text-right text-[12px]">
                  <p
                    onClick={() => {
                      setIsOpenEditUser(true);
                      setuserData(user);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    تعديل البيانات
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
      <div className="w-full md:w-6/12 lg:w-5/12">
        <Input
          placeholder="ابحث عن اسم المستخدم.."
          className="bg-white border focus:border-secondary "
          icon={<CiSearch size={20} className="text-secondary" />}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            tableData.filter((user: UserInterface) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }}
        />
      </div>

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
            router.push(`/admin/dashboard/users?page=${newPage}`);
          }
        }}
      />

      {/* Edit user Modal */}
      <Modal
        isOpen={isOpenEditUser}
        setIsOpen={setIsOpenEditUser}
        containerClassName="lg:w-[35%]"
        loading={loading}
      >
        <EditUser
          data={userData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenEditUser}
          setLoading={setLoading}
        />
      </Modal>
    </>
  );
};

export default UsersTable;
