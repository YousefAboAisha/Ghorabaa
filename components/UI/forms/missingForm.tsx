"use client";
import React, { useEffect, useState } from "react";
import {
  BiCheckCircle,
  BiErrorCircle,
  BiLoaderAlt,
  BiPhone,
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
import { MissingInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MissingValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import { GenderData } from "@/data/genderData";
import { Gender, IdNumberStatus } from "@/app/enums";
import SingleImageUploader from "../imageUploaders/singleImageUploader";
import Link from "next/link";
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";
import MissingFormSkeletonLoader from "../loaders/missingFormSkeletonLoader";

type MissingFormProps = {
  id?: string;
  id_number?: string;
  initialData?: MissingInterface | null;
};

const MissingForm = ({ id, id_number, initialData }: MissingFormProps) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [reporterCities, setReporterCities] = useState<
    { value: string; title: string }[]
  >([]);
  const [missingCities, setMissingCities] = useState<
    { value: string; title: string }[]
  >([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!id);
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

  const [initialValues, setInitialValues] = useState<Partial<MissingInterface>>(
    {
      id_number: "",
      reporter_phone_number: "",
      reporter_name: "",
      reporter_location: {
        city: "",
        neighborhood: "",
      },
      title: {
        first_name: "",
        father_name: "",
        grandFather_name: "",
        last_name: "",
      },
      nickname: "",
      gender: undefined,
      birth_date: "",
      missing_date: "",
      location: {
        city: "",
        neighborhood: "",
      },
      details: "",
      image: "",
    }
  );

  // Fetch data for edit mode
  useEffect(() => {
    if (id && !initialData) {
      const fetchMissingData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/missings/fetch/${id}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("حدث خطأ أثناء جلب بيانات البلاغ");
          }

          const data = await response.json();

          if (data) {
            setOriginalIdNumber(data.id_number || "");

            setInitialValues({
              ...initialValues,
              ...data,
              reporter_name: data.reporter_name,
              reporter_phone_number: data.reporter_phone_number,
              reporter_location: {
                city: data.reporter_location?.city || "",
                neighborhood: data.reporter_location?.neighborhood || "",
              },
              id_number: data.id_number || "",
              title: {
                first_name: data.title?.first_name || "",
                father_name: data.title?.father_name || "",
                grandFather_name: data?.title?.grandFather_name || "",
                last_name: data.title?.last_name || "",
              },
              nickname: data.nickname || "",
              missing_date: data.missing_date
                ? new Date(data.missing_date).toISOString().split("T")[0]
                : "",
              birth_date: data.birth_date
                ? new Date(data.birth_date).toISOString().split("T")[0]
                : "",
              gender: data?.gender || undefined,
              location: {
                city: data.location?.city || "",
                neighborhood: data.location?.neighborhood || "",
              },
              details: data.details || "",
              keywords: data.keywords || [],
              image: data.image || "",
            });

            if (data.image) {
              setImages([{ data_url: data.image }]);
            }

            // Set cities for both locations
            if (data.reporter_location?.city) {
              const cityObj = CitiesData.find(
                (city) => city[data.reporter_location.city as keyof typeof city]
              );
              setReporterCities(
                cityObj
                  ? cityObj[
                      data.reporter_location.city as keyof typeof cityObj
                    ] || []
                  : []
              );
            }

            if (data.location?.city) {
              const cityObj = CitiesData.find(
                (city) => city[data.location.city as keyof typeof city]
              );
              setMissingCities(
                cityObj
                  ? cityObj[data.location.city as keyof typeof cityObj] || []
                  : []
              );
            }
          }
        } catch (error) {
          console.error("Error fetching missing person data:", error);
          toast.error("فشل في تحميل بيانات البلاغ");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMissingData();
    } else if (initialData) {
      setOriginalIdNumber(initialData.id_number || "");
      setInitialValues((prev) => ({
        ...prev,
        ...initialData,
      }));
      if (initialData.image) {
        setImages([{ data_url: initialData.image }]);
      }
      // Initialize cities for both locations from initialData
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/missings`,
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

      // Prepare submission data
      const submissionData = {
        ...values,
        image: imageUrl,
        id_number: id_number || values.id_number, // Use prop id_number if provided
        // Ensure all required fields are included
        reporter_phone_number: values.reporter_phone_number || "",
        gender: values.gender || "",
      };

      const isEditMode = !!id;
      const endpoint = isEditMode
        ? `/admin/missings/update/${id}`
        : `/user/missings/create`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(submissionData),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const errorMsg = data?.error || "حدث خطأ أثناء حفظ البيانات";
        throw new Error(errorMsg);
      }

      toast.success(
        isEditMode
          ? "تم تحديث البيانات بنجاح!"
          : "تم إرسال البلاغ بنجاح، وستتم مراجعته في أقرب وقت!"
      );

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Error saving data:", message);
      setFormErrors(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <MissingFormSkeletonLoader />;
  }

  return (
    <div className="relative flex items-center justify-center w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={MissingValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue, errors, setFieldTouched }) => {
          console.log("Missing form values:", values);
          console.log("Missing form errors:", errors);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [tags, setTags] = useState<string[]>(values.keywords || []);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const timeout = setTimeout(() => {
              if (values.details && values.details.length > 20) {
                const extractedTags = extractArabicKeywords(values.details);
                setTags(extractedTags);
                setFieldValue("keywords", extractedTags);
              } else {
                setTags([]);
                setFieldValue("keywords", []);
              }
            }, 400);

            return () => clearTimeout(timeout);
          }, [values.details, setFieldValue]);

          // Fixed ID validation function
          const validateIdNumber = async (idValue: string) => {
            if (idValue.length !== 9) {
              setIdCheckStatus(IdNumberStatus.IDLE);
              setIsValidIdNumber(null);
              return;
            }

            const shouldValidate = id ? idValue !== originalIdNumber : true;

            if (!shouldValidate) {
              setIdCheckStatus(IdNumberStatus.IDLE);
              setIsValidIdNumber(null);
              return;
            }

            if (!idCheckLoading) {
              setIdCheckLoading(true);
              setIdCheckStatus(IdNumberStatus.CHECKING);

              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/check-id-validity?id_number=${idValue}`
                );

                if (!res.ok) {
                  throw new Error("فشل في التحقق من رقم الهوية");
                }

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
            }
          };

          return (
            <Form className="flex flex-col gap-8 w-full">
              {/* Reporter Information Section */}
              <div className="relative flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="معلومات المُبلِغ"
                  className="mb-4 !text-xl z-10"
                />

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="reporter_name"
                    as={Input}
                    type="text"
                    placeholder="مثال: يوسف رشاد أبو عيشة"
                    label="الاسم ثلاثي للمُبلِغ"
                    icon={<BiUser />}
                    className="focus:border-secondary"
                    aria-label="الاسم ثلاثي للمُبلِغ"
                  />
                  <ErrorMessage
                    name="reporter_name"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                <div>
                  <Field
                    name="reporter_phone_number"
                    as={Input}
                    type="tel"
                    label="رقم هاتف المُبلِغ"
                    placeholder="رقم الهاتف للتواصل مع المُبلِغ"
                    className="focus:border-secondary"
                    aria-label="رقم هاتف المُبلِغ"
                    icon={<BiPhone />}
                    style={{ direction: "rtl" }}
                  />
                  <ErrorMessage
                    name="reporter_phone_number"
                    component="div"
                    className="text-red-500 mt-2 font-semibold text-[10px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="مدينة المُبلِغ"
                      options={CountriesData}
                      value={values?.reporter_location?.city}
                      title="المدينة الحالية للمُبلِغ"
                      onChange={(e) => {
                        const selectedCity = e.target.value;
                        setFieldValue("reporter_location.city", selectedCity);
                        const cityObj = CitiesData.find(
                          (city) => city[selectedCity as keyof typeof city]
                        );
                        setReporterCities(
                          cityObj
                            ? cityObj[selectedCity as keyof typeof cityObj] ||
                                []
                            : []
                        );
                        // Reset neighborhood when city changes
                        setFieldValue("reporter_location.neighborhood", "");
                      }}
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="reporter_location.city"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="حي المُبلِغ"
                      options={reporterCities}
                      value={values?.reporter_location?.neighborhood}
                      title="الحي الحالي للمُبلِغ"
                      onChange={(e) =>
                        setFieldValue(
                          "reporter_location.neighborhood",
                          e.target.value
                        )
                      }
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="reporter_location.neighborhood"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>
              </div>

              {/* Missing Person Information Section */}
              <div className="relative flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="بيانات الشخص المفقود"
                  className="mb-4 !text-xl z-10"
                />

                {/* ID Number Field with Validation */}
                <div className="relative">
                  <div className="relative">
                    <Field
                      disabled={isSubmitting}
                      name="id_number"
                      as={Input}
                      type="text"
                      placeholder="رقم الهوية يتكون من 9 خانات"
                      label="رقم هوية المفقود"
                      className={`focus:border-secondary ${
                        idCheckStatus === IdNumberStatus.VALID
                          ? "!border-approved"
                          : idCheckStatus === IdNumberStatus.INVALID
                          ? "!border-rejected"
                          : ""
                      }`}
                      maxLength={9}
                      minLength={9}
                      aria-label="رقم هوية المفقود"
                      onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                        const idValue = e.target.value.trim();
                        setFieldTouched("id_number", true);
                        await validateIdNumber(idValue);
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("id_number", e.target.value);
                        if (idCheckStatus !== IdNumberStatus.IDLE) {
                          setIdCheckStatus(IdNumberStatus.IDLE);
                          setIsValidIdNumber(null);
                        }
                      }}
                    />
                  </div>

                  {!errors.id_number && (
                    <div className="text-sm">
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
                          <BiErrorCircle size={14} />
                          {isValidIdNumber?.story_id ? (
                            <Link
                              href={`/missings/${isValidIdNumber.story_id}`}
                              target="_blank"
                              className="hover:underline"
                            >
                              رقم الهوية المدخل لديه بلاغ في المنصة
                            </Link>
                          ) : (
                            "رقم الهوية مستخدم مسبقاً"
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Name Fields */}
                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.first_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: عادل"
                      label="الاسم الأول للمفقود"
                      icon={<BiUser />}
                      className="focus:border-secondary"
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
                      placeholder="مثال: رشاد"
                      label="اسم أب المفقود"
                      icon={<BiUser />}
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="title.father_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="title.grandFather_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: رزق"
                      label="اسم جد المفقود"
                      icon={<BiUser />}
                      className="focus:border-secondary"
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
                      placeholder="مثال: أبو عيشة"
                      label="اسم عائلة المفقود"
                      icon={<BiUser />}
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="title.last_name"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* Gender and Nickname */}
                <div className="cards-grid-2">
                  <div>
                    <Select
                      name="gender"
                      label="جنس المفقود"
                      value={values?.gender}
                      title="اختر جنس المفقود"
                      options={GenderData}
                      className="focus:border-secondary"
                      onChange={(e) => {
                        setFieldValue("gender", e.target.value as Gender);
                      }}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>

                  {/* Nickname Field */}
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="nickname"
                      as={Input}
                      type="text"
                      placeholder="لقب المفقود (اختياري)"
                      label="لقب المفقود"
                      icon={<BiUser />}
                      className="focus:border-secondary"
                      required={false}
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details Section */}
              <div className="relative flex flex-col gap-6 w-full border p-8 bg-white rounded-lg">
                <Heading
                  title="تفاصيل حادثة الفقدان"
                  className="mb-4 !text-xl z-10"
                />

                <div className="cards-grid-2">
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="birth_date"
                      as={Input}
                      type="date"
                      label="تاريخ ميلاد المفقود"
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
                      name="missing_date"
                      as={Input}
                      type="date"
                      label="تاريخ الاختفاء "
                      required={true}
                    />
                    <ErrorMessage
                      name="missing_date"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Select
                      disabled={isSubmitting}
                      label="مدينة الفقدان"
                      options={CountriesData}
                      value={values?.location?.city}
                      title="المدينة التي فُقد فيها المفقود"
                      onChange={(e) => {
                        const selectedCity = e.target.value;
                        setFieldValue("location.city", selectedCity);
                        const cityObj = CitiesData.find(
                          (city) => city[selectedCity as keyof typeof city]
                        );
                        setMissingCities(
                          cityObj
                            ? cityObj[selectedCity as keyof typeof cityObj] ||
                                []
                            : []
                        );
                        setFieldValue("location.neighborhood", "");
                      }}
                      className="focus:border-secondary"
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
                      label="حي الفقدان"
                      options={missingCities}
                      value={values?.location?.neighborhood}
                      title="الحي الذي فُقد فيه المفقود"
                      onChange={(e) =>
                        setFieldValue("location.neighborhood", e.target.value)
                      }
                      className="focus:border-secondary"
                    />
                    <ErrorMessage
                      name="location.neighborhood"
                      component="div"
                      className="text-red-500 mt-2 font-semibold text-[10px]"
                    />
                  </div>
                </div>

                {/* Details Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="details"
                    as={TextArea}
                    placeholder="تفاصيل عن المفقود والمرة الأخيرة التي شوهد فيها والملابس التي كان يرتديها وأي معلومات أخرى مفيدة..."
                    label="تفاصيل الفقدان"
                    className="w-full focus:border-secondary"
                  />
                  <div className="flex justify-between mt-1">
                    <ErrorMessage
                      name="details"
                      component="div"
                      className="text-red-500 font-semibold text-[10px]"
                    />
                    <div className="text-[10px] text-gray-500 self-end">
                      عدد الكلمات:{" "}
                      {values.details?.trim().split(/\s+/).filter(Boolean)
                        .length || 0}
                      / 100
                    </div>
                  </div>

                  {tags && tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      {tags.map((keyword, index) => (
                        <div
                          key={index}
                          className="border bg-[#5b913b40] rounded-xl p-1.5 px-3 text-[10px]"
                        >
                          #{keyword}
                        </div>
                      ))}
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
                title={id ? "تحديث البلاغ" : "إرسال البلاغ"}
                type="submit"
                className="bg-secondary w-full hover:shadow-lg text-sm"
                icon={<BiSend className="rotate-180" />}
                loading={isSubmitting}
                disabled={
                  isSubmitting ||
                  idCheckStatus === IdNumberStatus.INVALID ||
                  idCheckStatus === IdNumberStatus.CHECKING
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

export default MissingForm;
