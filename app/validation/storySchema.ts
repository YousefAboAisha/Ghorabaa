import * as Yup from "yup";

export const StoryValidationSchema = Yup.object({
  id_number: Yup.string()
    .required("يرجى إدخال رقم الهوية")
    .matches(/^\d{9}$/, "يجب أن يتكون رقم الهوية من 9 أرقام بالضبط"),

  birth_date: Yup.date()
    .required("يرجى إدخال تاريخ الميلاد")
    .typeError("تاريخ الميلاد غير صالح"),

  death_date: Yup.date()
    .required("يرجى إدخال تاريخ الاستشهاد")
    .typeError("تاريخ الاستشهاد غير صالح")
    .max(new Date(), "لا يمكن أن يكون تاريخ الاستشهاد في المستقبل")
    .test(
      "is-after-birth",
      "يجب أن يكون تاريخ الاستشهاد بعد تاريخ الميلاد",
      function (value) {
        const { birth_date } = this.parent;
        if (!birth_date || !value) return true; // skip check if one is missing
        return new Date(value) > new Date(birth_date);
      }
    ),

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
