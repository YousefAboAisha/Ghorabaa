import Hero from "@/components/layout/hero";
import Link from "next/link";

export default function Page() {
  const lastUpdated = "٢ أكتوبر ٢٠٢٥";
  const version = "1.0";

  return (
    <main className="container min-h-screen mt-24 bg-gray-50">
      <Hero pattern="bg-privacy-pattern" className="bg-top" />

      <div className="mx-auto px-4 py-8 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              سياسة الخصوصية
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  آخر تحديث: {lastUpdated}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">الإصدار: {version}</span>
              </div>
            </div>
          </div>

          {/* Version History */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              سجل التحديثات
            </h3>
            <div className="space-y-2 text-sm text-yellow-700">
              <div className="flex justify-between items-center">
                <span>الإصدار 1.0 ({lastUpdated})</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  الأحدث
                </span>
              </div>
              <p className="text-xs">
                الإصدار الأول - نشر سياسة الخصوصية الشاملة
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <p className="text-lg leading-relaxed text-gray-700 mb-0">
                في{" "}
                <Link
                  className="text-primary font-semibold"
                  href={"https://www.ghorabaa.com"}
                >
                  غُرباء
                </Link>
                ، نحن نُقدّر خصوصيتك ونلتزم بحماية البيانات الشخصية التي تشاركها
                معنا. توضح هذه السياسة نوعية المعلومات التي نجمعها، وكيفية
                استخدامها، وحقوقك المتعلقة بها.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Section 1 - Legal Basis */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ١
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    الأساس القانوني لمعالجة البيانات
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "الموافقة",
                        description:
                          "عندما توافق صراحةً على معالجة بياناتك لأغراض محددة",
                      },
                      {
                        title: "الالتزام التعاقدي",
                        description:
                          "عندما تكون المعالجة ضرورية للوفاء بالتزاماتنا تجاهك",
                      },
                      {
                        title: "المصلحة المشروعة",
                        description:
                          "عندما تكون المعالجة ضرورة لتشغيل وتحسين منصتنا",
                      },
                      {
                        title: "الالتزام القانوني",
                        description:
                          "عندما تكون المعالجة مطلوبة بموجب القوانين المعمول بها",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 - Information We Collect */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٢
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    المعلومات التي نجمعها
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        معلومات الحساب
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        مثل الاسم، البريد الإلكتروني، وتفاصيل الملف الشخصي عند
                        التسجيل أو تسجيل الدخول.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        مساهمات المستخدم
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        القصص، الصور، والتعليقات التي تختار مشاركتها.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-purple-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                            clipRule="evenodd"
                          />
                        </svg>
                        البيانات التقنية
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        مثل عنوان IP، نوع المتصفح، وملفات تعريف الارتباط
                        (Cookies) الخاصة بتسجيل الدخول والتحليلات.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 - How We Use Information */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٣
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    كيفية استخدام المعلومات
                  </h2>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      "لتشغيل وصيانة منصة غُرباء",
                      "لنشر القصص، الصور، والتعليقات التي يقدمها المستخدمون",
                      "لضمان الأمان والإشراف على المحتوى والحفاظ على نزاهة المجتمع",
                      "لتحليل الاستخدام وتحسين تجربة المستخدم",
                      "للتواصل معكم بشأن تحديثات الخدمة",
                      "للامتثال للالتزامات القانونية",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
                      >
                        <svg
                          className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 - Information Sharing */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٤
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    مشاركة المعلومات
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      نحن <strong className="text-red-600">لا نبيع</strong> أو
                      نشارك بياناتك الشخصية مع المعلنين أو لأغراض تسويقية. قد
                      تُعرض مساهماتك (القصص، الصور، التعليقات) بشكل علني كجزء من
                      الأرشيف الرقمي. وقد تتم مشاركة بعض البيانات مع مزوّدي
                      خدمات موثوقين (الاستضافة، التحليلات، الحماية).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 - Data Retention */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٥
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    فترة الاحتفاظ بالبيانات
                  </h2>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      نحتفظ ببياناتك الشخصية فقط طالما كانت ضرورية للأغراض
                      المذكورة في هذه السياسة. يمكنك طلب حذف بياناتك في أي وقت،
                      مع العلم أن بعض البيانات قد نحتفظ بها للامتثال للالتزامات
                      القانونية أو حل النزاعات أو حماية حقوقنا القانونية.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 - User Rights */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٦
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    حقوقك
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "الحق في الوصول إلى بياناتك الشخصية",
                      "الحق في تصحيح البيانات غير الدقيقة",
                      "الحق في طلب حذف بياناتك (حق النسيان)",
                      "الحق في سحب الموافقة في أي وقت",
                      "الحق في الاعتراض على معالجة البيانات",
                      "الحق في نقل البيانات",
                      "الحق في تقييد المعالجة",
                      "الحق في تقديم شكوى للسلطة الرقابية",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
                      >
                        <svg
                          className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 - Cookies */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٧
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    ملفات تعريف الارتباط والتتبع
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        أنواع الكوكيز المستخدمة
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {[
                          {
                            type: "الكوكيز الأساسية",
                            purpose: "ضرورية لتشغيل الموقع ووظائفه الأساسية",
                          },
                          {
                            type: "كوكيز الوظائف",
                            purpose: "تذكر تفضيلاتك وإعداداتك",
                          },
                          {
                            type: "كوكيز التحليلات",
                            purpose: "مساعدتنا في فهم كيفية استخدامك للموقع",
                          },
                          {
                            type: "كوكيز الطرف الثالث",
                            purpose: "مقدمة من خدمات خارجية مثل تحليلات جوجل",
                          },
                        ].map((cookie, index) => (
                          <div
                            key={index}
                            className="bg-white p-6 rounded-lg border"
                          >
                            <h4 className="font-semibold text-indigo-600 text-sm">
                              {cookie.type}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1">
                              {cookie.purpose}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-4">
                        يمكنك إدارة تفضيلات الكوكيز من خلال إعدادات المتصفح أو
                        من خلال أداة إدارة الموافقة على موقعنا.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 - Data Security */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٨
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    أمان البيانات
                  </h2>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      نستخدم إجراءات أمنية تقنية وإدارية معقولة لحماية بياناتك
                      الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف.
                      وهذا يشمل التشفير، جدران الحماية، ومراجعات الأمان
                      المنتظمة. ومع ذلك، لا يمكن ضمان أمان الإنترنت بنسبة 100%.
                    </p>
                    <div className="mt-4 grid md:grid-cols-3 gap-3 text-center">
                      {[
                        { icon: "🔒", text: "تشفير البيانات" },
                        { icon: "🛡️", text: "جدران الحماية" },
                        { icon: "📊", text: "مراجعات أمنية" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-8 rounded-lg border"
                        >
                          <div className="text-2xl mb-1">{item.icon}</div>
                          <div className="text-xs text-cyan-700 font-medium">
                            {item.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9 - International Transfers */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ٩
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    التحويلات الدولية
                  </h2>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      قد يتم نقل بياناتك ومعالجتها في دول خارج منطقتك. نضمن أن
                      هذه التحويلات تتم وفقًا لمعايير الحماية المناسبة وبموجب
                      الاتفاقيات القانونية المناسبة مثل العقود النموذجية
                      للمفوضية الأوروبية.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10 - Contact Information */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ١٠
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    الاتصال بنا
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      لطرح أي أسئلة حول سياسة الخصوصية هذه أو لممارسة حقوقك في
                      الخصوصية، يرجى الاتصال بنا على:
                    </p>
                    <Link
                      title="ghorabaa.platform@gmail.com"
                      href="mailto:ghorabaa.platform@gmail.com"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      ghorabaa.platform@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 11 - Policy Updates */}
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ١١
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    تحديثات السياسة
                  </h2>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات
                      جوهرية عن طريق نشر الإشعار على المنصة أو إرسال بريد
                      إلكتروني. ننصحك بمراجعة هذه السياسة بشكل دوري. سيتم
                      الإشارة إلى تاريخ التحديث في أعلى هذه الصفحة.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              نشكرك لثقتك في{" "}
              <Link
                className="text-primary font-semibold"
                href={"https://www.ghorabaa.com"}
              >
                غُرباء
              </Link>
              . نحن ملتزمون بحماية خصوصيتك وتقديم تجربة آمنة لك.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-xs text-gray-400">
              <span>
                © {new Date().getFullYear()} غُرباء. جميع الحقوق محفوظة.
              </span>
              <span>|</span>
              <Link href="/termsOfService" className="hover:text-gray-600">
                شروط الخدمة
              </Link>
              <span>|</span>
              <Link href="/cookiePolicy" className="hover:text-gray-600">
                سياسة الكوكيز
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
