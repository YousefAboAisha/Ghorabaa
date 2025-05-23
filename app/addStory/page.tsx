"use client";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import TableSkeletonLoader from "@/components/UI/loaders/tableSkeletonLoader";
import AddStoryModal from "@/components/UI/modals/addStoryModal";
import Modal from "@/components/UI/modals/modal";
import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { StoryInterface } from "../interfaces";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<StoryInterface>();

  const handleSearch = () => {
    setLoading(true);

    // hasCompleteProfile=false query is to return all the stories [including the complete and non-complete profiles]
    fetch(
      `/api/story/search?query=${encodeURIComponent(
        searchQuery
      )}&hasCompleteProfile=false`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setSearchData(data);
        console.log("Data inside the useEffect", data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={"text-sm"}
      />

      <div className="container lg:w-6/12 mt-24 min-h-screen">
        <PageTitles />

        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <Heading
            title="إضافة قصة جديدة"
            details="قم بالبحث عن الشهيد المُراد إضافة قصة عنه"
            className="text-center"
          />

          <div className="relative w-full mt-8 overflow-hidden">
            <div className="relative w-full md:w-full border-none">
              <Input
                placeholder="أدخل رقم هوية الشهيد.."
                className="bg-white w-full border focus:border-secondary"
                type="text"
                icon={<BiSearch size={20} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>

            <div
              title="البحث عن الشهيد"
              className="absolute left-0 top-[50%] -translate-y-[50%] h-full bg-secondary text-white p-4 flex items-center justify-center rounded-l-xl cursor-pointer"
              onClick={handleSearch}
            >
              {loading ? (
                <AiOutlineLoading3Quarters size={17} className="animate-spin" />
              ) : (
                <BiSearch size={17} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full h-full mt-8">
            {loading ? (
              <TableSkeletonLoader />
            ) : searchData ? (
              <>
                <table className="min-w-full bg-white border border-gray-200 h-full">
                  <tbody>
                    <tr>
                      <td
                        colSpan={2}
                        className="py-3 px-4 border-b text-center text-sm border-l bg-gray-300"
                      >
                        المعلومات الشخصية
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        اسم الشهيد
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        محمد عبد الله حسب الله
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        رقم الهوية
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        407709260
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        الجنس
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        ذكر
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        تاريخ الميلاد
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        25 يناير 2002
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        تاريخ الاستشهاد
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        8 ديسمبر 2023
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        العمر
                      </td>

                      <td className="py-3 px-4 border-b text-right text-sm">
                        21 عاماً
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 border-b text-right text-sm border-l">
                        حالة الملف الشخصي
                      </td>

                      <td className="py-3 px-4 text-right text-sm">
                        {0 ? (
                          <div className="flex items-center gap-2">
                            <p className="w-fit p-2 rounded-md text-[12px] bg-primary text-white">
                              مكتمل
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="w-fit p-2 rounded-md text-[12px] bg-red-600 text-white">
                              غير مكتمل
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full md:w-4/12 mx-auto mt-3">
                  {searchData?.hasCompleteProfile ? (
                    <Link href={`/stories/${searchData?.id}`}>
                      <Button
                        title="عرض صفحة الشهيد"
                        className="bg-secondary text-white px-4"
                        icon={<FaEye />}
                      />
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      title="إضافة قصة للشهيد"
                      className="bg-secondary text-white px-4"
                      icon={<FiPlus />}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white border rounded-lg p-4 h-[30vh] w-full text-sm flex items-center justify-center">
                لا توجد نتائج للبحث!
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={isOpen} setIsOpen={setIsOpen} loading={loading}>
          <AddStoryModal setLoading={setLoading} setIsOpen={setIsOpen} />
        </Modal>
      </div>
    </>
  );
};

export default Page;
