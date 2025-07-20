"use client";
import { Field, Form, Formik } from "formik";
import TextArea from "@/components/UI/inputs/textArea";
import * as Yup from "yup";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/UI/inputs/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CommentInterface } from "@/app/interfaces";
import { Session } from "next-auth";
import { toast } from "react-toastify";

type CommentFormProps = {
  session: Session | null;
  id: string;
  refetchData?: () => void;
};

const CommentForm = ({ session, id, refetchData }: CommentFormProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl =
    pathname + (searchParams.toString() ? `?${searchParams}` : "");
  console.log("Current URL:", currentUrl);

  console.log("Session values", session);
  console.log("Search params:", searchParams);

  // Updated initialValues to include image
  const initialValues: Partial<CommentInterface> = {
    author_id: session?.user?.id || "",
    story_id: id,
    text: "",
  };

  // Updated validationSchema to include image validation (optional)
  const validationSchema = Yup.object({
    text: Yup.string().required("يرجى كتابة التعليق للشهيد"),
  });

  return (
    <div>
      {session && session.user ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            if (values.text?.trim() === "") return;
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/comments/create`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...values }),
                  credentials: "include", // 👈 THIS IS CRITICAL
                }
              );

              const data = await response.json();

              if (response.ok) {
                console.log("Comment added:", data);
                resetForm(); // ✅ This clears the form
                toast.success("تمت إضافة تعليق بنجاح!");
                if (refetchData) refetchData();
              } else {
                console.error("Failed to add comment:", data.error);
              }
            } catch (error) {
              console.error("Error submitting comment:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, errors }) => (
            <Form className="relative mt-4">
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevent newline
                    const form = e.currentTarget.closest("form");
                    if (form)
                      form.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                  }
                }}
              >
                <Field
                  name="text"
                  as={TextArea}
                  placeholder="أضف تعليقاً أو ذكرى.."
                  className={`w-full focus:border-secondary bg-white text-md`}
                  aria-invalid={!!errors.text}
                  disabled={isSubmitting}
                />
              </div>

              <Button
                title={"إضافة"}
                type="submit"
                className="bg-secondary text-white text-sm w-8/12 md:w-4/12 lg:w-2/12 mt-2"
                disabled={isSubmitting || values.text?.trim() === ""}
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
            {() => (
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
                  as={TextArea}
                  placeholder="أضف تعليقاً أو ذكرى.."
                  className={`w-full focus:border-secondary bg-white text-md`}
                />

                <Button
                  title={"إضافة"}
                  className="bg-secondary text-white text-sm w-8/12 md:w-4/12 lg:w-2/12 mt-2"
                  hasShiningBar={false}
                  icon={<FiPlus />}
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
