import * as Yup from "yup";

export const StoryValidationSchema = Yup.object({
  city: Yup.string().required("يرجى اختيار المدينة"),

  neighborhood: Yup.string().required("يرجى اختيار الحي"),

  bio: Yup.string()
    .required("يرجى إدخال السيرة الذاتية")
    .test(
      "min-words",
      "يجب أن تحتوي السيرة الذاتية على 200 كلمة على الأقل",
      function (value) {
        const wordCount =
          value?.trim().split(/\s+/).filter(Boolean).length || 0;
        return wordCount >= 200;
      }
    ),

  image: Yup.mixed().required("يرجى إضافة صورة"),
});

export const ProfileValidationSchema = Yup.object({
  name: Yup.string().required("يرجى كتابة الاسم"),

  phone_number: Yup.string()
    .matches(
      /^(059|056)\d{7}$/,
      "رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 059 أو 056"
    )
    .required("يُرجى إضافة رقم الهاتف"),

  id_number: Yup.string()
    .matches(/^\d{9}$/, "رقم الهوية يجب أن يتكون من 9 أرقام")
    .required("يُرجى إضافة رقم الهوية"),
});
