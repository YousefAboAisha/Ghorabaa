"use client";
import React, { useState } from "react";
import { BiSend, BiUser } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { MassacreInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { MassacresValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";

const AddMassacres = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 5; // Allow only one image

  // Updated initialValues to include image
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
    internationalReactions: [],
    externalLinks: {
      wikipedia: "",
      alJazeera: "",
      stateOfPalestine: "",
    },
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setFormErrors("");
    setSubmitting(true);

    try {
      // 1. Upload cover image
      const coverUploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/upload`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: values.cover_image,
            folder: "massacres",
          }),
        }
      );

      const coverUploadData = await coverUploadRes.json();
      if (!coverUploadRes.ok) {
        throw new Error(coverUploadData?.error || "فشل رفع صورة الغلاف");
      }
      const coverImageUrl = coverUploadData.url;

      // 2. Upload media images (excluding cover image)
      const mediaImagesToUpload = (values.media || []).filter(
        (img) => img !== values.cover_image
      );

      const mediaUploadUrls = await Promise.all(
        mediaImagesToUpload.map(async (image) => {
          const mediaRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/upload`,
            {
              credentials: "include",
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                image,
                folder: "massacres",
              }),
            }
          );

          const mediaData = await mediaRes.json();
          if (!mediaRes.ok) {
            throw new Error(mediaData?.error || "فشل رفع إحدى الصور");
          }
          return mediaData.url;
        })
      );

      // Include the cover image in the media list (first position)
      const fullMediaUrls = [coverImageUrl, ...mediaUploadUrls];

      // 3. Send to backend
      const payload = {
        ...values,
        cover_image: coverImageUrl,
        media: fullMediaUrls,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "حدث خطأ أثناء إرسال البيانات");
      }

      toast.success("✅ تم إرسال المجزرة بنجاح!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setFormErrors(message);
      console.error("❌ Error:", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full border rounded-xl p-8 bg-white">
      <Heading
        title=""
        highLightText="مجزرة جديدة"
        highlightColor="before:bg-primary"
        className="mb-8 mx-auto text-center !text-2xl"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={MassacresValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          console.log("Errors:", errors);
          console.log("Form Values", values);

          return (
            <Form className="flex flex-col gap-5">
              <div className="cards-grid-2 gap-4">
                {/* title Field */}
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

              <div className="cards-grid-2 gap-4">
                {/* City and Neighbourhood Fields */}
                <div>
                  <Select
                    disabled={isSubmitting}
                    label="المدينة"
                    options={CountriesData}
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
                          ? cityObj[selectedCity as keyof typeof cityObj] || []
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

              {/* Notes Field with Word Counter */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="description"
                  as={TextArea}
                  placeholder="قم بكتابة تفاصيل وأحداث المجزرة"
                  label="تفاصيل المجزرة"
                  className={`w-full focus:border-secondary`}
                />
                {/* Word Counter */}

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

              <div className="cards-grid-3">
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

              <div>
                <Field
                  disabled={isSubmitting}
                  name="externalLinks.wikipedia"
                  as={Input}
                  type="url"
                  placeholder="عنوان الرابط (ويكيبيديا)"
                  label="ويكيبيديا"
                  className={`focus:border-secondary`}
                  required={false}
                />
                <ErrorMessage
                  name="externalLinks.wikipedia"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              <div>
                <Field
                  disabled={isSubmitting}
                  name="externalLinks.alJazeera"
                  as={Input}
                  type="url"
                  placeholder="عنوان الرابط (قناة الجزيرة)"
                  label="قناة الجزيرة"
                  className={`focus:border-secondary`}
                  required={false}
                />
                <ErrorMessage
                  name="externalLinks.alJazeera"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              <div>
                <Field
                  disabled={isSubmitting}
                  name="externalLinks.stateOfPalestine"
                  as={Input}
                  type="url"
                  placeholder="عنوان الرابط (الإحصاء الفلسطيني)"
                  label="الإحصاء الفلسطيني"
                  className={`focus:border-secondary`}
                  required={false}
                />
                <ErrorMessage
                  name="externalLinks.stateOfPalestine"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />
              </div>

              <FieldArray name="internationalReactions">
                {({ push, remove, form }) => (
                  <div>
                    <Input
                      type="text"
                      placeholder="أضف نص رد الفعل ثم اضغط Enter"
                      label="ردود الفعل الدولية"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          push(e.currentTarget.value.trim());
                          e.currentTarget.value = "";
                        }
                      }}
                      required={false}
                      className="focus:border-secondary"
                    />
                    <div className="cards-grid-2 gap-4 mt-4 ">
                      {form.values.internationalReactions.map(
                        (reaction: string, index: number) => (
                          <div
                            key={index}
                            className="relative bg-background_light p-6 rouned-md flex items-center text-sm rounded-[30px] rounded-tr-none border h-fit"
                          >
                            {reaction}
                            <button type="button" onClick={() => remove(index)}>
                              <FaTimes
                                title="حذف النص"
                                className="absolute top-2 right-2 ml-2 hover:text-rejected duration-150"
                                size={14}
                              />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </FieldArray>

              <fieldset
                disabled={isSubmitting}
                className="relative group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ReactImageUploading
                  multiple
                  value={images}
                  onChange={(imageList) => {
                    setImages(imageList);
                    if (imageList.length > 0) {
                      // First image is default cover
                      setFieldValue("cover_image", imageList[0].data_url);
                    } else {
                      setFieldValue("cover_image", "");
                    }
                    setFieldValue(
                      "media",
                      imageList.map((img) => img.data_url)
                    );
                  }}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "jpeg", "png", "webp"]}
                >
                  {({ onImageUpload, dragProps }) => (
                    <div className="flex flex-col gap-4">
                      {/* Upload Trigger */}
                      <div
                        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl hover:border-primary"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <CiImageOn size={50} className="text-gray-300" />
                        <span className="text-xs text-theme text-center">
                          اضغط هنا لإرفاق الصور (حد أقصى 5 صور)
                        </span>
                      </div>

                      {/* Image Preview Grid */}
                      <div className="flex flex-wrap gap-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className={`relative w-[100px] h-[100px] rounded-xl cursor-pointer z-0`}
                            onClick={() =>
                              setFieldValue("cover_image", image.data_url)
                            }
                            title="انقر لتعيين كصورة غلاف"
                          >
                            <Image
                              src={image.data_url}
                              alt={`صورة ${index + 1}`}
                              fill
                              className="object-cover rounded-xl"
                            />

                            {image.data_url === values.cover_image && (
                              <span className="absolute text-[12px] flex items-center justify-center bg-[#1e272e40] backdrop-blur-sm text-white font-semibold w-full h-full rounded-xl">
                                صورة الغلاف
                              </span>
                            )}

                            {/* Remove Button */}
                            <button
                              disabled={isSubmitting}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent cover selection
                                const newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                                setFieldValue(
                                  "media",
                                  newImages.map((img) => img.data_url)
                                );
                                // Reset cover_image if it was removed
                                if (image.data_url === values.cover_image) {
                                  setFieldValue(
                                    "cover_image",
                                    newImages[0]?.data_url || ""
                                  );
                                }
                              }}
                              className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-md border hover:text-red-500 z-10"
                            >
                              <FaTimes size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ReactImageUploading>

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
              </fieldset>

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
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
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
