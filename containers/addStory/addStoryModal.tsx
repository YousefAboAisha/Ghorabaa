"use client";
import React, { useState } from "react";
import { BiIdCard, BiSend, BiUser } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@/components/UI/inputs/selectInput";
import TextArea from "@/components/UI/inputs/textArea";
import { CountriesData } from "@/data/countriesData";
import { CitiesData } from "@/data/citiesData";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { StoryInterface } from "@/app/interfaces";
import { StoryStatus } from "@/app/enums";

const AddStory = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 1; // Allow only one image

  const { data: session } = useSession();
  console.log("Session Data:", session);
  console.log("Session Access Token:", session?.accessToken);

  // Updated initialValues to include image
  const initialValues: Partial<StoryInterface> = {
    id_number: "407709260",
    name: "محمد عبد الله طارق حسب الله",
    birth_date: new Date("2002-01-01").toISOString().split("T")[0],
    death_date: new Date("2023-01-01").toISOString().split("T")[0],
    city: "",
    neighborhood: "",
    bio: "",
    image: "",
    status: StoryStatus.APPROVED,
    publisher_id: session?.user.id, // Assuming you have a way to get the user ID
  };

  const validationSchema = Yup.object({
    city: Yup.string().required("يرجى اختيار المدينة"),
    neighborhood: Yup.string().required("يرجى اختيار الحي"),
    bio: Yup.string().required("يرجى إدخال السيرة الذاتية"),
    image: Yup.mixed().required("يرجى إضافة صورة"), // Validate that an image is uploaded
  });

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    console.log("Submit handler started!");
    setFormErrors("");
    console.log("Values", values);

    try {
      // 1. Upload image to Cloudinary first
      const imageUploadRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: values.image }), // base64 image
        headers: { "Content-Type": "application/json" },
      });

      const { url } = await imageUploadRes.json();
      console.log("Image URL:", url);
      if (!imageUploadRes.ok) {
        setFormErrors("Error uploading image");
        console.log("Image Upload Error:", url);
        return;
      }

      const response = await fetch("/api/story/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: JSON.stringify({ ...values, image: url }),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Add Martyr Error:", data.error);
        return;
      }

      window.location.reload();
      console.log("Martyr has been added successfully!", data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message);
      toast.error("حدث خطأ أثناء إضافة الشهيد");
      console.error("Error adding martyr", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="relative w-full border p-8 bg-white">
        <Heading
          title=""
          highLightText="إضافة قصة"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => {
            console.log("Errors:", errors);
            console.log("Form Values", values);

            return (
              <Form className="flex flex-col gap-4">
                {/* ID Number Field */}
                <div>
                  <Field
                    required={false}
                    readOnly
                    disabled={true}
                    name="id_number"
                    as={Input}
                    type="text"
                    placeholder="رقم الهوية"
                    label="رقم الهوية"
                    icon={<BiIdCard />}
                    className={`focus:border-primary`}
                    aria-label="رقم الهوية"
                    aria-invalid={!!errors.id_number}
                  />
                </div>

                {/* Full Name Field */}
                <div>
                  <Field
                    required={false}
                    readOnly
                    disabled={true}
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="اسم الشهيد رباعي"
                    label="الاسم رباعي"
                    icon={<BiUser />}
                    className={`focus:border-primary`}
                    aria-label="الاسم رباعي"
                    aria-invalid={!!errors.name}
                  />
                </div>

                {/* Birth Date and Death Date Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <Field
                      required={false}
                      readOnly
                      disabled={true}
                      name="birth_date"
                      as={Input}
                      type="date"
                      placeholder="تاريخ الميلاد"
                      label="تاريخ الميلاد"
                      className={`focus:border-primary`}
                      aria-label="تاريخ الميلاد"
                      aria-invalid={!!errors.birth_date}
                    />
                  </div>

                  <div>
                    <Field
                      required={false}
                      readOnly
                      disabled={true}
                      name="death_date"
                      as={Input}
                      type="date"
                      placeholder="تاريخ الاستشهاد"
                      label="تاريخ الاستشهاد"
                      className={`focus:border-primary`}
                      aria-label="تاريخ الاستشهاد"
                      aria-invalid={!!errors.death_date}
                    />
                  </div>
                </div>

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
                          ? cityObj[selectedCity as keyof typeof cityObj] || []
                          : []
                      );
                    }}
                    className={`focus:border-primary`}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[10px]"
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
                    className="text-red-500 mt-2 font-bold text-[10px]"
                  />
                </div>
                {/* Notes Field */}
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="bio"
                    as={TextArea}
                    placeholder="عن حياة الشهيد..."
                    label="السيرة الذاتية"
                    className={`w-full focus:border-primary`}
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[10px]"
                  />
                </div>

                <div>
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
                            className="flex flex-col items-center justify-center gap-2 border p-4 rounded-xl cursor-pointer"
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
                                className="absolute -top-1 -right-1 bg-white border shadow-md p-1 rounded-md cursor-pointer hover:text-[red]"
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
                    className="text-red-500 mt-2 font-bold text-[10px]"
                  />
                </div>

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
                  <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
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

export default AddStory;
