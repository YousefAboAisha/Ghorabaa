"use client";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Modal from "@/components/UI/modals/modal";
import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";
import AddStoryModal from "@/containers/addStory/addStoryModal";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalopen, setIsModalopen] = useState<boolean>(false);

  return (
    <div className="container lg:w-6/12 mt-24 min-h-screen">
      <PageTitles />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Heading
          title="إضافة قصة جديدة"
          details="قم بالبحث عن الشهيد المُراد إضافة قصة عنه"
          className="text-center"
        />

        <div className="flex items-center justify-between w-full mt-8 gap-4">
          <div className="relative w-full md:w-full">
            <Input
              placeholder="أدخل رقم هوية الشهيد.."
              className="bg-white w-full border focus:border-secondary"
              type="text"
              icon={<BiSearch size={20} />}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          <div className="w-2/12 md:3/12 min-w-fit ">
            <Button
              title={loading ? "جارٍ البحث" : "بحث"}
              className="bg-secondary text-white h-[48px] w-full px-4 text-[14px]"
              icon={<BiSearch size={16} />}
              loading={loading}
              disabled={loading}
              hasShiningBar={false}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full h-full mt-8">
          <table className="min-w-full bg-white border border-gray-200 h-full">
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  className="py-3 px-4 border-b text-center text-sm border-l bg-gray-300 font-semibold"
                >
                  المعلومات الشخصية
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  اسم الشهيد
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  محمد عبد الله حسب الله
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  رقم الهوية
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  407709260
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  الجنس
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">ذكر</td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  تاريخ الميلاد
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  25 يناير 2002
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  تاريخ الاستشهاد
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  8 ديسمبر 2023
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  العمر
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
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

                      <Link
                        href={"/martyrs/1"}
                        className="text-secondary font-bold text-[13px] cursor-pointer hover:underline"
                      >
                        (عرض ملف الشهيد)
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="w-fit p-2 rounded-md text-[12px] bg-red-600 text-white">
                        غير مكتمل
                      </p>
                      <p
                        title="إضافة قصة للشهيد"
                        className="text-secondary font-semibold text-[13px] cursor-pointer hover:underline"
                        onClick={() => {
                          setIsModalopen(true);
                        }}
                      >
                        (إضافة قصة للشهيد)
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalopen} setIsOpen={setIsModalopen}>
        <AddStoryModal />
      </Modal>
    </div>
  );
};

export default Page;
