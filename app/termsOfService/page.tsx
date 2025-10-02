import Hero from "@/components/layout/hero";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container min-h-screen mt-24 bg-gray-50">
      <Hero pattern="bg-privacy-pattern" className="bg-top" />

      <div className="mx-auto px-4 py-12 mt-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              شروط الخدمة
            </h1>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                آخر تحديث: ٢ أكتوبر ٢٠٢٥
              </span>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
              <p className="text-lg leading-relaxed text-gray-700 mb-0">
                مرحباً بك في
                <Link
                  className="text-primary font-semibold"
                  href={"https://www.ghorabaa.com"}
                >
                  غُرباء
                </Link>
                . من خلال دخولك أو استخدامك للمنصة، فإنك توافق على شروط الخدمة
                التالية. يرجى قراءتها بعناية.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ١
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    استخدام المنصة
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      توافق على استخدام غُرباء للأغراض المشروعة والمحترمة فقط.
                      لا يجوز لك استخدام المنصة للإساءة، التشهير، أو نشر محتوى
                      غير قانوني أو ضار.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٢
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    مساهمات المستخدمين
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            المسؤولية
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            أنت مسؤول عن المحتوى الذي تقدمه (قصص، صور، تعليقات).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            حقوق الملكية
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            تحتفظ بحقوق ملكيتك لمساهماتك، لكنك تمنح غُرباء
                            ترخيصاً غير حصري وعالمياً لعرضها وأرشفتها.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            حق الإشراف
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            نحتفظ بالحق في مراجعة أو تعديل أو إزالة أي محتوى
                            مخالف للقوانين أو لسياساتنا.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٣
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    الملكية الفكرية
                  </h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      تصميم الموقع، الشعار، والبرمجيات مملوكة لغُرباء. أما
                      المحتوى الذي يقدمه المستخدمون فيبقى ملكاً لهم، لكنه قد
                      يُعرض كجزء من الأرشيف العام.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٤
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    دقة المعلومات
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      غُرباء منصة لمساهمات المستخدمين. رغم الإشراف، لا نضمن
                      الدقة الكاملة للقصص المنشورة. ينبغي التعامل معها كجزء من
                      أرشيف جماعي لا كسجلات تاريخية رسمية.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٥
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    إنهاء الخدمة
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      نحتفظ بالحق في تعليق أو إلغاء أي حساب يخالف شروط الخدمة أو
                      يسيء استخدام المنصة.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٦
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    حدود المسؤولية
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      يتم تقديم غُرباء &quot;كما هو&quot;. لسنا مسؤولين عن أي
                      أضرار تنشأ عن استخدامك للمنصة أو اعتمادك على المحتوى
                      المقدم من المستخدمين.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٧
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    تغييرات على الشروط
                  </h2>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      قد نقوم بتحديث شروط الخدمة في أي وقت. استمرارك في استخدام
                      المنصة بعد التحديث يعني موافقتك على الشروط الجديدة.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٨
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    القانون المعمول به
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      تخضع هذه الشروط للقوانين الرقمية الدولية. ويجب على
                      المستخدمين الامتثال للقوانين المحلية الخاصة بهم.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٩
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    تواصل معنا
                  </h2>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      إذا كانت لديك أي استفسارات حول هذه الشروط، يرجى التواصل
                      معنا عبر{" "}
                      <Link
                        href="mailto:ghorabaa.platform@gmail.com"
                        className="text-green-600 font-medium underline"
                      >
                        ghorabaa.platform@gmail.com
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <p className="text-gray-600 text-sm font-medium">
                باستخدامك منصة{" "}
                <strong className="text-orange-600">غُرباء</strong>، فإنك توافق
                على الالتزام بهذه الشروط والأحكام.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
