"use client";
import React, { useEffect, useState } from "react";
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
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { MassacreInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { MassacresValidationSchema } from "@/utils/validators";
import { getFileUniqueKey } from "@/utils/file";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/inputs/input";
import { compressImage, validateImage } from "@/utils/image";
import MassacreFormLoader from "../loaders/massacreFormLoader";
import extractTags from "@/utils/extractTags";

type Props = {
  id: string;
};

const EditMassacreForm = ({ id }: Props) => {
  // Constants
  const MAX_NUMBER = 5; // Max 5 images

  // State
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [isUploadCompleted, setIsUploadCompleted] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const massacreId = id;

  const [uploadedImageKeys, setUploadedImageKeys] = useState<Set<string>>(
    new Set()
  );

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
    deaths: 0,
    injuries: 0,
    destroyedHouses: 0,
    internationalReactions: [],
  });

  // Fetch existing massacre data
  useEffect(() => {
    const fetchMassacreData = async () => {
      if (!massacreId) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/fetch/${massacreId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch massacre data");
        }

        const data = await response.json();

        if (data) {
          setUploadedImages(data.media || []);
          // Format the date properly
          const formattedDate = data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "";

          setInitialValues({
            ...data,
            date: formattedDate,
            location: data.location || {
              city: "",
              neighborhood: "",
            },
            media: data.media || [],
            internationalReactions: data.internationalReactions || [],
          });

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
  }, [massacreId]);

  const uploadMediaHandler = async (
    imagesList: ImageListType,
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    if (!imagesList || imagesList.length === 0) {
      throw new Error("يجب إرفاق صورة واحدة على الأقل");
    }

    setIsUploadCompleted(false);
    setUploadLoading(true);
    setUploadError(null);

    try {
      const newUploadedUrls: string[] = [];
      const newUploadedKeys = new Set(uploadedImageKeys);

      for (let i = 0; i < imagesList.length; i++) {
        const image = imagesList[i];
        if (!image.file) continue;

        const fileUniqueKey = getFileUniqueKey(image.file);

        if (newUploadedKeys.has(fileUniqueKey)) {
          console.log(`Skipping duplicate image: ${image.file.name || "N/A"}`);
          continue;
        }

        validateImage(image);

        let file = image.file;
        if (file.size > 1 * 1024 * 1024) {
          file = await compressImage(file);
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "massacres");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/massacres`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData?.message || `فشل رفع الصورة ${i + 1}`);
        }

        const data = await res.json();
        newUploadedUrls.push(data.url);
        newUploadedKeys.add(fileUniqueKey);
        setUploadProgress(Math.round(((i + 1) / imagesList.length) * 100));
      }

      const allUrls = [...uploadedImages, ...newUploadedUrls];
      setUploadedImages(allUrls);
      setUploadedImageKeys(newUploadedKeys);
      setFieldValue("media", allUrls);
      setIsUploadCompleted(true);
      toast.success("تم رفع الصور بنجاح!");

      return allUrls;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "فشل رفع الصور بسبب خطأ غير معروف";
      setUploadError(message);
      toast.error(message);

      // 🔽 Clear images that caused the failure
      setImages([]);
      setUploadProgress(0);
      setIsUploadCompleted(false);

      throw error;
    } finally {
      setUploadLoading(false);
      setUploadProgress(0);
    }
  };

  const handleImageChange = async (
    imageList: ImageListType,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    try {
      const uniqueImages = imageList.filter((img, index, self) => {
        if (!img.file) return false;

        const fileKey = getFileUniqueKey(img.file);
        const isUniqueDataUrl =
          self.findIndex((i) => i.data_url === img.data_url) === index;
        const isUniqueFile = !uploadedImageKeys.has(fileKey);

        return isUniqueDataUrl && isUniqueFile;
      });

      // Validate all images before setting state
      uniqueImages.forEach((image) => {
        if (image.file) {
          validateImage(image); // This should throw if validation fails
        }
      });

      setImages(uniqueImages);

      if (uniqueImages.length > 0) {
        await uploadMediaHandler(uniqueImages, setFieldValue);
      }
    } catch (error) {
      // Clear invalid images on error
      setImages([]);
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Invalid image");
    }
  };

  const handleRemoveImage = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const newImages = [...uploadedImages];
    const removedImage = newImages.splice(index, 1)[0];

    const newUploadedKeys = new Set(uploadedImageKeys);
    const imageToRemove = images[index];
    if (imageToRemove?.file) {
      const fileKey = getFileUniqueKey(imageToRemove.file);
      newUploadedKeys.delete(fileKey);
      setUploadedImageKeys(newUploadedKeys);
    }

    if (removedImage === initialValues.cover_image) {
      setFieldValue("cover_image", "");
    }

    setUploadedImages(newImages);
    setFieldValue("media", newImages);
    setFieldValue("cover_image", "");
    setImages(images.filter((_, i) => i !== index));
  };

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/massacres/update/${massacreId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "حدث خطأ أثناء تحديث البيانات");
      }

      toast.success("تم تحديث المجزرة بنجاح!");

      setTimeout(() => {
        router.push("/admin/dashboard/massacres");
      }, 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setFormErrors(message);
      console.error("❌ Error:", message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsUploadCompleted(false);
  }, [images]);

  return (
    <div className="relative w-full">
      {isLoading ? (
        <MassacreFormLoader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={MassacresValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue, errors }) => {
            console.log("Form Errors: ", errors);
            console.log("Form Values: ", values);

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [tags, setTags] = useState<string[]>([]);

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              const timeout = setTimeout(() => {
                if (values.description && values.description.length > 20) {
                  const extractedTags = extractTags(values.description);
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
                        value={values.location?.city}
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
                        value={values.location?.neighborhood}
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

                  {/* International Reactions */}
                  <div>
                    <FieldArray name="internationalReactions">
                      {({ push, remove, form }) => (
                        <div>
                          <TextArea
                            placeholder="أضف نص رد الفعل ثم اضغط Enter"
                            label="ردود الفعل الدولية"
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                e.currentTarget.value.trim()
                              ) {
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
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
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
                    <ErrorMessage
                      name="internationalReactions"
                      component="div"
                      className="text-red-500 font-semibold text-[10px]"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <fieldset
                    disabled={isSubmitting || uploadLoading}
                    className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ReactImageUploading
                      multiple
                      value={images}
                      onChange={(imageList) =>
                        handleImageChange(imageList, setFieldValue)
                      }
                      maxNumber={MAX_NUMBER}
                      dataURLKey="data_url"
                      acceptType={["jpg", "jpeg", "png", "webp"]}
                    >
                      {({ onImageUpload, dragProps }) => (
                        <div className="flex flex-col gap-4">
                          {/* Upload Trigger */}
                          <div
                            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl ${
                              images.length > 0
                                ? "border-gray-300"
                                : "border-primary/50 hover:border-primary"
                            } cursor-pointer transition-colors`}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <div className="relative w-16 h-16">
                              <CiImageOn
                                size={64}
                                className="text-gray-300 absolute inset-0"
                              />
                              {uploadedImages.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                  {uploadedImages.length}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-theme text-center">
                              اسحب وأفلت الصور هنا أو انقر للاختيار
                            </span>
                            <div className="text-xs text-gray-500 mt-2">
                              <p>✓ الصور المدعومة: JPEG, PNG, Jpg, WebP</p>
                              <p>✓ الحد الأقصى للحجم: 5MB لكل صورة</p>
                              <p>✓ الحد الأقصى للعدد: 5 صور</p>
                              {uploadError && (
                                <p className="text-red-500">✗ {uploadError}</p>
                              )}
                            </div>
                          </div>

                          {/* Upload Progress */}
                          {uploadLoading && (
                            <div className="flex flex-col gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="animate-pulse">⏳</span>
                                جاري رفع {images.length} صورة... (
                                {uploadProgress}
                                %)
                              </div>
                            </div>
                          )}

                          {/* Image Preview Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                            {uploadedImages?.map((image, index) => (
                              <div
                                onClick={() =>
                                  setFieldValue("cover_image", image)
                                }
                                key={index}
                                className={`relative w-full aspect-square rounded-xl cursor-pointer overflow-hidden ${
                                  image === values.cover_image
                                    ? "ring-2 ring-primary"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={image}
                                  alt={`صورة ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {image === values.cover_image && (
                                  <span className="absolute flex flex-col justify-center items-center gap-2 bottom-0 left-0 right-0 w-full h-full bg-[#1e272eb6] backdrop-blur text-white font-semibold text-xs p-1 text-center">
                                    <CiImageOn size={40} />
                                    صورة الغلاف
                                  </span>
                                )}

                                {/* Image index */}
                                <span className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                  {index + 1}
                                </span>

                                {/* Remove button */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveImage(index, setFieldValue)
                                  }
                                  className="absolute top-1 right-1 bg-white p-1 rounded shadow hover:bg-gray-100 transition-colors"
                                  aria-label="حذف الصورة"
                                  title="حذف الصورة"
                                >
                                  <FaTimes size={12} />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Status Messages */}
                          {isUploadCompleted && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <span>✅</span>
                              تم رفع {images.length} صورة بنجاح!
                            </div>
                          )}
                          {uploadError && (
                            <div className="rounded-lg p-4 w-full bg-red-100 text-red-600 text-sm">
                              {uploadError}
                            </div>
                          )}
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
                </div>

                {/* Submit Button */}
                <Button
                  title={"تحديث البيانات"}
                  type="submit"
                  className="bg-secondary w-full hover:shadow-lg text-sm"
                  icon={<BiSend className="rotate-180" />}
                  loading={isSubmitting}
                  disabled={isSubmitting || uploadLoading}
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
      )}
    </div>
  );
};

export default EditMassacreForm;
