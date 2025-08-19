"use client";
import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import { ImageListType } from "react-images-uploading";
import { EventInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EventValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import SingleImageUploader from "../imageUploaders/singleImageUploader";
import MassacreFormLoader from "../loaders/massacreFormLoader";
import { extractMartyrStoryKeywords } from "@/utils/extractTags";

type EventFormProps = {
  id?: string; // For edit mode
  initialData?: EventInterface | null;
};

const EventForm = ({ id, initialData }: EventFormProps) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!id); // Loading state for edit mode
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<Partial<EventInterface>>({
    title: "",
    start_date: "",
    end_date: "",
    location: {
      city: "",
      neighborhood: "",
    },
    details: "",
    keywords: [],
    image: "",
  });

  // Fetch data for edit mode
  useEffect(() => {
    if (id && !initialData) {
      const fetchStoryData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/events/fetch/${id}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("حدث خطأ أثناء جلب بيانات القصة");
          }

          const data = await response.json();

          if (data) {
            console.log("Fetched event data:", data);
            setInitialValues({
              ...initialValues,
              ...data,
              title: data.title || "",
              end_date: data.end_date
                ? new Date(data.end_date).toISOString().split("T")[0]
                : "",
              start_date: data.start_date
                ? new Date(data.start_date).toISOString().split("T")[0]
                : "",
              location: {
                city: data.city || "",
                neighborhood: data.neighborhood || "",
              },
              bio: data.bio || "",
              keywords: data.keywords || [],
              image: data.image || "",
            });

            if (data.image) {
              setImages([{ data_url: data.image }]);
            }

            // Set cities if city exists
            if (data.city) {
              const cityObj = CitiesData.find(
                (city) => city[data.city as keyof typeof city]
              );
              setCities(
                cityObj ? cityObj[data.city as keyof typeof cityObj] || [] : []
              );
            }
          }
        } catch (error) {
          console.error("Error fetching story data:", error);
          toast.error("Failed to load story data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchStoryData();
    } else if (initialData) {
      // Use provided initialData
      setInitialValues((prev) => ({
        ...prev,
        ...initialData,
      }));
      if (initialData.image) {
        setImages([{ data_url: initialData.image }]);
      }
      if (initialData.location.city) {
        const cityObj = CitiesData.find(
          (city) => city[initialData.location.city as keyof typeof city]
        );
        setCities(
          cityObj
            ? cityObj[initialData.location.city as keyof typeof cityObj] || []
            : []
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, initialData]);

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setFormErrors("");
    setSubmitting(true);
    setUploadError(null);

    try {
      let imageUrl = values.image || "";

      // Upload new image if present
      if (images.length > 0 && images[0].file) {
        const formData = new FormData();
        formData.append("image", images[0].file);

        const imageUploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/events`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (!imageUploadRes.ok) {
          const errorData = await imageUploadRes.json().catch(() => ({}));
          throw new Error(errorData?.error || "فشل رفع الصورة");
        }

        const uploadData = await imageUploadRes.json();
        imageUrl = uploadData.url;
      }

      // Determine if we're creating or updating
      const isEditMode = !!id;
      const endpoint = isEditMode
        ? `/admin/events/update/${id}`
        : `/admin/events/create`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...values,
            image: imageUrl,
          }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const errorMsg = data?.error || "حدث خطأ أثناء حفظ بيانات القصة";
        throw new Error(errorMsg);
      }

      toast.success(
        isEditMode
          ? "تم تحديث الفعالية بنجاح!"
          : "تمت إضافة فعالية جديدة بنجاح!"
      );

      setTimeout(() => {
        router.push(
          isEditMode ? `/admin/dashboard/events` : `/events/${data?.data?._id}`
        );
      }, 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Error saving story:", message);
      setFormErrors(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <MassacreFormLoader />;
  }

  return (
    <div className="relative flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={EventValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          console.log("Errors:", errors);
          console.log("Form Values", values);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [tags, setTags] = useState<string[]>(values.keywords || []);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const timeout = setTimeout(() => {
              if (values.details && values.details.length > 20) {
                const extractedTags = extractMartyrStoryKeywords(
                  values.details
                );
                console.log("Extracted Tags:", extractedTags);
                setTags(extractedTags);
                setFieldValue("keywords", extractedTags); // Also update Formik's tags field
              } else {
                setTags([]);
                setFieldValue("keywords", []);
              }
            }, 400); // debounce

            return () => clearTimeout(timeout);
          }, [values.details, setFieldValue]);

          return (
            <Form className="flex flex-col gap-8 w-full">
              <div className="relative flex flex-col gap-4 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="فعالية جديدة"
                  className="mb-6 !text-2xl !mx-auto"
                />

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="title"
                    as={Input}
                    type="text"
                    placeholder="أدخل عنوان الفعالية"
                    label="عنوان الفعالية"
                    className={`focus:border-secondary`}
                    aria-label="عنوان الفعالية"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="start_date"
                      as={Input}
                      type="date"
                      label="بداية الفعالية"
                      placeholder="تاريخ بداية الفعالية"
                      required={true}
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="end_date"
                      as={Input}
                      type="date"
                      label="بداية الفعالية"
                      placeholder="تاريخ نهاية الفعالية"
                      required={true}
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City and Neighbourhood Fields */}
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="المدينة"
                      options={CountriesData}
                      value={values?.location?.city}
                      title="اختر المدينة"
                      onChange={(e) => {
                        const selectedCity = e.target.value;
                        setFieldValue("location.city", selectedCity);

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
                      className={`focus:border-secondary`}
                    />
                    <ErrorMessage
                      name="location.city"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="الحي"
                      options={cities}
                      value={values?.location?.neighborhood}
                      title="اختر الحي"
                      onChange={(e) =>
                        setFieldValue("location.neighborhood", e.target.value)
                      }
                      className={`focus:border-secondary`}
                    />
                    <ErrorMessage
                      name="location.neighborhood"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* Notes Field with Word Counter */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="details"
                    as={TextArea}
                    placeholder="قم بإدخال تفاصيل الفعالية"
                    label="تفاصيل الفعالية"
                    className={`w-full focus:border-secondary`}
                  />
                  {/* Word Counter */}

                  <div className="flex justify-between mt-1">
                    <ErrorMessage
                      name="details"
                      component="div"
                      className="text-red-500 font-semibold text-[10px]"
                    />

                    <div className="text-[10px] text-gray-500 self-end">
                      عدد الكلمات:{" "}
                      {values.details?.trim().split(/\s+/).filter(Boolean)
                        .length || 0}{" "}
                      / 200
                    </div>
                  </div>

                  {tags && tags?.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      {tags.map((keywrod, index) => {
                        return (
                          <div
                            key={index}
                            className="border bg-[#5b913b40] rounded-xl p-1.5 px-3 text-[10px]"
                          >
                            #{keywrod}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <SingleImageUploader
                  images={images}
                  setImages={setImages}
                  setFieldValue={setFieldValue}
                  uploadError={uploadError}
                  setUploadError={setUploadError}
                  isSubmitting={isSubmitting}
                  existingImageUrl={initialValues.image}
                />
              </div>

              {/* Submit Button */}
              <Button
                title={id ? "تحديث القصة" : "إرسال"}
                type="submit"
                className="bg-secondary w-full hover:shadow-lg text-sm"
                icon={<BiSend className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
              />

              {formErrors && (
                <div className="text-rejected text-sm">
                  <p className="rounded-lg p-4 w-full bg-red-100 text-rejected">
                    {formErrors}
                  </p>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EventForm;
