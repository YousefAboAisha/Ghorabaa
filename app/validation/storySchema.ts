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
