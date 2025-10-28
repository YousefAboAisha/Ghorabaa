// lib/metadata.ts

import { Metadata } from "next";

const baseUrl = "https://www.ghorabaa.com";
const baseTitle = "غُرباء - منصة توثيق الشهداء والمفقودين الفلسطينيين";
const baseDescription =
  "منصة غُرباء توثق قصص الشهداء والمفقودين الفلسطينيين وتخلد ذكراهم. استكشف مكتبة رقمية شاملة بالسير الذاتية، الصور، الإحصائيات والمجازر. شارك قصصهم مع العالم وحافظ على الذاكرة الفلسطينية.";
const baseImage = `/logos/og-image.jpg`;
const baseIcons = {
  icon: "/logos/logo.svg",
  apple: "/logos/logo.svg",
  shortcut: "/logos/logo.svg",
};

const baseTwitterHandle = "@ghorabaa";
const baseKeywords = [
  "غُرباء",
  "منصة الشهداء",
  "قصص الشهداء",
  "الشهداء الفلسطينيون",
  "شهداء غزة",
  "شهداء فلسطين",
  "تاريخ فلسطين",
  "مكتبة الشهداء",
  "توثيق الشهداء",
  "المفقودين الفلسطينيين",
  "جرائم الاحتلال",
  "المقاومة الفلسطينية",
  "فلسطين",
  "غزة",
  "القدس",
  "الأقصى",
];

const sharedOpenGraph = {
  siteName: "غُرباء",
  images: [
    {
      url: baseImage,
      width: 1200,
      height: 630,
      alt: "غُرباء - منصة توثيق الشهداء والمفقودين الفلسطينيين",
    },
  ],
  locale: "ar_SA",
  type: "website" as const,
  countryName: "Palestine",
};

const sharedTwitter = {
  card: "summary_large_image",
  images: [baseImage],
  site: baseTwitterHandle,
  creator: baseTwitterHandle,
  title: baseTitle,
  description: baseDescription,
};

// [ Home metadata ]
export const HomeMetadata: Metadata = {
  title: {
    default: `${baseTitle} | أكبر منصة رقمية لقصص الشهداء والمفقودين الفلسطينيين`,
    template: "%s | غُرباء",
  },
  description: baseDescription,
  keywords: baseKeywords,
  authors: [{ name: "منصة غُرباء", url: baseUrl }],
  creator: "منصة غُرباء",
  publisher: "منصة غُرباء",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
    languages: {
      ar: baseUrl,
    },
  },
  openGraph: {
    ...sharedOpenGraph,
    title: baseTitle,
    description: baseDescription,
    url: baseUrl,
  },
  twitter: {
    ...sharedTwitter,
  },
  icons: baseIcons,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'verification-code',
    // yandex: 'verification-code',
    // yahoo: 'verification-code',
  },
  category: "التوثيق التاريخي",
  classification: "منصة توثيق الشهداء والمفقودين الفلسطينيين",
  other: {
    "dc:language": "ar",
    "dc:creator": "منصة غُرباء",
    "dc:publisher": "منصة غُرباء",
    "dc:type": "InteractiveResource",
    "dc:format": "text/html",
    "dc:subject":
      "توثيق الشهداء الفلسطينيين, قصص الشهداء, المفقودين الفلسطينيين",
  },
};

