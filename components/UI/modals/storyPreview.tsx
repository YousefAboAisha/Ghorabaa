"use client";
import { StoryInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CitiesData } from "@/data/citiesData";
import { CountriesData } from "@/data/countriesData";
import { useStatisticsStore } from "@/stores/storiesTableStore";
import { dateConversion } from "@/utils/format";
import { StoryPreviewValidationSchema } from "@/utils/validators";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { toast } from "react-toastify";

type StoryPreviewProps = {
  data: StoryInterface & { publisher_name: string };
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const StoryPreview = ({ data, refetchData, setIsOpen }: StoryPreviewProps) => {
  const { fetchStatistics } = useStatisticsStore();

  const city = data?.city;
  const neighborhood = data?.neighborhood;
  const bio = data?.bio;
  const story_id = data?._id;
  const nickname = data?.nickname;

  const initialValues = {
    bio: bio || "",
    city: city || "",
    neighborhood: neighborhood || "",
    nickname: nickname || "",
  };

  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);

  useEffect(() => {
    if (city) {
      const cityObj = CitiesData.find((c) => c[city as keyof typeof c]);

      setCities(cityObj ? cityObj[city as keyof typeof cityObj] || [] : []);
    }
  }, [city]);

  return (
    <div className="relative p-8 flex flex-col gap-2">
      {/* <Heading title="قبول/تعديل القصة" className="mb-4 mx-auto !text-2xl" /> */}

      <div className="relative flex flex-col justify-center items-start w-full min-h-[50vh] bg-secondary rounded-2xl">
        <Image
          src={data?.image || "/notFound.png"}
          alt="صورة الشهيد"
          width={250}
          height={250}
          className="mx-auto z-[10] max-h-[60vh] object-cover rounded-2xl shadow-xl"
          priority
          quality={100}
        />
      </div>

      <div className="flex items-center flex-wrap gap-2 font-light text-[12px] mt-1">
        <p>بواسطة: </p>
        <p>{data?.publisher_name}</p>
        <p> | </p>
        <p>{dateConversion(data?.createdAt)}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold flex items-center gap-2 flex-wrap">
              {data?.name}{" "}
              <p className="text-gray_dark text-sm"> [ {data?.nickname} ] </p>
            </h2>

            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              {data?.social_media?.facebook && (
                <Link
                  href={data.social_media.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={14} className="text-blue-500" />
                </Link>
              )}

              {data?.social_media?.x && (
                <Link
                  href={data.social_media.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter size={14} />
                </Link>
              )}

              {data?.social_media?.instagram && (
                <Link
                  href={data.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={14} className="text-[#a3244f]" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={StoryPreviewValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stories/status/approve/${story_id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    credential: "include",
                  },
                  body: JSON.stringify({
                    ...values,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to update the story.");
              }

              const result = await res.json();
              console.log("✅ Story updated:", result);
              setIsOpen(false); // Close the preview modal
              refetchData?.(); // Refetch the data after successful update
              fetchStatistics();
              toast.success("تم تحديث ونشر القصة بنجاح!");
              // Optionally show a toast or redirect
            } catch (error) {
              console.error("❌ Error updating story:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => {
            console.log("Errors:", errors);
            console.log("Form Values", values);

            return (
              <Form className="flex flex-col gap-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City and Neighbourhood Fields */}
                  <div>
                    <Select
                      value={values.city}
                      disabled={isSubmitting}
                      options={CountriesData}
                      title="اختر المدينة"
                      label="المدينة"
                      onChange={(e) => {
                        const selectedCity = e.target.value;
                        setFieldValue("city", selectedCity);

                        // Find the city object that contains the selected city
                        const cityObj = CitiesData.find(
                          (city) => city[selectedCity as keyof typeof city]
                        );

                        // If found, update the cities state
                        setCities(
                          cityObj
                            ? cityObj[selectedCity as keyof typeof cityObj] ||
                                []
                            : []
                        );
                      }}
                      className={`focus:border-primary`}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  <div>
                    <Select
                      value={values.neighborhood}
                      disabled={isSubmitting}
                      label="الحي"
                      options={cities}
                      title="اختر الحي"
                      onChange={(e) =>
                        setFieldValue("neighborhood", e.target.value)
                      }
                      className={`focus:border-primary`}
                    />
                    <ErrorMessage
                      name="neighborhood"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* Notes Field with Word Counter */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="bio"
                    as={TextArea}
                    placeholder="عن حياة الشهيد..."
                    label="السيرة الذاتية"
                    className={`w-full focus:border-primary text-sm font-light`}
                    rows={20}
                  />

                  {/* Word Counter */}
                  <div className="flex justify-between mt-1">
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-500 font-semibold text-[10px]"
                    />

                    <div className="text-[10px] text-gray-500 self-end">
                      عدد الكلمات:{" "}
                      {values.bio?.trim().split(/\s+/).filter(Boolean).length ||
                        0}{" "}
                      / 200
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    title="نشر القصة"
                    className="bg-primary text-white"
                    disabled={isSubmitting}
                    icon={<MdPostAdd size={18} />}
                    loading={isSubmitting}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default StoryPreview;
