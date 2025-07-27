"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiSend, BiUser } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import { toast } from "react-toastify";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { StoryInterface } from "@/app/interfaces";
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";
import { StoryValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";

type AddStoryPrpos = {
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: StoryInterface;
};

const EditStoryForm = ({ setLoading, data }: AddStoryPrpos) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { name, nickname, social_media, city, neighborhood, bio, image } = data;

  const story_id = data?._id;

  // Updated initialValues to include image
  const initialValues: Partial<StoryInterface> = {
    city,
    nickname,
    social_media: {
      instagram: social_media?.instagram || "",
      facebook: social_media?.facebook || "",
      x: social_media?.x || "",
    },
    neighborhood,
    bio,
    image,
  };

  console.log("Extracted keywords from bio", extractArabicKeywords(bio));

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setLoading(true);
    console.log("Submit handler started!");
    setFormErrors("");
    console.log("Values", values);

    try {
      // 1. Upload image to Cloudinary first
      const imageUploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/stories`,
        {
          method: "POST",
          body: JSON.stringify({ image: values.image }), // base64 image
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false);

      const { url } = await imageUploadRes.json();
      console.log("Image URL:", url);
      if (!imageUploadRes.ok) {
        setUploadError("Error uploading image");
        console.log("Image Upload Error:", url);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/update/${story_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Passing Cookies to the server
          body: JSON.stringify({ ...values, image: url }),
        }
      );

      const data = await response.json();
      console.log("Data Object is:", data);
      setLoading(false);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Add Martyr Error:", data.error);
        setLoading(false);
        return;
      }

      setSubmitting(false);
      toast.success(
        "تم إرسال طلب تعديل القصة بنجاح، وستتم مراجعته في أقرب وقت !"
      );

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      setSubmitting(false);
      setLoading(false);
      setFormErrors((error as Error).message);
      toast.error("حدث خطأ أثناء تعديل قصة الشهيد");
      console.error("Error adding martyr", error);
    }
  };

  // Inside the component, below useState
  useEffect(() => {
    if (image) {
      setImages([
        {
          data_url: image, // URL or base64
        },
      ]);
    }
  }, [image]);

  useEffect(() => {
    if (city) {
      const cityObj = CitiesData.find((c) => c[city as keyof typeof c]);

      setCities(cityObj ? cityObj[city as keyof typeof cityObj] || [] : []);
    }
  }, [city]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full border p-8 bg-white">
        <Heading
          title=""
          highLightText="تعديل القصة"
          highlightColor="before:bg-primary"
          className="mx-auto text-center !text-2xl"
        />

        <p className="mx-auto text-center text-gray_dark text-[12px] mt-2">
          الشهيد/ {name || "عنوان القصة غير معرّف"}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={StoryValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => {
            console.log("Errors:", errors);
            console.log("Form Values", values);

            return (
              <Form className="flex flex-col gap-4 mt-6">
                <div>
                  <Field
                    value={values.nickname || ""}
                    disabled={isSubmitting}
                    name="nickname"
                    as={Input}
                    type="text"
                    placeholder="لقب الشهيد (اختياري)"
                    label="لقب الشهيد"
                    icon={<BiUser />}
                    className={`focus:border-primary`}
                    aria-label="لقب الشهيد"
                    required={false}
                  />
                </div>

                {/* Social Media Fields */}
                <div>
                  <Field
                    value={values.social_media?.instagram}
                    disabled={isSubmitting}
                    name="social_media.instagram"
                    as={Input}
                    type="url"
                    placeholder="رابط إنستجرام"
                    label="إنستجرام"
                    className={`focus:border-primary`}
                    required={false}
                  />
                  <ErrorMessage
                    name="social_media.instagram"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                <div>
                  <Field
                    value={values.social_media?.facebook}
                    disabled={isSubmitting}
                    name="social_media.facebook"
                    as={Input}
                    type="url"
                    placeholder="رابط فيسبوك"
                    label="فيسبوك"
                    className={`focus:border-primary`}
                    required={false}
                  />
                  <ErrorMessage
                    name="social_media.facebook"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                <div>
                  <Field
                    value={values.social_media?.x}
                    disabled={isSubmitting}
                    name="social_media.x"
                    as={Input}
                    type="url"
                    placeholder="رابط تويتر (X)"
                    label="تويتر (X)"
                    className={`focus:border-primary`}
                    required={false}
                  />
                  <ErrorMessage
                    name="social_media.x"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                {/* City and Neighbourhood Fields */}
                <div>
                  <Select
                    value={values.city}
                    disabled={isSubmitting}
                    label="المدينة"
                    options={CountriesData}
                    title="اختر المدينة"
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
                          ? cityObj[selectedCity as keyof typeof cityObj] || []
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

                {/* Notes Field with Word Counter */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="bio"
                    as={TextArea}
                    placeholder="عن حياة الشهيد..."
                    label="السيرة الذاتية"
                    className={`w-full focus:border-primary`}
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

                <fieldset
                  disabled={isSubmitting}
                  className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ReactImageUploading
                    multiple={false} // Single image upload
                    value={images}
                    onChange={(imageList) => {
                      setImages(imageList);
                      if (imageList.length > 0) {
                        setFieldValue("image", imageList[0].data_url); // ✅ store base64
                      } else {
                        setFieldValue("image", null); // ✅ reset on remove
                      }
                    }}
                    maxNumber={1}
                    dataURLKey="data_url"
                    acceptType={["jpg", "jpeg", "png", "webp"]}
                  >
                    {({
                      onImageUpload,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div className="flex flex-col gap-4">
                        {/* Upload Trigger */}
                        <div
                          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl ${
                            images.length > 0
                              ? "border-gray-300"
                              : "border-primary/50 hover:border-primary"
                          } cursor-pointer transition-colors`}
                          style={
                            isDragging ? { borderColor: "red" } : undefined
                          }
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <div className="relative w-16 h-16">
                            <CiImageOn
                              size={64}
                              className="text-gray-300 absolute inset-0"
                            />
                          </div>
                          <span className="text-sm text-theme text-center">
                            اسحب وأفلت الصورة هنا أو انقر للاختيار
                          </span>
                          <div className="text-xs text-gray-500 mt-2">
                            <p>✓ الصور المدعومة: JPEG, PNG, GIF, JFIF, WebP</p>
                            <p>✓ الحد الأقصى للحجم: 5MB</p>
                            {uploadError && (
                              <p className="text-red-500">✗ {uploadError}</p>
                            )}
                          </div>
                        </div>

                        {/* Image Preview */}
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-full max-w-xs aspect-square rounded-xl overflow-hidden border"
                          >
                            <Image
                              src={image.data_url}
                              alt="صورة الشهيد"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => {
                                onImageRemove(index);
                                setFieldValue("image", null);
                              }}
                              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition-colors"
                              aria-label="حذف الصورة"
                              title="حذف الصورة"
                              disabled={isSubmitting}
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}

                        {uploadError && (
                          <div className="rounded-lg p-4 w-full bg-red-100 text-red-600 text-sm">
                            {uploadError}
                          </div>
                        )}
                      </div>
                    )}
                  </ReactImageUploading>

                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </fieldset>

                {/* Submit Button */}
                <Button
                  title={"إرسال"}
                  type="submit"
                  className="bg-primary w-full hover:shadow-lg text-sm mt-6"
                  icon={<BiSend className="rotate-180" />}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />

                {/* Form Errors */}
                {formErrors && (
                  <div className="rounded-lg p-4 w-full bg-red-100 text-rejected text-sm">
                    {formErrors}
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditStoryForm;
