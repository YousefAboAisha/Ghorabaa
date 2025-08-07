import * as Yup from "yup";

export const SignupvalidationSchema = Yup.object({
  name: Yup.string().required("يرجى إدخال الاسم رباعي"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("يرجى إدخال البريد الإلكتروني"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .required("يرجى إدخال كلمة المرور"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
    .required("يرجى تأكيد كلمة المرور"),
});

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
  rejectDetails: Yup.string().notRequired(),
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

export const ContactFormSchema = Yup.object({
  title: Yup.string().required("يرجى كتابة عنوان الرسالة"),
  details: Yup.string().required("يرجى كتابة تفاصيل الرسالة"),
});

export const MassacresValidationSchema = Yup.object({
  title: Yup.string().required("يرجى إدخال عنوان المجزرة"),

  date: Yup.date()
    .required("يرجى إدخال تاريخ حدوث المجزرة")
    .max(new Date(), "لا يمكن إدخال تاريخ مستقبلي"),

  cover_image: Yup.string().required("يرجى اختيار صورة الغلاف للمجزرة"),

  deaths: Yup.number()
    .required("يرجى إدخال عدد الشهداء")
    .min(1, "يجب أن يكون عدد الشهداء 1 على الأقل")
    .integer("الرقم يجب أن يكون عدداً صحيحاً"),

  injuries: Yup.number()
    .required("يرجى إدخال عدد الإصابات")
    .min(1, "يجب أن يكون عدد الإصابات 1 على الأقل")
    .integer("الرقم يجب أن يكون عدداً صحيحاً"),

  destroyedHouses: Yup.number()
    .required("يرجى إدخال عدد المنازل المدمرة")
    .min(0, "لا يمكن أن يكون سالباً")
    .integer("الرقم يجب أن يكون عدداً صحيحاً"),

  location: Yup.object({
    city: Yup.string().required("يرجى اختيار المدينة"),
    neighborhood: Yup.string().required("يرجى اختيار الحي"),
  }),

  description: Yup.string()
    .required("يرجى إدخال تفاصيل المجزرة")
    .test(
      "word-count-range",
      "يجب أن تحتوي تفاصيل المجزرة على ما بين 200 إلى 1000 كلمة",
      function (value) {
        const wordCount =
          value?.trim().split(/\s+/).filter(Boolean).length || 0;

        if (wordCount < 200) {
          return this.createError({
            message: `يجب ألا يقل عن 200 كلمة`,
          });
        }

        if (wordCount > 1000) {
          return this.createError({
            message: `يجب ألا يزيد عن 1000 كلمة`,
          });
        }

        return true;
      }
    ),

  media: Yup.array()
    .of(Yup.string().url("يجب أن تكون الصورة رابطًا صالحًا"))
    .min(1, "يرجى رفع صورة واحدة على الأقل")
    .max(5, "لا يمكن رفع أكثر من 5 صور"),

  internationalReactions: Yup.array()
    .of(
      Yup.object().shape({
        publisher_name: Yup.string()
          .notRequired()
          .min(2, "اسم الناشر قصير جداً (حد أدنى حرفين)")
          .max(100, "اسم الناشر طويل جداً (حد أقصى 100 حرف)"),
        reaction_text: Yup.string()
          .notRequired()
          .min(10, "رد الفعل قصير جداً (حد أدنى 10 أحرف)")
          .max(500, "رد الفعل طويل جداً (حد أقصى 500 حرف)"),
      })
    )
    .min(1, "يرجى إضافة رد فعل دولي واحد على الأقل")
    .max(10, "لا يمكن إضافة أكثر من 10 ردود فعل"),
});
