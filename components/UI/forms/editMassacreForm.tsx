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

interface ImageData {
  data_url: string;
  image_url: string;
  isExisting?: boolean;
  file?: File; // Optional original file reference
}

interface ImagesObject {
  [key: string]: ImageData;
}

const EditMassacreForm = ({ id }: Props) => {
  const massacreId = id;

  // Constants
  const MAX_IMAGES = 5; // Max 5 images
  const router = useRouter();

  // State
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImagesObject>({});
  const [uploadStatus, setUploadStatus] = useState<{
    loading: boolean;
    progress: number;
    error: string | null;
  }>({ loading: false, progress: 0, error: null });

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          if (data.media && data.media.length > 0) {
            const existingImages: ImagesObject = {};
            for (const url of data.media) {
              const uniqueKey = `existing-${url.split("/").pop()}`;

              // For existing images, we need to fetch and create a data URL
              try {
                const response = await fetch(url);
                const blob = await response.blob();
                const dataUrl = await new Promise<string>((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.readAsDataURL(blob);
                });

                existingImages[uniqueKey] = {
                  data_url: dataUrl, // Base64 encoded data URL
                  image_url: url, // Original server URL
                  isExisting: true,
                };
              } catch (error) {
                console.error(
                  "Error creating preview for existing image:",
                  error
                );
                // Fallback to using the URL directly (may not work in all cases)
                existingImages[uniqueKey] = {
                  data_url: url,
                  image_url: url,
                  isExisting: true,
                };
              }
            }
            setImages(existingImages);
          }

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

  const uploadSingleImage = async (file: File): Promise<string> => {
    let processedFile = file;

    if (file.size > 1 * 1024 * 1024) {
      processedFile = await compressImage(file);
    }

    const formData = new FormData();
    formData.append("image", processedFile);
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
      throw new Error(errorData?.message || "Failed to upload image");
    }

    const data = await res.json();
    return data.url;
  };

  // Handle image upload
  const handleImageUpload = async (
    imageList: ImageListType,
    setFieldValue: (
      field: string,
      value: Partial<MassacreInterface> | string | number | string[] | number[]
    ) => void,
    values: typeof initialValues
  ) => {
    if (!imageList || imageList.length === 0) return;

    // Check if we're exceeding the max number of images
    const currentImageCount = Object.keys(images).length;
    if (currentImageCount > MAX_IMAGES) {
      throw new Error(`الحد الأقصى للصور المرفوعة هو ${MAX_IMAGES} صور`);
    }

    setUploadStatus({ loading: true, progress: 0, error: null });

    try {
      const newImages: ImagesObject = {};
      const mediaUrls: string[] = [];

      // Process each image
      for (let i = 0; i < imageList.length; i++) {
        const image = imageList[i];
        if (!image.file) continue;

        // Validate the image
        validateImage(image);

        // Generate unique key
        const uniqueKey = getFileUniqueKey(image.file);

        // Upload the image
        const imageUrl = await uploadSingleImage(image.file);

        // Add to our images object
        newImages[uniqueKey] = {
          data_url: image.data_url || "",
          image_url: imageUrl,
        };

        // Add to media URLs array
        mediaUrls.push(imageUrl);

        // Update progress
        setUploadStatus((prev) => ({
          ...prev,
          progress: Math.round(((i + 1) / imageList.length) * 100),
        }));
      }

      // Update state
      setImages((prev) => ({ ...prev, ...newImages }));
      setFieldValue("media", [...(values.media || []), ...mediaUrls]);

      toast.success("تم رفع الصور بنجاح!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setUploadStatus((prev) => ({ ...prev, error: message }));
      toast.error(message);
      throw error;
    } finally {
      setUploadStatus((prev) => ({ ...prev, loading: false }));
    }
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
    setUploadStatus({
      loading: false,
      progress: 0,
      error: null,
    });
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

            const handleRemoveImage = (
              uniqueKey: string,
              setFieldValue: (
                field: string,
                value:
                  | Partial<MassacreInterface>
                  | string
                  | number
                  | string[]
                  | number[]
              ) => void
            ) => {
              const imageToRemove = images[uniqueKey];

              if (!imageToRemove) return;

              // Create new objects without the removed image
              const { [uniqueKey]: removedImage, ...remainingImages } = images;
              const updatedMediaUrls = (values.media || []).filter(
                (url) => url !== removedImage.image_url
              );

              // Update cover image if needed
              let updatedCoverImage: string = values.cover_image || "";
              if (removedImage.image_url === values.cover_image) {
                updatedCoverImage = "";
              }

              // Update state
              setImages(remainingImages);
              setFieldValue("media", updatedMediaUrls);
              setFieldValue("cover_image", updatedCoverImage);
            };

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

            console.log("Images: ", images);

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
                    disabled={isSubmitting || uploadStatus.loading}
                    className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ReactImageUploading
                      multiple
                      value={Object.values(images).map((img) => ({
                        data_url: img.data_url,
                      }))}
                      onChange={(imageList) =>
                        handleImageUpload(imageList, setFieldValue, values)
                      }
                      maxNumber={MAX_IMAGES}
                      dataURLKey="data_url"
                      acceptType={["jpg", "jpeg", "png", "webp"]}
                    >
                      {({ onImageUpload, dragProps }) => (
                        <div className="flex flex-col gap-4">
                          {/* Upload Trigger */}
                          <div
                            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl ${
                              Object.keys(images).length > 0
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
                              {Object.keys(images).length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                  {Object.keys(images).length}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-theme text-center">
                              اسحب وأفلت الصور هنا أو انقر للاختيار
                            </span>
                            <div className="text-xs text-gray-500 mt-2">
                              <p>✓ الصور المدعومة: JPEG, PNG, Jpg, WebP</p>
                              <p>✓ الحد الأقصى للحجم: 5MB لكل صورة</p>
                              <p>✓ الحد الأقصى للعدد: {MAX_IMAGES} صور</p>
                              {uploadStatus.error && (
                                <p className="text-red-500">
                                  ✗ {uploadStatus.error}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Upload Progress */}
                          {uploadStatus.loading && (
                            <div className="flex flex-col gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadStatus.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="animate-pulse">⏳</span>
                                جارٍ رفع الصور... ({uploadStatus.progress}%)
                              </div>
                            </div>
                          )}

                          {/* Image Preview Grid */}
                          <div className="flex items-center flex-wrap gap-4 mt-4">
                            {Object.entries(images).map(
                              ([uniqueKey, imageData]) => (
                                <div
                                  onClick={() =>
                                    setFieldValue(
                                      "cover_image",
                                      imageData.image_url
                                    )
                                  }
                                  key={uniqueKey}
                                  className={`relative w-24 h-24 aspect-square rounded-xl cursor-pointer overflow-hidden`}
                                >
                                  <Image
                                    src={imageData.data_url}
                                    alt={`Uploaded image ${uniqueKey}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 100px) 20vw, (max-width: 100px) 20vw, 20vw"
                                  />

                                  {imageData.image_url ===
                                    values.cover_image && (
                                    <span className="absolute flex flex-col justify-center items-center gap-2 bottom-0 left-0 right-0 w-full h-full bg-[#1e272eb6] backdrop-blur text-white font-semibold text-[10px] p-1 text-center">
                                      <CiImageOn size={35} />
                                      صورة الغلاف
                                    </span>
                                  )}

                                  {/* Remove button */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(
                                        uniqueKey,
                                        setFieldValue
                                      );
                                    }}
                                    className="absolute top-1 right-1 bg-white text-rejected p-1 rounded shadow hover:bg-gray-100 transition-colors"
                                    aria-label="إزالة الصورة"
                                    title="إزالة الصورة"
                                  >
                                    <FaTimes size={10} />
                                  </button>
                                </div>
                              )
                            )}
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
                </div>

                {/* Submit Button */}
                <Button
                  title={"نحديث المجزرة"}
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
      )}
    </div>
  );
};

export default EditMassacreForm;
