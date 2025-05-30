"use client";
import { StoryStatus } from "@/app/enums";
import { UserInterface } from "@/app/interfaces";
import RoleCard from "@/components/UI/cards/roleCard";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { RoleCardsData } from "@/data/roleCardsData";
import { EditUserValidationSchema } from "@/utils/validators";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { toast } from "react-toastify";

type EditUserProps = {
  data: UserInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditUser = ({ data, refetchData, setIsOpen }: EditUserProps) => {
  const initialValues = {
    name: data?.name || "",
    phone_number: data?.phone_number || "",
    id_number: data?.id_number || "",
    role: data?.role || "",
  };

  return (
    <div className="relative p-8 flex flex-col gap-2">
      <Image
        src={data?.image || "/notFound.png"}
        alt="صورة الشهيد"
        width={90}
        height={90}
        className="mx-auto z-[10] object-cover rounded-full"
        priority
        quality={100}
      />

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="font-semibold">{data?.name}</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={EditUserValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/story/status/approve`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    credential: "include",
                  },
                  body: JSON.stringify({
                    ...values,
                    status: StoryStatus.APPROVED,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to update the story.");
              }

              const result = await res.json();
              console.log("✅ Story updated:", result);
              setIsOpen(false); // Close the preview modal
              refetchData?.(); // Refetch the data after successful update
              toast.success("تم تحديث ونشر القصة بنجاح!");
              // Optionally show a toast or redirect
            } catch (error) {
              console.error("❌ Error updating story:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => {
            console.log("Errors:", errors);
            console.log("Form Values", values);

            return (
              <Form className="flex flex-col gap-4 mt-6">
                <div>
                  <Field
                    required={false}
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="اسم المستخدم"
                    className={`focus:border-primary bg-white border`}
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
                    className={`focus:border-primary bg-white border`}
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
                    className={`focus:border-primary bg-white border`}
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

                <div className="flex items-center gap-3 mt-4">
                  {RoleCardsData.map(({ role, Icon, color }, index) => {
                    return (
                      <RoleCard
                        key={index}
                        role={role}
                        icon={<Icon size={22} />}
                        onClick={() => {
                          setFieldValue("role", role);
                          console.log("Role", role);
                          console.log("Values.role", values.role);
                        }}
                        className={`${
                          role == values.role
                            ? `text-white border-transparent`
                            : ""
                        }`}
                        style={{
                          background: role == values.role ? color : "",
                        }}
                      />
                    );
                  })}
                </div>

                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 mt-2 font-semibold text-[10px]"
                />

                <Button
                  type="submit"
                  title="تعديل البيانات"
                  className="bg-primary text-white mt-4"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
