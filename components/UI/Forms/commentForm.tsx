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

type CommentFormProps = {
  session: Session | null;
  id: string;
  updateComments?: () => void;
};

const CommentForm = ({ session, id, updateComments }: CommentFormProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl =
    pathname + (searchParams.toString() ? `?${searchParams}` : "");
  console.log("Current URL:", currentUrl);

  console.log("Session values", session);
  console.log("Search params:", searchParams);

  // Updated initialValues to include image
  const initialValues: Partial<CommentInterface> = {
    text: "",
    author_id: session?.user?.id || "",
    story_id: id,
    author_name: session?.user?.name || "",
    author_image: session?.user?.image || "",
    author_role: session?.user.role,
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
            try {
              const response = await fetch("/api/comment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values }),
                credentials: "include", // 👈 THIS IS CRITICAL
              });

              const data = await response.json();

              if (response.ok) {
                console.log("Comment added:", data);
                resetForm(); // ✅ This clears the form
                if (updateComments) updateComments();
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
              {/* Notes Field */}
              <Field
                name="text"
                as={TextArea}
                placeholder="أضف تعليقاً أو ذكرى.."
                className={`w-full focus:border-secondary bg-white text-md`}
                aria-invalid={!!errors.text}
              />

              <Button
                title={"إضافة"}
                type="submit"
                className="bg-secondary text-white text-sm w-8/12 md:w-4/12 lg:w-2/12 mt-2"
                disabled={isSubmitting || values.text == ""}
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
