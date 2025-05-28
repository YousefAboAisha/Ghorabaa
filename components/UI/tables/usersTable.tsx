"use client";
import { useEffect, useState } from "react";
import { UserInterface } from "@/app/interfaces";
import Image from "next/image";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Modal from "@/components/UI/modals/modal";
import TableSkeletonLoader from "../loaders/tableSkeletonLoader";
import { getRoleInArabic } from "@/utils/format";
import EditUser from "@/containers/dashboard/actions/editUser";
import { Role } from "@/app/enums";

const UsersTable = () => {
  const [tableData, setTableData] = useState<UserInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpenEditUser, setIsOpenEditUser] = useState<boolean>(false);
  const [userData, setuserData] = useState<UserInterface>();

  const fetchTableData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/fetchAll`
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
      return <TableSkeletonLoader />;
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
            {tableData?.map((user) => (
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
                    className={`w-fit p-1.5 px-2.5 rounded-md ${
                      user.role == Role.ADMIN
                        ? "bg-primary text-white"
                        : "bg-secondary text-white"
                    }`}
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
      <div className="overflow-x-auto">{renderTableContent()}</div>

      {/* Reject user Modal */}
      <Modal
        isOpen={isOpenEditUser}
        setIsOpen={setIsOpenEditUser}
        containerClassName="w-11/12 md:w-7/12 !lg:w-[20%]"
      >
        <EditUser
          data={userData!}
          refetchData={fetchTableData}
          setIsOpen={setIsOpenEditUser}
        />
      </Modal>
    </>
  );
};

export default UsersTable;