// [ Search metadata ]
export const SearchMetadata: Metadata = {
  title: "البحث عن الشهداء والمفقودين | غُرباء - محرك البحث المتقدم",
  description:
    "ابحث في أكبر قاعدة بيانات رقمية للشهداء والمفقودين الفلسطينيين حسب الاسم، رقم الهوية، المنطقة، أو التاريخ. أدوات بحث متقدمة ودقيقة.",
  keywords: [
    ...baseKeywords,
    "بحث عن الشهداء",
    "بحث عن المفقودين",
    "محرك بحث الشهداء",
    "قاعدة بيانات الشهداء",
    "البحث المتقدم",
    "رقم الهوية الفلسطينية",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "البحث عن الشهداء والمفقودين | غُرباء",
    description:
      "محرك بحث متقدم للعثور على قصص الشهداء والمفقودين الفلسطينيين في أكبر قاعدة بيانات رقمية.",
    url: `${baseUrl}/search`,
  },
  twitter: {
    ...sharedTwitter,
    title: "البحث عن الشهداء والمفقودين | غُرباء",
    description:
      "محرك بحث متقدم في قاعدة بيانات الشهداء والمفقودين الفلسطينيين",
  },
  icons: baseIcons,
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// [ Stories metadata ]
export const StoriesMetadata: Metadata = {
  title: {
    default: "قصص الشهداء | شهداؤنا الأبرار - غُرباء",
    template: "%s | قصة شهيد - غُرباء",
  },
  description:
    "اكتشف قصص شهدائنا الأبرار الذين ضحوا في سبيل الحق والحرية. منصة غُرباء تجمع أرشيفاً رقمياً شاملاً لسير الشهداء الفلسطينيين، بطولاتهم، وتفاصيل استشهادهم.",
  keywords: [
    ...baseKeywords,
    "قصص الشهداء",
    "سير الشهداء",
    "بطولات الشهداء",
    "استشهاد",
    "شهداؤنا الأبرار",
    "توثيق الاستشهاد",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "قصص الشهداء | شهداؤنا الأبرار - غُرباء",
    description:
      "أرشيف رقمي شامل لقصص وسير الشهداء الفلسطينيين الأبرار الذين ضحوا في سبيل الحق والحرية.",
    url: `${baseUrl}/stories`,
  },
  twitter: {
    ...sharedTwitter,
    title: "قصص الشهداء | شهداؤنا الأبرار - غُرباء",
    description: "أرشيف شامل لقصص الشهداء الفلسطينيين على منصة غُرباء",
  },
  icons: baseIcons,
  alternates: {
    canonical: "/stories",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// [ Massacres metadata - Enhanced ]
export const MassacresMetadata: Metadata = {
  title: "المجازر الصهيونية | سجل جرائم الاحتلال ضد الشعب الفلسطيني - غرباء",
  description:
    "توثيق شامل للمجازر الصهيونية بحق الشعب الفلسطيني منذ النكبة حتى اليوم. أرشيف كامل مع تفاصيل الضحايا، التواريخ، الصور، والشهادات الحية.",
  keywords: [
    ...baseKeywords,
    "مجازر صهيونية",
    "جرائم الاحتلال",
    "توثيق المجازر",
    "جرائم الحرب",
    "النكبة",
    "مجزرة",
    "جرائم ضد الإنسانية",
    "المحرقة الفلسطينية",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description:
      "أرشيف كامل للمجازر الصهيونية ضد الشعب الفلسطيني مع صور، توثيق، وتفاصيل الضحايا منذ النكبة.",
    url: `${baseUrl}/massacres`,
    images: [
      {
        url: "/images/massacres-og.jpg",
        width: 1200,
        height: 630,
        alt: "توثيق المجازر الصهيونية بحق الشعب الفلسطيني - غرباء",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description: "توثيق كامل للمجازر الصهيونية ضد الشعب الفلسطيني عبر التاريخ",
    images: ["/images/massacres-og.jpg"],
  },
  alternates: {
    canonical: "/massacres",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "dc:language": "ar",
    "dc:title": "المجازر الصهيونية ضد الفلسطينيين",
    "dc:description": "توثيق تاريخي شامل للمجازر الصهيونية بحق الشعب الفلسطيني",
    "dc:subject": "جرائم الحرب, المجازر الصهيونية, توثيق التاريخ الفلسطيني",
    "dc:date": "1948-2024",
  },
};

// [ Statistics metadata - Enhanced ]
export const StatisticsMetadata: Metadata = {
  title:
    "إحصائيات الشهداء | بيانات وأرقام موثقة عن الشهداء الفلسطينيين - غرباء",
  description:
    "أحدث الإحصائيات والبيانات الموثقة عن شهداء فلسطين مع تحليلات مفصلة، رسوم بيانية، وتقارير رقمية. تتبع تطور أعداد الشهداء حسب المناطق والفترات الزمنية.",
  keywords: [
    ...baseKeywords,
    "إحصائيات الشهداء",
    "بيانات الشهداء",
    "تقارير إحصائية",
    "أرقام الشهداء",
    "توثيق إحصائي",
    "تحليلات إحصائية",
    "رسوم بيانية",
    "تقرير شهري",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "إحصائيات الشهداء | بيانات وأرقام موثقة - غرباء",
    description: "بيانات رقمية موثقة وتقارير إحصائية شاملة عن شهداء فلسطين",
    url: `${baseUrl}/statistics`,
    images: [
      {
        url: "/images/statistics-og.jpg",
        width: 1200,
        height: 630,
        alt: "إحصائيات وتقارير عن شهداء فلسطين - غرباء",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "إحصائيات الشهداء | بيانات وأرقام موثقة - غرباء",
    description:
      "أحدث البيانات الإحصائية الموثقة عن شهداء فلسطين مع تحليلات مفصلة",
    images: ["/images/statistics-og.jpg"],
  },
  alternates: {
    canonical: "/statistics",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:format": "dataset",
    "dc:publisher": "غرباء",
    "dc:date": new Date().toISOString(),
    "dc:type": "Dataset",
  },
};

// [ About metadata - Enhanced ]
export const AboutMetadata: Metadata = {
  title:
    "عن غرباء | منصة توثيق الشهداء والمفقودين الفلسطينيين - الرؤية والرسالة",
  description:
    "تعرف على منصة غرباء، رؤيتنا ورسالتنا في توثيق قصص الشهداء والمفقودين الفلسطينيين. من نحن، أهدافنا، وقيمنا في الحفاظ على الذاكرة الفلسطينية.",
  keywords: [
    ...baseKeywords,
    "عن غرباء",
    "منصة غرباء",
    "رؤية غرباء",
    "رسالة المنصة",
    "عن الموقع",
    "فريق غرباء",
    "أهداف المنصة",
    "قيم غرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "عن غرباء | منصة توثيق الشهداء والمفقودين الفلسطينيين",
    description:
      "تعرف على رؤية ورسالة منصة غرباء في توثيق قصص الشهداء والمفقودين وإحصاءات الجرائم الصهيونية",
    url: `${baseUrl}/about`,
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "عن منصة غرباء لتوثيق الشهداء والمفقودين الفلسطينيين",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "عن غرباء | منصة توثيق الشهداء والمفقودين",
    description: "الرؤية والرسالة وراء منصة غرباء لتوثيق جرائم الاحتلال",
    images: ["/images/about-og.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:publisher": "منصة غرباء",
    "dc:type": "InteractiveResource",
    "og:video": "/videos/platform-overview.mp4",
  },
};

// [ Events metadata - Enhanced ]
export const EventsMetadata: Metadata = {
  title: "فعاليات فلسطين | أحداث وأنشطة تضامنية مع القضية الفلسطينية - غرباء",
  description:
    "أحدث الفعاليات والأنشطة التضامنية مع القضية الفلسطينية حول العالم. تقويم الأحداث، المسيرات، المؤتمرات، والنشاطات الداعمة لفلسطين.",
  keywords: [
    ...baseKeywords,
    "فعاليات فلسطين",
    "أحداث تضامنية",
    "أنشطة دعم فلسطين",
    "تقويم الأحداث",
    "فعاليات غرباء",
    "نشاطات فلسطينية",
    "مسيرات تضامنية",
    "مؤتمرات فلسطين",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "فعاليات فلسطين | أحداث وأنشطة تضامنية - غرباء",
    description:
      "تقويم شامل للفعاليات والأنشطة التضامنية مع الشعب الفلسطيني حول العالم",
    url: `${baseUrl}/events`,
    images: [
      {
        url: "/images/events-og.jpg",
        width: 1200,
        height: 630,
        alt: "فعاليات وأنشطة تضامنية مع فلسطين - غرباء",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "فعاليات فلسطين | أحداث وأنشطة تضامنية",
    description: "أحدث الفعاليات التضامنية والأنشطة الداعمة للقضية الفلسطينية",
    images: ["/images/events-og.jpg"],
  },
  alternates: {
    canonical: "/events",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:title": "فعاليات دعم فلسطين",
    "dc:creator": "غرباء",
    "event:type": "PoliticalActivity",
  },
};

// [ Missings metadata - Enhanced ]
export const MissingsMetadata: Metadata = {
  title: "المفقودون الفلسطينيون | بحث وتوثيق المفقودين في فلسطين - غرباء",
  description:
    "منصة غُرباء توثق بيانات المفقودين الفلسطينيين وتساعد في البحث عنهم. قاعدة بيانات شاملة مع صور، تفاصيل، وآخر مكان شوهد فيه المفقود. ساعد العائلات في العثور على أحبائهم.",
  keywords: [
    ...baseKeywords,
    "المفقودين الفلسطينيين",
    "بحث عن مفقودين",
    "توثيق المفقودين",
    "مفقودين غزة",
    "عائلات المفقودين",
    "مساعدة المفقودين",
    "العبث بالمفقودين",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "المفقودون الفلسطينيون | بحث وتوثيق المفقودين - غرباء",
    description:
      "قاعدة بيانات شاملة للمفقودين الفلسطينيين لمساعدة عائلاتهم في البحث عن أحبائهم مع صور وتفاصيل كاملة.",
    url: `${baseUrl}/missings`,
    images: [
      {
        url: "/images/missings-og.jpg",
        width: 1200,
        height: 630,
        alt: "توثيق المفقودين الفلسطينيين على منصة غُرباء",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "المفقودون الفلسطينيون | بحث وتوثيق المفقودين - غرباء",
    description:
      "ابحث في قاعدة بيانات المفقودين الفلسطينيين وساعد في العثور عليهم",
    images: ["/images/missings-og.jpg"],
  },
  icons: baseIcons,
  alternates: {
    canonical: "/missings",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// [ Authentication pages - Keep as is with noindex ]
export const SigninMetadata: Metadata = {
  title: "تسجيل الدخول - موقع غرباء",
  description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
  keywords: ["تسجيل دخول", "حساب غرباء", "دخول الأعضاء", "موقع غرباء"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "تسجيل الدخول - موقع غرباء",
    description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
    url: `${baseUrl}/signin`,
    type: "website",
  },
};

export const SignupMetadata: Metadata = {
  title: "إنشاء حساب جديد - موقع غرباء",
  description:
    "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري والمساهمة في التوثيق",
  keywords: [
    "تسجيل جديد",
    "إنشاء حساب",
    "تسجيل عضو جديد",
    "موقع غرباء",
    "انضم إلينا",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "إنشاء حساب جديد - موقع غرباء",
    description:
      "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري",
    url: `${baseUrl}/signup`,
    type: "website",
    images: [
      {
        url: "/logos/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "إنشاء حساب في موقع غرباء",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إنشاء حساب جديد - موقع غرباء",
    description: "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي",
    images: ["/logos/og-image.jpg"],
  },
  alternates: {
    canonical: `${baseUrl}/signup`,
  },
};

// [ Form pages - Keep as is with noindex ]
export const AddStoryMetadata: Metadata = {
  title: "إضافة قصة شهيد جديد | توثيق قصص الشهداء - غرباء",
  description:
    "ساهم معنا في توثيق قصة شهيد فلسطيني عبر منصة غرباء لضمان بقاء الذكرى خالدة. نموذج آمن وسهل الاستخدام لإضافة قصص الشهداء.",
  keywords: [
    ...baseKeywords,
    "إضافة قصة شهيد",
    "توثيق الشهداء",
    "نموذج إضافة قصة",
    "سجل الشهداء",
    "منصة غرباء",
    "قصص الشهداء الفلسطينيين",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "إضافة قصة شهيد جديد | منصة غرباء",
    description:
      "ساهم في توثيق تاريخ الشهداء الفلسطينيين عبر إضافة قصصهم على منصة غرباء",
    url: `${baseUrl}/addStory`,
    images: [
      {
        url: "/images/add-story-og.jpg",
        width: 1200,
        height: 630,
        alt: "نموذج إضافة قصة شهيد على منصة غرباء",
      },
    ],
  },
  alternates: {
    canonical: "/addStory",
  },
  robots: {
    index: false,
    follow: true,
  },
  other: {
    privacy: "form-submission",
    "cache-control": "private, no-store",
    "dc:rights": "جميع الحقوق محفوظة للمساهمين",
  },
};

export const AddMissingFormMetadata: Metadata = {
  title: "إضافة مفقود جديد | توثيق المفقودين الفلسطينيين - غرباء",
  description:
    "ساهم معنا في توثيق بيانات المفقودين الفلسطينيين عبر منصة غرباء لمساعدة عائلاتهم في البحث عن أحبائهم. نموذج شامل ومفصل لإضافة بيانات المفقودين.",
  keywords: [
    ...baseKeywords,
    "إضافة مفقود",
    "توثيق المفقودين",
    "نموذج إضافة مفقود",
    "سجل المفقودين",
    "منصة غرباء",
    "المفقودين الفلسطينيين",
    "بحث عن مفقودين",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "إضافة مفقود جديد | توثيق المفقودين - غرباء",
    description:
      "ساهم في توثيق بيانات المفقودين الفلسطينيين عبر إضافة معلوماتهم على منصة غرباء لمساعدة عائلاتهم",
    url: `${baseUrl}/addMissing`,
    images: [
      {
        url: "/images/add-missing-og.jpg",
        width: 1200,
        height: 630,
        alt: "نموذج إضافة مفقود على منصة غرباء",
      },
    ],
  },
  alternates: {
    canonical: "/addMissing",
  },
  robots: {
    index: false,
    follow: true,
  },
  other: {
    privacy: "form-submission",
    "cache-control": "private, no-store",
    "dc:rights": "جميع الحقوق محفوظة للمساهمين",
  },
};
