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

const AddMassacres = () => {
  const MAX_IMAGES = 5;
  const router = useRouter();

  // State
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);

  const publisherRef = useRef<HTMLInputElement>(null);
  const reactionRef = useRef<HTMLTextAreaElement>(null);

  const initialValues: Partial<MassacreInterface> = {
    cover_image: "",
    title: "",
    date: "",
    location: {
      city: "",
      neighborhood: "",
    },
    description: "",
    media: [],
    deaths: 0,
    injuries: 0,
    destroyedHouses: 0,
    tags: [],
    internationalReactions: [],
  };

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/massacres/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "Submission failed");
      }

      toast.success("تمت إضافة مجزرة جديدة بنجاح!");
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

  return (
    <div className="relative w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={MassacresValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => {
          console.log("Form Errors", errors);
          console.log("Form Values", values);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [tags, setTags] = useState<string[]>([]);

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
                <Heading
                  title=""
                  highLightText="تفاصيل المجزرة"
                  highlightColor="before:bg-primary"
                  className="mb-4 !text-2xl z-10"
                />

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
                <Heading
                  title=""
                  highLightText="ردود الفعل الدولية"
                  highlightColor="before:bg-primary"
                  className="mb-4 !text-2xl z-10"
                />

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
                                className="bg-secondary px-6"
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
              <div className="flex flex-col gap-5 w-full border rounded-xl p-8 bg-white">
                <Heading
                  title=""
                  highLightText="نتائج المجزرة"
                  highlightColor="before:bg-primary"
                  className="mb-4 !text-2xl z-10"
                />

                <div className="cards-grid-3">
                  {/* Deaths Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
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
                  maxImages={MAX_IMAGES}
                  onImagesChange={(imageUrls) =>
                    setFieldValue("media", imageUrls)
                  }
                  onCoverImageChange={(coverImage) =>
                    setFieldValue("cover_image", coverImage)
                  }
                  folderName="massacres"
                />

                <ErrorMessage
                  name="media"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />

                <ErrorMessage
                  name="cover_image"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                title={"إرسال"}
                type="submit"
                className="bg-secondary w-full hover:shadow-lg text-sm"
                icon={<BiSend className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
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

export default AddMassacres;
