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
import { FiArrowDown } from "react-icons/fi";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import TextArea from "@/components/UI/inputs/textArea";

const AddMartyr = () => {
  const [formErrors, setFormErrors] = useState<string>("");

  const initialValues = {
    id_number: "",
    first_name: "",
    father_name: "",
    grandfather_name: "",
    last_name: "",
    birth_date: "",
    death_date: "",
    city: "",
    neighbourhood: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    id_number: Yup.string().required("يرجى إدخال رقم الهوية"),
    first_name: Yup.string().required("يرجى إدخال الاسم الأول"),
    father_name: Yup.string().required("يرجى إدخال اسم الأب"),
    grandfather_name: Yup.string().required("يرجى إدخال اسم الجد"),
    last_name: Yup.string().required("يرجى إدخال اسم العائلة"),
    birth_date: Yup.date().required("يرجى إدخال تاريخ الميلاد"),
    death_date: Yup.date().required("يرجى إدخال تاريخ الاستشهاد"),
    city: Yup.string().required("يرجى اختيار المدينة"),
    neighbourhood: Yup.string().required("يرجى اختيار الحي"),
    notes: Yup.string().required("يرجى إدخال السيرة الذاتية"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setFormErrors("");

    try {
      const response = await fetch("/api/martyr/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Add Martyr Error:", data.error);
        return;
      }

      // Show success toast
      toast.success("تمت إضافة الشهيد بنجاح!");

      // Redirect to martyrs page after a short delay
      setTimeout(() => {
        window.location.href = "/martyrs";
      }, 1000);

      console.log("Martyr has been added successfully!", data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message);
      toast.error("حدث خطأ أثناء إضافة الشهيد"); // Show error toast
      console.error("Error adding martyr", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mb-14 flex items-center justify-center">
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

      <div className="w-11/12 md:w-7/12 lg:w-6/12 border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <Heading
          title="إضافة قصة"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              {/* ID Number Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="id_number"
                  as={Input}
                  type="text"
                  placeholder="رقم الهوية"
                  label="رقم الهوية"
                  icon={BiIdCard}
                  className={`focus:border-primary ${
                    errors.id_number && "!border-[red]"
                  }`}
                  aria-label="رقم الهوية"
                  aria-invalid={!!errors.id_number}
                />
                <ErrorMessage
                  name="id_number"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* First Name and Father Name Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="first_name"
                    as={Input}
                    type="text"
                    placeholder="الاسم الأول"
                    label="الاسم الأول"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.first_name && "!border-[red]"
                    }`}
                    aria-label="الاسم الأول"
                    aria-invalid={!!errors.first_name}
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="father_name"
                    as={Input}
                    type="text"
                    placeholder="اسم الأب"
                    label="اسم الأب"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.father_name && "!border-[red]"
                    }`}
                    aria-label="اسم الأب"
                    aria-invalid={!!errors.father_name}
                  />
                  <ErrorMessage
                    name="father_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              {/* Grandfather Name and Last Name Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="grandfather_name"
                    as={Input}
                    type="text"
                    placeholder="اسم الجد"
                    label="اسم الجد"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.grandfather_name && "!border-[red]"
                    }`}
                    aria-label="اسم الجد"
                    aria-invalid={!!errors.grandfather_name}
                  />
                  <ErrorMessage
                    name="grandfather_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="last_name"
                    as={Input}
                    type="text"
                    placeholder="اسم العائلة"
                    label="اسم العائلة"
                    icon={BiUser}
                    className={`focus:border-primary ${
                      errors.last_name && "!border-[red]"
                    }`}
                    aria-label="اسم العائلة"
                    aria-invalid={!!errors.last_name}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              {/* Birth Date and Death Date Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="birth_date"
                    as={Input}
                    type="date"
                    placeholder="تاريخ الميلاد"
                    label="تاريخ الميلاد"
                    className={`focus:border-primary ${
                      errors.birth_date && "!border-[red]"
                    }`}
                    aria-label="تاريخ الميلاد"
                    aria-invalid={!!errors.birth_date}
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="death_date"
                    as={Input}
                    type="date"
                    placeholder="تاريخ الاستشهاد"
                    label="تاريخ الاستشهاد"
                    className={`focus:border-primary ${
                      errors.death_date && "!border-[red]"
                    }`}
                    aria-label="تاريخ الاستشهاد"
                    aria-invalid={!!errors.death_date}
                  />
                  <ErrorMessage
                    name="death_date"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              {/* City and Neighbourhood Fields */}
              <div>
                <Select
                  disabled={isSubmitting}
                  label="المدينة"
                  options={leasingPlansOptions}
                  title="اختر المدينة التي عاش فيها الشهيد..."
                  icon={<FiArrowDown />}
                  value={values.city}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                  className={`focus:border-primary ${
                    errors.city && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              <div>
                <Select
                  disabled={isSubmitting}
                  label="الحي"
                  options={leasingPlansOptions}
                  title="اختر الحي الذي عاش فيها الشهيد..."
                  icon={<FiArrowDown />}
                  value={values.neighbourhood}
                  onChange={(e) =>
                    setFieldValue("neighbourhood", e.target.value)
                  }
                  className={`focus:border-primary ${
                    errors.neighbourhood && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="neighbourhood"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Notes Field */}
              <div>
                <Field
                  name="notes"
                  as={TextArea}
                  placeholder="عن حياة الشهيد..."
                  label="السيرة الذاتية"
                  className={`w-full focus:border-primary`}
                  value={values.notes}
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                title={"إرسال"}
                type="submit"
                className="bg-primary w-full hover:shadow-lg"
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddMartyr;
