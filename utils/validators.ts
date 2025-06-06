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
  social_media: Yup.object({
    facebook: Yup.string()
      .nullable()
      .notRequired()
      .url("يرجى إدخال رابط فيسبوك صحيح")
      .test(
        "is-facebook-url",
        "يجب أن يكون الرابط من فيسبوك",
        (value) => !value || value.includes("facebook.com")
      ),
    instagram: Yup.string()
      .nullable()
      .notRequired()
      .url("يرجى إدخال رابط انستغرام صحيح")
      .test(
        "is-instagram-url",
        "يجب أن يكون الرابط من انستغرام",
        (value) => !value || value.includes("instagram.com")
      ),
    x: Yup.string()
      .nullable()
      .notRequired()
      .url("يرجى إدخال رابط إكس صحيح")
      .test(
        "is-x-url",
        "يجب أن يكون الرابط من X (تويتر سابقًا)",
        (value) =>
          !value || value.includes("x.com") || value.includes("twitter.com") // some users might paste old Twitter links
      ),
  }),
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

export const StoryPreviewValidationSchema = Yup.object({
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
});

export const StoryRejectValidationSchema = Yup.object({
  rejectReason: Yup.string()
    .required("يُرجى إدخال سبب الرفض")
    .test(
      "min-words",
      "يجب أن تحتوي السيرة الذاتية على 5 كلمات على الأقل",
      function (value) {
        const wordCount =
          value?.trim().split(/\s+/).filter(Boolean).length || 0;
        return wordCount >= 5;
      }
    ),
});

export const ReportValidationSchema = Yup.object({
  rejectReason: Yup.string()
    .required("يرجى اختيار سبب الإبلاغ")
    .oneOf(
      [
        "DISRESPECT",
        "HATE_SPEECH",
        "MISINFORMATION",
        "VIOLENCE",
        "HARASSMENT",
        "POLITICAL_PROVOCATION",
        "IMPERSONATION",
        "PRIVACY_VIOLATION",
        "SPAM",
        "OTHER",
      ],
      "يرجى اختيار سبب الإبلاغ من القائمة"
    ),
  rejectDetails: Yup.string()
    .required("يُرجى إدخال سبب الرفض")
    .test(
      "min-words",
      "يجب أن تحتوي السيرة الذاتية على 5 كلمات على الأقل",
      function (value) {
        const wordCount =
          value?.trim().split(/\s+/).filter(Boolean).length || 0;
        return wordCount >= 5;
      }
    ),
});

export const EditUserValidationSchema = Yup.object({
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

  role: Yup.string().required("يرجى اختيار درجة الوصول للمستخدم"),
});
