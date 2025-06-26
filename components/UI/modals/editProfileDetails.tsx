"use client";
import React, { Dispatch, SetStateAction } from "react";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdNumbers } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa";
import { ProfileValidationSchema } from "@/utils/validators";

type EditProfileFormPDetails = {
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: {
    name: string;
    phone_number: string;
    id_number: string;
  };
};

const EditProfileDetails = ({ data }: EditProfileFormPDetails) => {
  const { name, phone_number, id_number } = data;
  const initialValues = {
    name: name || "",
    phone_number: phone_number || "",
    id_number: id_number || "",
  };

  return (
    <div className="relative w-full p-6">
      <h2 className="text-xl font-semibold mx-auto text-center">
        تعديل البيانات
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/users/update`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
                credentials: "include", // 👈 THIS IS CRITICAL
              }
            );

            const data = await response.json();

            if (response.ok) {
              console.log("User details updated:", data);
              window.location.reload();
            } else {
              console.error("Failed to add User details:", data.error);
            }
          } catch (error) {
            console.error("Error updating User details:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="relative mt-6 flex flex-col gap-4">
            {/* Notes Field */}
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
