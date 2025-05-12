"use client";
import { Field, Form, Formik } from "formik";
import TextArea from "@/components/UI/inputs/textArea";
import * as Yup from "yup";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/UI/inputs/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionProps } from "@/app/interfaces";

const CommentForm = ({ session }: SessionProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl =
    pathname + (searchParams.toString() ? `?${searchParams}` : "");
  console.log("Current URL:", currentUrl);

  // Updated initialValues to include image
  const initialValues = {
    comment: "",
  };

  // Updated validationSchema to include image validation (optional)
  const validationSchema = Yup.object({
    comment: Yup.string().required("يرجى كتابة التعليق للشهيد"),
  });

  return (
    <div>
      {session ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ isSubmitting, values, errors }) => (
            <Form className="relative mt-4">
              {/* Notes Field */}
              <Field
                name="comment"
                as={TextArea}
                placeholder="أضف تعليقاً أو ذكرى.."
                className={`w-full focus:border-secondary bg-white text-md`}
                value={values.comment}
                aria-invalid={!!errors.comment}
              />

              <Button
                title={"إضافة"}
                type="submit"
                className="bg-secondary text-white text-sm w-8/12 md:w-4/12 lg:w-2/12 mt-2"
                disabled={isSubmitting || values.comment == ""}
                hasShiningBar={false}
                icon={<FiPlus />}
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div className="relative rounded-lg mt-4 before:absolute before:w-full before:h-full before:z-20 before:backdrop-blur-[3px] before:bg-[#373c4b6a]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {}}
          >
            {({ isSubmitting, values, errors }) => (
              <Form className="relative">
                <div className="abs-center flex flex-col gap-2 w-fit p-4 bg-white border rounded-lg z-30 shadow-lg">
                  <p className="text-center text-[12px]">
                    يجب عليك تسجيل الدخول حتى تتمكن من إضافة تعليق!
                  </p>
                  <Link
                    href={`/signin?callbackUrl=${encodeURIComponent(
                      currentUrl
                    )}`}
                  >
                    <Button
                      title="تسجيل الدخول"
                      className="bg-secondary text-white"
                      hasShiningBar={false}
                    />
                  </Link>
                </div>
                {/* Notes Field */}
                <Field
                  name="comment"
                  as={TextArea}
                  placeholder="أضف تعليقاً أو ذكرى.."
                  className={`w-full focus:border-secondary bg-white text-md`}
                  value={values.comment}
                  aria-invalid={!!errors.comment}
                />

                <Button
                  title={"إضافة"}
                  type="submit"
                  className="bg-secondary text-white text-sm w-8/12 md:w-4/12 lg:w-2/12 mt-2"
                  disabled={isSubmitting || values.comment == ""}
                  hasShiningBar={false}
                  icon={<FiPlus />}
                  loading={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
