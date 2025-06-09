"use client";
import Button from "@/components/UI/inputs/button";
import TableSkeletonLoader from "@/components/UI/loaders/tableSkeletonLoader";
import Modal from "@/components/UI/modals/modal";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { StoryInterface } from "../interfaces";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Input from "@/components/UI/inputs/input";
import { arabicDateConversion } from "@/utils/format";
import AddStoryForm from "@/components/UI/Forms/addStoryForm";
import { getGenderLabel } from "@/utils/text";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<StoryInterface | null>();
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    id_number: "",
  };

  const validationSchema = Yup.object({
    id_number: Yup.string()
      .required("يرجى إدخال رقم الهوية")
      .matches(/^\d{9}$/, "يجب أن يتكون رقم الهوية من 9 أرقام بالضبط"),
  });

  const fetchStoryDetails = async (searchQuery: string) => {
    setLoading(true);
    setSearchData(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/stories/searchByIdNumber?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          credentials: "include",
        }
      );

      console.log("Data search respones", response.statusText);

      if (!response.ok) {
        throw new Error("لم يتم العثور على نتائج!");
      }

      const result = await response.json();
      if (result && result.data) {
        setSearchData(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to search data:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("حدث خطأ غير متوقع!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="container lg:w-6/12 mt-32 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <Heading
          title="إضافة قصة جديدة"
          details="قم بالبحث عن الشهيد المُراد إضافة قصة عنه"
          className="text-center"
        />

        <div className="relative w-full overflow-hidden">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              fetchStoryDetails(values.id_number).finally(() =>
                setSubmitting(false)
              );
            }}
          >
            {({ isSubmitting, errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-4">
                <div className="relative w-full overflow-hidden">
                  <div className="relative w-full md:w-full border-none">
                    <Field
                      name="id_number"
                      placeholder="أدخل رقم هوية الشهيد.."
                      className="bg-white w-full border focus:border-secondary"
                      as={Input}
                      type="text"
                      icon={<BiSearch size={20} />}
                      aria-label="رقم الهوية"
                      aria-invalid={!!errors.id_number}
                    />

                    {/* Trigger Formik's validation + submit */}
                    <button
                      type="submit"
                      title="البحث عن الشهيد"
                      className="absolute left-0 top-[50%] -translate-y-[50%] h-full bg-secondary text-white p-4 flex items-center justify-center rounded-l-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <AiOutlineLoading3Quarters
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <BiSearch size={17} />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="id_number"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                {error && (
                  <div className="gap-1 text-[red] bg-red-200 w-fit p-1.5 px-2.5 rounded-md text-[12px] mt-2">
                    {error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
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
                      {searchData.name}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      رقم الهوية
                    </td>

                    <td className="py-3 px-4 border-b text-right text-sm">
                      {searchData.id_number}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      الجنس
                    </td>

                    <td className="py-3 px-4 border-b text-right text-sm">
                      {getGenderLabel(searchData.gender)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      تاريخ الميلاد
                    </td>

                    <td className="py-3 px-4 border-b text-right text-sm">
                      {searchData.birth_date &&
                        arabicDateConversion(new Date(searchData.birth_date))}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      تاريخ الاستشهاد
                    </td>

                    <td className="py-3 px-4 border-b text-right text-sm">
                      {searchData.birth_date &&
                        arabicDateConversion(new Date(searchData.death_date))}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      العمر
                    </td>

                    <td className="py-3 px-4 border-b text-right text-sm">
                      {searchData.age} عاماً
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 border-b text-right text-sm border-l">
                      حالة الملف الشخصي
                    </td>

                    <td className="py-3 px-4 text-right text-sm">
                      {searchData.hasCompleteProfile ? (
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
                  <Link href={`/stories/${searchData?._id}`}>
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
        <AddStoryForm
          setLoading={setLoading}
          setIsOpen={setIsOpen}
          id_number={searchData?.id_number as string}
        />
      </Modal>
    </div>
  );
};

export default Page;
