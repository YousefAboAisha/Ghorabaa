"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiSend, BiUser } from "react-icons/bi";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import { FaQuoteLeft, FaTimes } from "react-icons/fa";
import { MassacreInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { MassacresValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import { useRouter } from "next/navigation";
import { BsPlus } from "react-icons/bs";
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";
import MultiImageUploader from "../imageUploaders/multiImageUploader";
import MassacreFormLoader from "../loaders/massacreFormLoader";

type MassacreFormProps = {
  id?: string; // For edit mode
  initialData?: MassacreInterface | null;
};

const MassacreForm = ({ id, initialData }: MassacreFormProps) => {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!!id); // Loading state for edit mode
  const [images, setImages] = useState<
    Record<string, { data_url: string; image_url: string }>
  >({});

  const [uploadStatus, setUploadStatus] = useState<{
    loading: boolean;
    progress: number;
    error: string | null;
  }>({ loading: false, progress: 0, error: null });

  const publisherRef = useRef<HTMLInputElement>(null);
  const reactionRef = useRef<HTMLTextAreaElement>(null);

  const [initialValues, setInitialValues] = useState<
    Partial<MassacreInterface>
  >({
    cover_image: "",
    title: "",
    date: "",
    location: {
      city: "",
      neighborhood: "",
    },
    description: "",
    media: [],
    deaths: undefined,
    injuries: undefined,
    destroyedHouses: undefined,
    tags: [],
    internationalReactions: [],
  });

  // Fetch data for edit mode
  useEffect(() => {
    if (id && !initialData) {
      const fetchMassacreData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/fetch/${id}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch massacre data");
          }

          const data = await response.json();

          if (data) {
            // Prepare images object
            const imagesObj: Record<
              string,
              { data_url: string; image_url: string }
            > = {};
            data.media?.forEach((url: string, index: number) => {
              imagesObj[`image_${index}`] = {
                data_url: url,
                image_url: url,
              };
            });

            setImages(imagesObj);

            setInitialValues({
              ...initialValues,
              ...data,
              title: data.title || "",
              date: data.date
                ? new Date(data.date).toISOString().split("T")[0]
                : "",
              location: {
                city: data.location?.city || "",
                neighborhood: data.location?.neighborhood || "",
              },
              description: data.description || "",
              deaths: data.deaths || 0,
              injuries: data.injuries || 0,
              destroyedHouses: data.destroyedHouses || 0,
              tags: data.tags || [],
              internationalReactions: data.internationalReactions || [],
              cover_image:
                data.cover_image || (data.media?.length ? data.media[0] : ""),
              media: data.media || [],
            });

            // Set cities if city exists
            if (data.location?.city) {
              const cityObj = CitiesData.find(
                (city) => city[data.location.city as keyof typeof city]
              );
              setCities(
                cityObj
                  ? cityObj[data.location.city as keyof typeof cityObj] || []
                  : []
              );
            }
          }
        } catch (error) {
          console.error("Error fetching massacre data:", error);
          toast.error("Failed to load massacre data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMassacreData();
    } else if (initialData) {
      // Use provided initialData
      setInitialValues((prev) => ({
        ...prev,
        ...initialData,
      }));

      // Prepare images object
      const imagesObj: Record<string, { data_url: string; image_url: string }> =
        {};
      initialData.media?.forEach((url: string, index: number) => {
        imagesObj[`image_${index}`] = {
          data_url: url,
          image_url: url,
        };
      });
      setImages(imagesObj);

      if (initialData.location?.city) {
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

  // Handle form submission
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setFormErrors("");
    setSubmitting(true);

    try {
      if (!values.cover_image) {
        throw new Error("يجب اختيار صورة غلاف للمجزرة");
      }

      // Determine if we're creating or updating
      const isEditMode = !!id;
      const endpoint = isEditMode
        ? `/admin/massacres/update/${id}`
        : `/admin/massacres/create`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "Submission failed");
      }

      toast.success(
        isEditMode ? "تم تحديث المجزرة بنجاح!" : "تمت إضافة مجزرة جديدة بنجاح!"
      );

      router.push("/admin/dashboard/massacres");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setFormErrors(message);
      console.error("Error:", message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <MassacreFormLoader />;
  }

  return (
    <div className="relative w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={MassacresValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [tags, setTags] = useState<string[]>([]);

          console.log("Massacre form values: ", values);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const timeout = setTimeout(() => {
              if (values.description && values.description.length > 20) {
                const extractedTags = extractArabicKeywords(values.description);
                setTags(extractedTags);
                setFieldValue("tags", extractedTags); // Also update Formik's tags field
              } else {
                setTags([]);
                setFieldValue("tags", []);
              }
            }, 400); // debounce

            return () => clearTimeout(timeout);
          }, [values.description, setFieldValue]);

          return (
            <Form className="flex flex-col gap-8">
              {/* Massacre Details Section */}
              <div className="flex flex-col gap-6 w-full border rounded-xl p-8 bg-white">
                <Heading title="تفاصيل المجزرة" className="mb-4 !text-xl" />

                <div className="cards-grid-2 gap-4">
                  {/* Title Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title"
                      as={Input}
                      type="text"
                      placeholder="عنوان المجزرة"
                      label="عنوان المجزرة"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="عنوان المجزرة"
                      required={true}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  {/* Date Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="date"
                      as={Input}
                      type="date"
                      placeholder="تاريخ حدوث المجزرة"
                      label="تاريخ المجزرة"
                      className={`focus:border-secondary`}
                      required={true}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* Location Fields */}
                <div className="cards-grid-2 gap-4">
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="المدينة"
                      options={CountriesData}
                      value={values.location?.city}
                      title="اختر المدينة"
                      onChange={(e) => {
                        const selectedCity = e.target.value;
                        setFieldValue("location.city", selectedCity);
                        const cityObj = CitiesData.find(
                          (city) => city[selectedCity as keyof typeof city]
                        );
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
                      value={values.location?.neighborhood}
                      options={cities}
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

                {/* Description Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="description"
                    as={TextArea}
                    placeholder="قم بكتابة تفاصيل وأحداث المجزرة"
                    label="تفاصيل المجزرة"
                    className={`w-full focus:border-secondary`}
                  />
                  <div className="flex justify-between mt-1">
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 font-semibold text-[10px]"
                    />
                    <div
                      dir="ltr"
                      className="text-[10px] text-gray-500 text-left"
                    >
                      عدد الكلمات:{" "}
                      {values.description?.trim().split(/\s+/).filter(Boolean)
                        .length || 0}
                    </div>
                  </div>
                </div>

                {tags && tags?.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2">
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

              <div className="flex flex-col gap-5 w-full border rounded-xl p-8 bg-white">
                <Heading title="ردود الفعل الدولية" className="mb-4 !text-xl" />

                {/* International Reactions */}
                <div>
                  <FieldArray name="internationalReactions">
                    {({ push, remove, form }) => {
                      // Create refs for inputs

                      const handleAddReaction = (
                        e: React.MouseEvent | React.KeyboardEvent
                      ) => {
                        e.preventDefault();
                        if ("stopPropagation" in e) e.stopPropagation();

                        const publisherName =
                          publisherRef.current?.value.trim() || "";
                        const reactionText =
                          reactionRef.current?.value.trim() || "";

                        if (publisherName && reactionText) {
                          push({
                            publisher_name: publisherName,
                            reaction_text: reactionText,
                          });

                          // Clear inputs
                          if (publisherRef.current)
                            publisherRef.current.value = "";
                          if (reactionRef.current)
                            reactionRef.current.value = "";

                          // Focus back to publisher input
                          publisherRef.current?.focus();
                        } else {
                          toast.error(
                            "يرجى ملء جميع الحقول الخاصة بالردود الدولية"
                          );
                        }
                      };

                      return (
                        <div>
                          <div className="flex flex-col gap-4">
                            {/* Publisher Name Input */}
                            <Input
                              ref={publisherRef}
                              placeholder="اسم الناشر (مثال: الأمم المتحدة)"
                              className="focus:border-secondary"
                              id="publisherInput"
                              required={false}
                            />

                            {/* Reaction Text Input */}
                            <TextArea
                              required={false}
                              ref={reactionRef}
                              placeholder="نص رد الفعل (مثال: أدان الهجوم)"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddReaction(e);
                                }
                              }}
                              className=" focus:border-secondary"
                            />

                            <ErrorMessage
                              name="internationalReactions"
                              component="div"
                              className="text-red-500 font-semibold text-[10px]"
                            />

                            <div className="w-fit">
                              <Button
                                title="إضافة"
                                className="bg-secondary px-6 shadow-none"
                                icon={<BsPlus size={17} />}
                                onClick={handleAddReaction}
                              />
                            </div>
                          </div>

                          {/* Display Reactions */}
                          <div className="cards-grid-2 gap-4 mt-6">
                            {form.values.internationalReactions.map(
                              (
                                reaction: {
                                  publisher_name: string;
                                  reaction_text: string;
                                },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  style={{
                                    direction: "rtl",
                                  }}
                                  className="relative flex flex-col gap-2 p-8 rounded-[50px] rounded-tr-none bg-background_light border w-full"
                                >
                                  <div className="text-md font-bold">
                                    {reaction.publisher_name}
                                  </div>

                                  <p className="font-light text-sm">
                                    {reaction.reaction_text}
                                  </p>

                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-red-500"
                                  >
                                    <FaTimes size={14} />
                                  </button>

                                  {/* absolute icon */}
                                  <FaQuoteLeft
                                    className="absolute bottom-4 left-8 opacity-5"
                                    size={20}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }}
                  </FieldArray>

                  <ErrorMessage
                    name="internationalReactions"
                    component="div"
                    className="text-red-500 font-semibold text-[10px]"
                  />
                </div>
              </div>

              {/* Massacre Results Section */}
              <div className="flex flex-col gap-2 w-full border rounded-xl p-8 bg-white">
                <Heading title="نتائج المجزرة" className="mb-4 !text-xl" />

                <div className="cards-grid-3">
                  {/* Deaths Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      value={values.deaths ?? ""} // fallback to empty string if undefined
                      name="deaths"
                      as={Input}
                      type="number"
                      placeholder="عدد الشهداء"
                      label="عدد الشهداء"
                      className={`focus:border-secondary`}
                      required={true}
                    />
                    <ErrorMessage
                      name="deaths"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  {/* Injuries Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      value={values.injuries ?? ""} // fallback to empty string if undefined
                      name="injuries"
                      as={Input}
                      type="number"
                      placeholder="عدد الإصابات"
                      label="عدد الإصابات"
                      className={`focus:border-secondary`}
                      required={true}
                    />
                    <ErrorMessage
                      name="injuries"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  {/* Destroyed Houses Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      value={values.destroyedHouses ?? ""} // fallback to empty string if undefined
                      name="destroyedHouses"
                      as={Input}
                      type="number"
                      placeholder="المنازل المدمرة"
                      label="المنازل المدمرة"
                      className={`focus:border-secondary`}
                      required={true}
                    />
                    <ErrorMessage
                      name="destroyedHouses"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <MultiImageUploader
                  onImagesChange={(imageUrls) =>
                    setFieldValue("media", imageUrls)
                  }
                  onCoverImageChange={(coverImage) =>
                    setFieldValue("cover_image", coverImage)
                  }
                  folderName="massacres"
                  initialImages={images}
                  cover_image={values.cover_image!}
                  uploadStatus={uploadStatus}
                  setUploadStatus={setUploadStatus}
                />

                <ErrorMessage
                  name="media"
                  component="div"
                  className="rounded-lg p-4 w-full bg-red-100 text-red-600 text-sm "
                />

                <ErrorMessage
                  name="cover_image"
                  component="div"
                  className="rounded-lg p-4 w-full bg-red-100 text-red-600 text-sm"
                />
              </div>

              {/* Submit Button */}
              <Button
                title={id ? "تحديث المجزرة" : "إضافة المجزرة"}
                type="submit"
                className="bg-secondary w-full hover:shadow-lg text-sm"
                icon={<BiSend className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting || uploadStatus.loading}
              />

              {/* Form Errors */}
              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-red-600 text-sm">
                  {formErrors}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MassacreForm;
