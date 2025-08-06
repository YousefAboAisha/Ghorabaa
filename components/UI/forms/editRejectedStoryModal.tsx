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
import { StoryValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import { compressImage, validateImage } from "@/utils/image";

type AddStoryPrpos = {
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: StoryInterface;
};

const EditRejectedStoryForm = ({
  setLoading,
  setIsOpen,
  data,
}: AddStoryPrpos) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { nickname, city, social_media, neighborhood, bio, image, status } =
    data;

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
    status,
  };

  const story_id = data?._id;

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setLoading(true);
    setFormErrors("");
    setSubmitting(true);
    setUploadError(null);

    try {
      // 1. Upload image if present
      let imageUrl = values.image; // Keep existing image if no new one uploaded

      if (images.length > 0 && images[0].file) {
        const formData = new FormData();
        formData.append("image", images[0].file); // Use the compressed file

        const imageUploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/stories`,
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

      // 2. Update story
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/update/${story_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...values, image: imageUrl }),
        }
      );

      const responseData = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(responseData.error || "حدث خطأ أثناء تحديث القصة");
      }

      toast.success(
        "تمت إعادة طلب نشر القصة بنجاح، وسيتم مراجعتها في أقرب وقت !"
      );
      setIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Error updating story:", message);
      setFormErrors(message);
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Set initial image if exists
  useEffect(() => {
    if (image) {
      setImages([
        {
          data_url: image,
        },
      ]);
    }
  }, [image]);

  // Set cities based on initial city
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
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={StoryValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              {/* Nickname Field */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      const cityObj = CitiesData.find(
                        (city) => city[selectedCity as keyof typeof city]
                      );

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
              </div>

              {/* Bio Field with Word Counter */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="bio"
                  as={TextArea}
                  placeholder="عن حياة الشهيد..."
                  label="السيرة الذاتية"
                  className={`w-full focus:border-primary`}
                />
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

              {/* Image Uploader */}
              <fieldset
                disabled={isSubmitting}
                className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ReactImageUploading
                  multiple={false}
                  value={images}
                  onChange={async (imageList) => {
                    setUploadError(null);
                    try {
                      if (imageList.length > 0) {
                        const image = imageList[0];
                        validateImage(image);
                        const compressedFile = await compressImage(image.file!);
                        const compressedImage = {
                          ...image,
                          file: compressedFile,
                          data_url: await new Promise<string>((resolve) => {
                            const reader = new FileReader();
                            reader.onload = () =>
                              resolve(reader.result as string);
                            reader.readAsDataURL(compressedFile);
                          }),
                        };
                        setImages([compressedImage]);
                        setFieldValue("image", compressedImage.data_url);
                      } else {
                        setImages([]);
                        setFieldValue("image", null);
                      }
                    } catch (error) {
                      setUploadError(
                        error instanceof Error
                          ? error.message
                          : "حدث خطأ غير متوقع"
                      );
                      setImages([]);
                      setFieldValue("image", null);
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
                        style={isDragging ? { borderColor: "red" } : undefined}
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
                          <p>✓ قم بإرفاق صورة واحدة فقط </p>
                          {uploadError && (
                            <p className="text-red-500">✗ {uploadError}</p>
                          )}
                        </div>
                      </div>

                      {/* Image Preview */}
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 aspect-square rounded-xl overflow-hidden border"
                        >
                          <Image
                            src={image.data_url}
                            alt="صورة الشهيد"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditRejectedStoryForm;
