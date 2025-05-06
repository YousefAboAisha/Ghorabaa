"use client";
import Image from "next/image";
import React from "react";
import image from "@/public/hasabo.jpg";
import MartyrComment from "@/containers/martyrDetails/martyrComment";
import { Field, Form, Formik } from "formik";
import TextArea from "@/components/UI/inputs/textArea";
import * as Yup from "yup";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/UI/inputs/button";
import ShareModal from "@/containers/events/shareModal";
import PageTitles from "@/components/UI/typography/pageTitles";

const MartyrPage = () => {
  // Updated initialValues to include image
  const initialValues = {
    comment: "",
  };

  // Updated validationSchema to include image validation (optional)
  const validationSchema = Yup.object({
    comment: Yup.string().required("يرجى كتابة التعليق للشهيد"),
  });

  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <PageTitles
          first_title="شهداؤنا"
          second_title={{
            title: "محمد عبد الله حسب الله",
            href: "X",
          }}
        />

        <div className="relative flex flex-col justify-center items-start w-full min-h-[80vh] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000000d8] bg-fixed rounded-xl before:rounded-xl">
          <Image
            src={image}
            alt="Martyr"
            width={350}
            height={350}
            className="mx-auto rounded-2xl shadow-xl z-[10]"
            priority
            quality={100}
          />
        </div>

        <div className="relative mt-1">
          <div className="flex flex- justify-between text-[11px]">
            <div className="flex items-center gap-2 text-gray_dark">
              <p>بواسطة: </p>
              <p>يوسف رشاد أبو عيشة</p>
              <p> | </p>
              <p>16 فبراير 2026</p>
            </div>

            <div className="flex items-center gap-2 text-gray_dark">
              <p>المشاهدات: </p>
              <p>232</p>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-6">
            <h4 className="text-lg font-extrabold">
              الشهيد | محمد عبد الله حسب الله
            </h4>
            <ShareModal
              title="مشاركة صفحة الشهيد"
              sharedLink="http://localhost:3000/martyrs/1"
            />
          </div>

          <table className="min-w-full bg-white border border-gray-200 mt-6">
            <thead>
              <tr className="bg-secondary text-white ">
                <td className="py-3 px-4 border-b text-right text-sm">
                  الولادة
                </td>
                <td className="py-3 px-4 border-b text-right text-sm">
                  الاستشهاد
                </td>
                <td className="py-3 px-4 border-b text-right text-sm">العمر</td>
                <td className="py-3 px-4 border-b text-right text-sm">السكن</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-3 px-4 border-b text-right text-sm">
                  25 يناير 2002
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  8 ديسمبر 2023
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  21 عاماً
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  <div className="flex items-center gap-1">
                    <p>غزة</p>
                    -
                    <p>تل الهوا</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <div className="flex flex-col gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <p className="font-semibold">تاريخ الولادة: </p>
              <p></p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold">تاريخ الاستشهاد: </p>
              <p></p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold"> المنطقة: </p>
              
            </div>
          </div> */}

          <div className="mt-8">
            <h2 className="font-bold text-lg">نبذة عن الشهيد </h2>
            <p className="text-gray-600 text-md mt-2">
              الشّهيد الصّديق وحبيب القلب المُهندس محمد عبد الله حسب الله، كان
              سَمِحاً، باسماً، عاليَ الخُلق والهِمّة، مُلتزماً ومحبوباً من
              الجميع، متفوقاً في دراسته في كافة مراحله الدراسية، حيث كان من
              أوائل كلية الهندسة في جامعة الأزهر، أمضينا سنين الجامعة في غرفته
              الصغيرة التي كانت في الطابق الأرضي من بيتهم الجميل للغاية، والذي
              كان محمد يعتني بنباتاته وأشجاره عناية فائقة، وكأنهم أبناؤه، فكان
              البيت أشبه بالقصر! وللأسف كما هو الحال مع الكثير منّا، تم استهدافه
              من قبل قوات الاحتلال الصهيونية دون أي سبب، وتدميره بالكامل! كان
              مُثقفاً، حالماً، وطموحاً، يقول لنا دائماً:بديش تضيع عليا مرتبة
              الشرف! عشان أول ما أتخرج أصير معيد مباشرة، وأكمل ماجستير ودكتوراه
              وأصير دكتور جامعي، وبجانب تفوقه فقد كان محمد صاحبَ قضية ومبدأ، فلا
              زلت أذكر يوم عملية الشهيد البطل خيRي علقم البطولية، عندما جاء
              بالسيارة مسرعاً إلى بيوتنا، وقال لنا:اليوم عيد، لازم نتحلّى،
              وبالفعل كان يوم عيد ذاك اليوم! اليوم الأول من الهدنة، كانت تلك آخر
              مرة تحدّثتُ معه فيها، ولا زلت أذكر المحادثة عندما قال لي:وينك يا
              زلمة صرلي شهر برن عليك، حتى وصّيت الشباب يعملولك برواز وصورة
              ويكتبولك الشهيد البطل! بعدين شو بتسووا لليوم في غزة اطلعوا وتعالوا
              عنا، فش إشي في الجنوب. أذكر أن المكالمة قد طالت وقتها بشكل غير
              مألوف، لأنّ مكالماتنا خصوصاً بين الأصحاب المقربين تكون قصيرة، لم
              أدرِ وقتها أنها ستكون المكالمة الأخيرة، المرة الأخيرة التي سأسمع
              فيها صوته! جاءني نبأ استشهاده بعد خروجي مباشرة من الاعتقال
              والتعذيب الشديد من قبل الوحوش البشرية الصهاينة، لم أستوعب الخبر
              حينها؛ لأنني كنت تائهاً مشتتاً، وفكري وعقلي ما يزالان عالقَين في
              عذابات ووحشية المعتقل الذي كنت فيه، فكلّ ما فعلته أو بالأحرى ما
              كنت قادراً على فعله هو الصمت ومن ثم بدأت الدموع تنهمر كالسّيل، فلم
              أجدْ وِصَالاً لروحِه غيرَ أدمُعِي. استُشهد محمد، ودُفن على عُجالة
              قرب مكان نزوحه في مدينة خانيونس، لم يودّعه أحدٌ من أصدقائه، بل
              وأنّ نسبةً كبيرة منهم علِموا نبأ استشهاده بعد فترة طويلة؛ بسبب شدة
              ووطأة الحرب وانقطاع الاتصالات تماماً في ذلك الوقت. في رعاية الله
              وحفظه يا صديقي، أنتم السابقون ونحن اللاحقون بإذن الله، رحمكَ اللهُ
              يا حبيب، والمجد لك يا شهيد، سيظلّ ذكرُك الطيّبُ والحسنُ حاضراً
              فينا إلى أن نلقى الله، ما تنسوا محمد أبداً ❤️
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-10 mt-8">
        <h2 className="font-bold text-lg">التعليقات</h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <MartyrComment />
          <MartyrComment />
          <MartyrComment />
          <MartyrComment />
        </div>
        <div className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto cursor-pointer">
          <p>عرض المزيد</p>
        </div>
      </div>
    </div>
  );
};

export default MartyrPage;
