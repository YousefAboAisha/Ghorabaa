"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdNumbers } from "react-icons/md";
import { FaPhone, FaTimes, FaUser } from "react-icons/fa";
import { ProfileValidationSchema } from "@/utils/validators";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

type EditProfileFormPDetails = {
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: {
    name: string;
    phone_number: string;
    id_number: string;
    image?: string;
  };
};

const EditProfileDetails = ({ data, setLoading }: EditProfileFormPDetails) => {
  const { name, phone_number, id_number, image } = data;
  const [images, setImages] = useState<ImageListType>([]);
  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);
  const [placeholderImage, setPlaceholderImage] =
    useState<string>("/notFound.png");

  console.log("EditProfileDetails data:", data);

  const initialValues = {
    name: name || "",
    phone_number: phone_number || "",
    id_number: id_number || "",
    image: image || "./notFound.png",
  };

  useEffect(() => {
    if (image) {
      setPlaceholderImage(image); // existing user image
    } else {
      setPlaceholderImage("/notFound.png"); // default fallback
    }
  }, [image]);

  return (
    <div className="relative w-full p-6">
      <h2 className="text-xl font-semibold mx-auto text-center">
        تعديل البيانات
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setLoading(true);
          try {
            let finalImageUrl = values.image;

            // 👇 Upload image only if it's a new base64 image (not an existing URL)
            if (isNewImageUploaded && values.image?.startsWith("data:image")) {
              const imageUploadRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/users`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    image: values.image,
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              );

              const { url } = await imageUploadRes.json();
              if (!imageUploadRes.ok || !url) {
                console.error("Image Upload Error:", url);
                setSubmitting(false);
                return;
              }

              finalImageUrl = url;
            }

            // 👇 Send updated form data with uploaded image URL
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/users/update`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ ...values, image: finalImageUrl }),
              }
            );

            const data = await response.json();

            if (response.ok) {
              setLoading(true);
              console.log("User details updated:", data);
              window.location.reload();
            } else {
              console.error("Failed to update user details:", data.error);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error updating user details:", error);
            setLoading(false);
          } finally {
            setSubmitting(false);
            setLoading(false);
          }
        }}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form className="relative mt-6 flex flex-col gap-4">
            <ReactImageUploading
              multiple={false}
              value={images}
              onChange={async (imageList: ImageListType) => {
                setImages(imageList);

                if (imageList.length > 0) {
                  setFieldValue("image", imageList[0].data_url);
                  setIsNewImageUploaded(true);
                } else {
                  setFieldValue("image", null);
                  setIsNewImageUploaded(false);
                }
              }}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["jpg", "gif", "png", "jfif", "webp"]}
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <fieldset
                  disabled={isSubmitting}
                  className="relative disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* 📸 Custom image uploader circle */}
                  <div
                    title="تغيير صورة الملف الشخصي"
                    onClick={isSubmitting ? undefined : onImageUpload} // 👈 Disable click during submission
                    {...(!isSubmitting ? dragProps : {})} // 👈 Only apply drag props when enabled
                    className={`relative group flex items-center justify-center bg-background_light w-[100px] h-[100px] rounded-full p-1 shadow-md mx-auto before:absolute before:w-full before:h-full before:rounded-full before:opacity-0 before:bg-[#00000092] hover:before:opacity-100 before:z-10 before:duration-300 ${
                      isSubmitting
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    } transition-all duration-300 overflow-hidden`}
                  >
                    <Image
                      src={
                        images.length > 0
                          ? images[0].data_url
                          : placeholderImage // ✅ always fallback to user image or notFound
                      }
                      fill
                      alt="صورة الملف الشخصي"
                      className="object-cover"
                    />

                    <CiCamera
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white z-10 duration-300"
                      size={35}
                    />
                  </div>

                  {/* ❌ Remove button */}
                  {isNewImageUploaded && images.length > 0 && (
                    <button
                      type="button"
                      className={`absolute top-0 right-[calc(50%-10px)] -translate-y-[10px] bg-white border shadow p-1 rounded-full z-20 ${
                        isSubmitting
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500"
                      }`}
                      onClick={
                        isSubmitting
                          ? undefined
                          : () => {
                              onImageRemove(0);
                              setFieldValue("image", null);
                              setIsNewImageUploaded(false);
                              setImages([]);
                            }
                      }
                      disabled={isSubmitting}
                    >
                      <FaTimes size={10} />
                    </button>
                  )}
                </fieldset>
              )}
            </ReactImageUploading>

            {/* name Field */}
            <div>
              <Field
                required={false}
                name="name"
                as={Input}
                type="text"
                placeholder="اسم المستخدم"
                className={`focus:border-secondary bg-white border`}
                aria-label="اسم المستخدم"
                aria-invalid={!!errors.name}
                icon={<FaUser />}
              />

              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            {/* phone number Field */}
            <div>
              <Field
                required={false}
                name="phone_number"
                as={Input}
                type="tel"
                placeholder="رقم الهاتف"
                className={`focus:border-secondary bg-white border`}
                aria-label="رقم الهاتف"
                aria-invalid={!!errors.phone_number}
                icon={<FaPhone />}
                style={{
                  direction: "rtl",
                }}
              />

              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            {/* ID number Field */}
            <div>
              <Field
                required={false}
                name="id_number"
                as={Input}
                type="tel"
                placeholder="رقم الهوية"
                className={`focus:border-secondary bg-white border`}
                aria-label="رقم الهوية"
                aria-invalid={!!errors.id_number}
                icon={<MdNumbers size={20} />}
                style={{
                  direction: "rtl",
                }}
              />

              <ErrorMessage
                name="id_number"
                component="div"
                className="text-red-500 mt-2 font-semibold text-[10px]"
              />
            </div>

            <Button
              title={"حفظ البيانات"}
              type="submit"
              className="bg-secondary text-white mt-4"
              disabled={isSubmitting}
              hasShiningBar={false}
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileDetails;
