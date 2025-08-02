"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { UserInterface } from "@/app/interfaces";
import { Role } from "@/app/enums";
import { UserRolesData } from "@/data/userRolesData";

import DashboardTableSkeletonLoader from "../loaders/dashboardTableSkeletonLoader";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import Pagination from "./pagination";
import Button from "../inputs/button";
import Modal from "@/components/UI/modals/modal";
import EditUser from "@/components/UI/modals/editUser";
import UserSearch from "../modals/userSearch";

import { getRoleColor, getRoleInArabic } from "@/utils/text";
import { CiSearch } from "react-icons/ci";

const UsersTable = () => {
  const [tableData, setTableData] = useState<UserInterface[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const [isOpenUserSearch, setIsOpenUserSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentRole, setCurrentRole] = useState<Role>(Role.ADMIN);

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/fetch?role=${currentRole}&page=${page}&limit=10`
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
        console.log("Fetched Users Data:", data);
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
    router.push(`/admin/dashboard/users?page=${page}`);
  }, []);

  // Refetch on role/page change
  useEffect(() => {
    fetchTableData();
  }, [currentRole, page]);

  const getBorderColor = (role: Role) => {
    if (role !== currentRole) return "";
    switch (role) {
      case Role.ADMIN:
        return "border-primary";
      case Role.EDITOR:
        return "border-blueColor";
      case Role.USER:
        return "border-secondary";
      default:
        return "";
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
              "اسم المستخدم",
              "البريد الالكتروني",
              "رقم الهاتف",
              "تاريخ الإنشاء",
              "نوع الحساب",
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
          {tableData.map((user, index) => (
            <tr key={user._id as string} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center text-sm text-gray-700">
                {(page - 1) * 10 + index + 1}
              </td>

              <td className="py-3 px-4 border-b text-right">
                <div className="relative w-12 h-12 overflow-hidden rounded">
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width:  768px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-b text-right text-sm text-gray-700 hover:underline">
                <Link
                  title="عرض المستخدم"
                  href={`/profile/${user._id}`}
                  target="_blank"
                >
                  {user.name}
                </Link>
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
              <td className="py-3 px-4 border-b text-right text-[12px]">
                <span
                  style={{ backgroundColor: getRoleColor(user.role) }}
                  className="w-fit p-1.5 px-2.5 rounded-sm text-white"
                >
                  {getRoleInArabic(user.role)}
                </span>
              </td>
              <td className="py-3 px-4 border-b text-right text-[12px]">
                <span
                  onClick={() => {
                    setUserData(user);
                    setIsOpenEditUser(true);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  تعديل البيانات
                </span>
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
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm mb-8">
        <div className="flex items-center gap-4 overflow-auto scrollbar-hidden">
          {UserRolesData.map(({ label, role }) => (
            <div
              key={role}
              title={label}
              className={`flex items-center gap-2 bg-white p-3 border rounded-md cursor-pointer duration-200 border-r-4 min-w-fit select-none ${getBorderColor(
                role
              )}`}
              onClick={() => {
                setPage(1);
                router.push(`/admin/dashboard/users?page=1`);
                setCurrentRole(role);
              }}
            >
              <p className="px-2">{label}</p>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-fit">
          <Button
            onClick={() => setIsOpenUserSearch(true)}
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
            router.push(`/admin/dashboard/users?page=${newPage}`);
          }
        }}
      />

      {/* Edit User Modal */}
      <Modal
        isOpen={isOpenEditUser}
        setIsOpen={setIsOpenEditUser}
        containerClassName="lg:w-[35%]"
        loading={loading}
      >
        {userData && (
          <EditUser
            data={userData}
            refetchData={fetchTableData}
            setIsOpen={setIsOpenEditUser}
            setLoading={setLoading}
          />
        )}
      </Modal>

      {/* Search Modal */}
      <Modal
        isOpen={isOpenUserSearch}
        setIsOpen={setIsOpenUserSearch}
        containerClassName="!lg:w-3/12"
      >
        <UserSearch />
      </Modal>
    </>
  );
};

export default UsersTable;
