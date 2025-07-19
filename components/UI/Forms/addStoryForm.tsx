"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiSend, BiUser } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { StoryInterface } from "@/app/interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { StoryValidationSchema } from "@/utils/validators";
import Input from "../inputs/input";
import { WarsData } from "@/data/warsData";

type AddStoryPrpos = {
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id_number: string;
  data: StoryInterface | null;
};

const AddStoryForm = ({
  setLoading,
  setIsOpen,
  id_number,
  data,
}: AddStoryPrpos) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 1; // Allow only one image
  const router = useRouter();

  console.log("Search data", data);
  console.log("id_number", id_number);

  // Updated initialValues to include image
  const initialValues: Partial<StoryInterface> = {
    nickname: "",
    social_media: {
      instagram: "",
      facebook: "",
      x: "",
    },
    city: "",
    neighborhood: "",
    bio: "",
    image: "",
    warTitle: "",
  };

  const birth_date = data?.birth_date;
  const death_date = data?.death_date;

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
    console.log("Submit handler started!");
    console.log("Values", values);

    try {
      // 1. Upload image to Cloudinary
      const imageUploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/upload`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: values.image }),
        }
      );

      let imageUploadData;
      try {
        imageUploadData = await imageUploadRes.json();
      } catch {
        imageUploadData = {};
      }

      if (!imageUploadRes.ok) {
        const errorMsg = imageUploadData?.error || "حدث خطأ أثناء رفع الصورة";
        throw new Error(errorMsg);
      }

      const imageUrl = imageUploadData.url;
      console.log("Image URL:", imageUrl);

      const age =
        new Date(death_date as string).getFullYear() -
        new Date(birth_date as string).getFullYear();

      // 2. Create story
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/storyDetails/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...values,
            age,
            image: imageUrl,
            id_number,
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
        const errorMsg = data?.error || "حدث خطأ أثناء إرسال بيانات القصة";
        throw new Error(errorMsg);
      }

      console.log("Martyr has been added successfully!", data);

      toast.success(
        "تم إرسال طلب نشر القصة بنجاح، وستتم مراجعته في أقرب وقت !"
      );

      setIsOpen(false);

      setTimeout(() => {
        router.push(`/stories/${data?.data?._id}`);
      }, 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      console.error("Error adding martyr:", message);
      setFormErrors(message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full border p-8 bg-white">
        <Heading
          title=""
          highLightText="إضافة قصة"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={StoryValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => {
            console.log("Errors:", errors);
            console.log("Form Values", values);

            return (
              <Form className="flex flex-col gap-4">
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
                    className={`focus:border-primary`}
                    aria-label="لقب الشهيد"
                    required={false}
                  />
                </div>

                {/* Social Media Fields */}
                <div>
                  <Field
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
                            ? cityObj[selectedCity as keyof typeof cityObj] ||
                                []
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

                <div>
                  <Select
                    disabled={isSubmitting}
                    label="العُدوان"
                    options={WarsData}
                    title="اختر العُدوان.."
                    onChange={(e) => setFieldValue("warTitle", e.target.value)}
                    className={`focus:border-primary`}
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
                  <div className="App">
                    <ReactImageUploading
                      multiple={false} // Allow only one image
                      value={images}
                      onChange={async (imageList: ImageListType) => {
                        setImages(imageList);
                        if (imageList.length > 0) {
                          setFieldValue("image", imageList[0].data_url); // ✅ store base64
                        } else {
                          setFieldValue("image", null); // ✅ reset on remove
                        }
                      }}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                      acceptType={["jpg", "gif", "png", "JFIF", "webp"]}
                    >
                      {({
                        onImageUpload,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div>
                          <div
                            className="flex flex-col items-center justify-center gap-2 border p-4 rounded-xl cursor-pointer group-disabled:cursor-not-allowed"
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <CiImageOn size={70} className="text-gray-200" />
                            <span className="text-[11px] text-theme text-center">
                              اضغط هنا لإرفاق صورة الشهيد
                            </span>
                          </div>

                          {images.map((image, index) => (
                            <div
                              key={index}
                              className="relative w-fit mt-4 border rounded-lg"
                            >
                              <Image
                                src={image.data_url}
                                alt="صورة الشهيد"
                                width={200}
                                height={200}
                              />
                              <div
                                onClick={() => {
                                  onImageRemove(index);
                                  setFieldValue("image", null);
                                }}
                                className="absolute -top-1 -right-1 bg-white border shadow-md p-1 rounded-md cursor-pointer hover:text-rejected"
                              >
                                <FaTimes size={10} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ReactImageUploading>
                  </div>

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

export default AddStoryForm;
