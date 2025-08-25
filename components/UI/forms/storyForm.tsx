"use client";
import React, { useEffect, useState } from "react";
import {
  BiCheckCircle,
  BiErrorCircle,
  BiLoaderAlt,
  BiSend,
  BiUser,
} from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import { ImageListType } from "react-images-uploading";
import { StoryInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { StoryValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import { WarsData } from "@/data/warsData";
import { ProfessionData } from "@/data/professionData";
import { GenderData } from "@/data/genderData";
import { Gender, IdNumberStatus } from "@/app/enums";
import SingleImageUploader from "../imageUploaders/singleImageUploader";
import MassacreFormLoader from "../loaders/massacreFormLoader";
import { extractMartyrStoryKeywords } from "@/utils/extractTags";
import Link from "next/link";

type StoryFormProps = {
  id?: string; // For edit mode
  id_number?: string;
  initialData?: StoryInterface | null;
};

const StoryForm = ({ id, id_number, initialData }: StoryFormProps) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!id); // Loading state for edit mode
  const router = useRouter();

  const [isValidIdNumber, setIsValidIdNumber] = useState<{
    isValid: boolean;
    story_id: string | null;
  } | null>(null);

  const [idCheckLoading, setIdCheckLoading] = useState<boolean>(false);
  const [idCheckStatus, setIdCheckStatus] = useState<IdNumberStatus>(
    IdNumberStatus.IDLE
  );

  const [originalIdNumber, setOriginalIdNumber] = useState<string>("");

  const [initialValues, setInitialValues] = useState<Partial<StoryInterface>>({
    id_number: "",
    title: {
      first_name: "",
      father_name: "",
      grandFather_name: "",
      last_name: "",
    },
    nickname: "",
    profession: "",
    gender: undefined,
    birth_date: "",
    death_date: "",
    social_media: {
      instagram: "",
      facebook: "",
      x: "",
    },
    location: {
      city: "",
      neighborhood: "",
    },
    bio: "",
    keywords: [],
    image: "",
    warTitle: "",
  });

  // Fetch data for edit mode
  useEffect(() => {
    if (id && !initialData) {
      const fetchStoryData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/fetch/${id}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("حدث خطأ أثناء جلب بيانات القصة");
          }

          const data = await response.json();

          if (data) {
            setOriginalIdNumber(data.id_number || ""); // Store the original ID

            setInitialValues({
              ...initialValues,
              ...data,
              id_number: data.id_number || "",
              title: {
                first_name: data.title?.first_name || "",
                father_name: data.title?.father_name || "",
                grandFather_name: data?.title?.grandFather_name || "",
                last_name: data.title?.last_name || "",
              },
              social_media: {
                instagram: data.social_media?.instagram || "",
                facebook: data.social_media?.facebook || "",
                x: data.social_media?.x || "",
              },
              nickname: data.nickname || "",
              death_date: data.death_date
                ? new Date(data.death_date).toISOString().split("T")[0]
                : "",
              birth_date: data.birth_date
                ? new Date(data.birth_date).toISOString().split("T")[0]
                : "",
              gender: data?.gender || undefined,
              profession: data.profession || "",
              location: {
                city: data.location.city || "",
                neighborhood: data.location.neighborhood || "",
              },
              bio: data.bio || "",
              keywords: data.keywords || [],
              warTitle: data.warTitle || "",
              image: data.image || "",
            });

            if (data.image) {
              setImages([{ data_url: data.image }]);
            }

            // Set cities if city exists
            if (data.location.city) {
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
          console.error("Error fetching story data:", error);
          toast.error("Failed to load story data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchStoryData();
    } else if (initialData) {
      setOriginalIdNumber(initialData.id_number || ""); // Store the original ID

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

      // Determine if we're creating or updating
      const isEditMode = !!id;
      const endpoint = isEditMode
        ? `/admin/stories/update/${id}`
        : `/user/stories/create`;
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
            ...(id_number && { id_number }), // Include id_number if provided
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
          ? "تم تحديث القصة بنجاح!"
          : "تم إرسال طلب نشر القصة بنجاح، وستتم مراجعته في أقرب وقت!"
      );

      setTimeout(() => {
        router.push(
          isEditMode
            ? `/admin/dashboard/stories`
            : `/stories/${data?.data?._id}`
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
    <div className="relative flex items-center justify-center w-full ">
      <Formik
        initialValues={initialValues}
        validationSchema={StoryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [tags, setTags] = useState<string[]>(values.keywords || []);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const timeout = setTimeout(() => {
              if (values.bio && values.bio.length > 20) {
                const extractedTags = extractMartyrStoryKeywords(values.bio);
                setTags(extractedTags);
                setFieldValue("keywords", extractedTags); // Also update Formik's tags field
              } else {
                setTags([]);
                setFieldValue("keywords", []);
              }
            }, 400); // debounce

            return () => clearTimeout(timeout);
          }, [values.bio, setFieldValue]);

          return (
            <Form className="flex flex-col gap-8 w-full">
              <div className="relative flex flex-col gap-4 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="المعلومات الأساسية"
                  className="mb-4 !text-xl z-10"
                />

                <div className="relative">
                  <div className="relative">
                    <Field
                      disabled={isSubmitting}
                      name="id_number"
                      as={Input}
                      type="number"
                      placeholder="رقم الهوية يتكون من 9 خانات"
                      label="رقم الهوية"
                      className={`focus:border-secondary ${
                        idCheckStatus === "valid"
                          ? "!border-approved"
                          : idCheckStatus === "invalid"
                          ? "!border-rejected"
                          : ""
                      }`}
                      maxLength={9}
                      minLength={9}
                      aria-label="رقم الهوية"
                      onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                        const idValue = e.target.value.trim();

                        if (idValue.length !== 9) {
                          setIdCheckStatus(IdNumberStatus.IDLE); // Skip API check
                          setIsValidIdNumber(null);
                          return;
                        }

                        // Only validate if:
                        // 1. We're in edit mode AND the ID has changed from the original
                        // OR 2. We're in create mode
                        const shouldValidate = id
                          ? idValue != originalIdNumber
                          : true;

                        if (!idCheckLoading && shouldValidate) {
                          setIdCheckLoading(true);
                          setIdCheckStatus(IdNumberStatus.CHECKING);

                          try {
                            const res = await fetch(
                              `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/check-id-validity?id_number=${idValue}`
                            );
                            const data = await res.json();

                            if (data.exists) {
                              setIdCheckStatus(IdNumberStatus.INVALID);
                              setIsValidIdNumber({
                                isValid: false,
                                story_id: data._id,
                              });
                            } else {
                              setIdCheckStatus(IdNumberStatus.VALID);
                              setIsValidIdNumber({
                                isValid: true,
                                story_id: null,
                              });
                            }
                          } catch (err) {
                            console.error("Error checking id_number:", err);
                            setIdCheckStatus(IdNumberStatus.IDLE);
                            toast.error("خطأ في التحقق من رقم الهوية");
                          } finally {
                            setIdCheckLoading(false);
                          }
                        } else if (idValue == originalIdNumber) {
                          setIdCheckStatus(IdNumberStatus.IDLE);
                          setIsValidIdNumber(null);
                        }
                      }}
                      onChange={(e: { target: { value: number } }) => {
                        setFieldValue("id_number", e.target.value);
                        setIdCheckStatus(IdNumberStatus.IDLE);
                        setIsValidIdNumber(null);
                      }}
                      error={errors["id_number"]}
                    />
                  </div>

                  <ErrorMessage
                    name="id_number"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />

                  {/* Only show API validation if Formik has no error */}
                  {!errors.id_number && (
                    <div className=" text-sm">
                      {idCheckStatus === IdNumberStatus.CHECKING && (
                        <p className="mt-2 text-gray-500 flex items-center gap-2 text-[12px]">
                          <BiLoaderAlt className="animate-spin" size={14} />
                          جاري التحقق من رقم الهوية...
                        </p>
                      )}

                      {idCheckStatus === IdNumberStatus.VALID && (
                        <p className="mt-2 text-approved flex items-center gap-2 text-[12px]">
                          <BiCheckCircle size={14} />
                          رقم الهوية صالح ويمكن استخدامه
                        </p>
                      )}

                      {idCheckStatus === IdNumberStatus.INVALID && (
                        <div className="mt-2 flex items-center gap-2 text-rejected text-[12px]">
                          <p className="flex items-center gap-1">
                            <BiErrorCircle size={14} />
                            {isValidIdNumber?.story_id && (
                              <Link
                                href={`/stories/${isValidIdNumber.story_id}`}
                                target="_blank"
                                className="hover:underline flex items-center gap-1"
                              >
                                رقم الهوية المدخل لديه قصة في المنصة
                              </Link>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Select
                    name="gender"
                    label="الجنس"
                    value={values?.gender}
                    title="اختر جنس الشهيد.."
                    options={GenderData}
                    className="focus:border-secondary"
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value as Gender);
                    }}
                    disabled={isSubmitting}
                    required={true}
                  />

                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                {/* First name & Father name fields    */}
                <div className="cards-grid-2">
                  {" "}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.first_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: محمد"
                      label="الاسم الأول"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="الاسم الأول"
                    />

                    <ErrorMessage
                      name="title.first_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.father_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: عبدالله"
                      label="اسم الأب"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="اسم الأب"
                    />

                    <ErrorMessage
                      name="title.father_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* First name & Father name fields    */}
                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.grandFather_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: طارق"
                      label="اسم الجد"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="اسم الجد"
                    />

                    <ErrorMessage
                      name="title.grandFather_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.last_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: حسب الله"
                      label="اسم العائلة"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="اسم العائلة"
                    />

                    <ErrorMessage
                      name="title.last_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <div className="cards-grid-2">
                  {/* Nickname Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="nickname"
                      as={Input}
                      type="text"
                      placeholder="لقب الشهيد (اختياري)"
                      label="لقب الشهيد"
                      icon={<BiUser />}
                      className={`focus:border-secondary`}
                      aria-label="لقب الشهيد"
                      required={false}
                    />
                  </div>

                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="مهنة الشهيد"
                      options={ProfessionData}
                      value={values?.profession}
                      title="المهنة"
                      onChange={(e) =>
                        setFieldValue("profession", e.target.value)
                      }
                      className={`focus:border-secondary`}
                      required={false}
                    />

                    <ErrorMessage
                      name="profession"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <div className="cards-grid-3">
                  {/* Social Media Fields */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="social_media.instagram"
                      as={Input}
                      type="url"
                      placeholder="رابط إنستجرام"
                      label="إنستجرام"
                      className={`focus:border-secondary`}
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
                      disabled={isSubmitting}
                      name="social_media.facebook"
                      as={Input}
                      type="url"
                      placeholder="رابط فيسبوك"
                      label="فيسبوك"
                      className={`focus:border-secondary`}
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
                      disabled={isSubmitting}
                      name="social_media.x"
                      as={Input}
                      type="url"
                      placeholder="رابط تويتر (X)"
                      label="تويتر (X)"
                      className={`focus:border-secondary`}
                      required={false}
                    />
                    <ErrorMessage
                      name="social_media.x"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col gap-4 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="التفاصيل الشخصية"
                  className="mb-4 !text-xl z-10"
                />

                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="birth_date"
                      as={Input}
                      type="date"
                      label="تاريخ الميلاد"
                      placeholder="تاريخ ميلاد الشهيد"
                      required={true}
                    />
                    <ErrorMessage
                      name="birth_date"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="death_date"
                      as={Input}
                      type="date"
                      label="تاريخ الاستشهاد"
                      placeholder="تاريخ استشهاد الشهيد"
                      required={true}
                    />
                    <ErrorMessage
                      name="death_date"
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
                <div>
                  <Select
                    disabled={isSubmitting}
                    label="العُدوان"
                    options={WarsData}
                    value={values?.warTitle}
                    title="اختر العُدوان (اختياري)"
                    onChange={(e) => setFieldValue("warTitle", e.target.value)}
                    className={`focus:border-secondary`}
                    required={false}
                  />
                  <ErrorMessage
                    name="warTitle"
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
                    className={`w-full focus:border-secondary`}
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
                disabled={
                  isSubmitting ||
                  idCheckStatus == IdNumberStatus.INVALID ||
                  idCheckStatus == IdNumberStatus.CHECKING
                }
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

export default StoryForm;
