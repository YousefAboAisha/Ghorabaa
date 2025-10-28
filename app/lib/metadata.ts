// lib/metadata.ts
import { Metadata } from "next";

const baseUrl = "https://www.ghorabaa.com";
const baseTitle = "غُرباء";
const baseDescription =
  "منصة غُرباء توثق قصص الشهداء الفلسطينيين وتخلد ذكراهم. استكشف مكتبة رقمية غنية بالسير الذاتية، الصور، والإحصائيات حول الشهداء، وشارك قصصهم مع العالم.";
const baseImage = `${baseUrl}/logos/og-image.jpg`;

const baseIcons = {
  icon: `${baseUrl}/logos/logo.svg`,
  apple: `${baseUrl}/logos/logo.svg`,
};

const baseTwitterHandle = "@ghorabaa_gaza";

const sharedOpenGraph = {
  siteName: baseTitle,
  images: [
    {
      url: baseImage,
      width: 1200,
      height: 630,
      alt: "غُرباء - منصة الشهداء",
    },
  ],
  locale: "ar",
  type: "website" as const,
};

const sharedTwitter = {
  card: "summary_large_image",
  images: [baseImage],
  site: baseTwitterHandle,
  creator: baseTwitterHandle,
};

// ===== Home =====
export const HomeMetadata: Metadata = {
  title: "غُرباء | أكبر منصة رقمية لقصص الشهداء الفلسطينيين",
  description: baseDescription,
  keywords: [
    "غُرباء",
    "منصة الشهداء",
    "قصص الشهداء",
    "الشهداء الفلسطينيون",
    "شهداء غزة",
    "تاريخ فلسطين",
    "مكتبة الشهداء",
    "توثيق الشهداء",
  ],
  authors: [{ name: baseTitle, url: baseUrl }],
  metadataBase: new URL(baseUrl),
  alternates: { canonical: baseUrl },
  openGraph: {
    ...sharedOpenGraph,
    title: baseTitle,
    description: baseDescription,
    url: baseUrl,
  },
  twitter: { ...sharedTwitter, title: baseTitle, description: baseDescription },
  icons: baseIcons,
  robots: { index: true, follow: true },
};

// ===== Search =====
export const SearchMetadata: Metadata = {
  title: "البحث عن الشهداء | غُرباء",
  description:
    "ابحث في أكبر قاعدة بيانات رقمية للشهداء الفلسطينيين حسب الاسم أو رقم الهوية.",
  openGraph: {
    ...sharedOpenGraph,
    title: "البحث عن الشهداء | غُرباء",
    description:
      "منصة غُرباء توفر لك إمكانية البحث عن قصص الشهداء الفلسطينيين بكل سهولة.",
    url: `${baseUrl}/search`,
  },
  twitter: {
    ...sharedTwitter,
    title: "البحث عن الشهداء | غُرباء",
    description:
      "ابحث في قصص الشهداء الفلسطينيين بسهولة عبر منصة غُرباء الرقمية.",
  },
  icons: baseIcons,
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/search` },
};

// ===== Stories =====
export const StoriesMetadata: Metadata = {
  title: "قصص الشهداء | غُرباء",
  description:
    "اكتشف قصص شهدائنا الأبرار الذين ضحوا في سبيل الحق والحرية. منصة غُرباء تجمع أرشيفاً رقمياً شاملاً لتوثيق بطولات الشهداء الفلسطينيين.",
  keywords: [
    "شهداء",
    "قصص شهداء",
    "منصة الشهداء",
    "شهداء فلسطين",
    "تاريخ الشهداء",
    "غُرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "قصص الشهداء | غُرباء",
    description:
      "منصة غُرباء تعرض قصص الشهداء الفلسطينيين الأبرار الذين ضحوا في سبيل الحق.",
    url: `${baseUrl}/stories`,
  },
  twitter: {
    ...sharedTwitter,
    title: "قصص الشهداء | غُرباء",
    description:
      "منصة غُرباء تعرض قصص الشهداء الفلسطينيين الأبرار الذين ضحوا في سبيل الحق.",
  },
  icons: baseIcons,
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/stories` },
};

// ===== Massacres =====
export const MassacresMetadata: Metadata = {
  title: "المجازر الصهيونية | سجل جرائم الاحتلال - غُرباء",
  description:
    "توثيق شامل للمجازر الصهيونية بحق الشعب الفلسطيني مع تفاصيل الضحايا والأحداث والتواريخ.",
  keywords: [
    "مجازر صهيونية",
    "جرائم الاحتلال",
    "شهداء فلسطين",
    "توثيق المجازر",
    "غرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غُرباء",
    description:
      "أرشيف كامل لمجازر الاحتلال الصهيوني ضد الفلسطينيين مع صور وتفاصيل الضحايا.",
    url: `${baseUrl}/massacres`,
    images: [
      {
        url: `${baseUrl}/images/massacres-og.jpg`,
        width: 1200,
        height: 630,
        alt: "توثيق المجازر الصهيونية بحق الشعب الفلسطيني",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غُرباء",
    description: "توثيق كامل لمجازر الاحتلال الصهيوني ضد الشعب الفلسطيني.",
    images: [`${baseUrl}/images/massacres-og.jpg`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/massacres` },
};

// ===== Statistics =====
export const StatisticsMetadata: Metadata = {
  title: "الإحصائيات والبيانات | غُرباء",
  description:
    "أحدث الإحصائيات والبيانات الموثقة عن شهداء فلسطين مع تحليلات وتقارير مفصلة.",
  keywords: [
    "إحصائيات الشهداء",
    "بيانات الشهداء الفلسطينيين",
    "تقارير إحصائية",
    "أرقام الشهداء",
    "غرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "الإحصائيات والبيانات | غُرباء",
    description: "بيانات رقمية موثقة وتقارير إحصائية عن شهداء فلسطين.",
    url: `${baseUrl}/statistics`,
    images: [
      {
        url: `${baseUrl}/images/statistics-og.jpg`,
        width: 1200,
        height: 630,
        alt: "إحصائيات وتقارير عن شهداء فلسطين",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "الإحصائيات والبيانات | غُرباء",
    description: "أحدث البيانات الإحصائية الموثقة عن شهداء فلسطين.",
    images: [`${baseUrl}/images/statistics-og.jpg`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/statistics` },
};

// ===== About =====
export const AboutMetadata: Metadata = {
  title: "عن غُرباء | منصة توثيق الشهداء الفلسطينيين",
  description:
    "منصة غُرباء توثق قصص الشهداء الفلسطينيين وتقدم بيانات موثقة عن جرائم الاحتلال.",
  keywords: [
    "منصة غرباء",
    "توثيق الشهداء",
    "قصص الشهداء الفلسطينيين",
    "عن الموقع",
    "رسالة غرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "عن غُرباء | منصة توثيق الشهداء الفلسطينيين",
    description:
      "تعرف على رؤية ورسالة منصة غُرباء في توثيق قصص الشهداء وإحصاءات الجرائم الصهيونية.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/images/about-og.jpg`,
        width: 1200,
        height: 630,
        alt: "عن منصة غرباء لتوثيق الشهداء الفلسطينيين",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "عن غُرباء | منصة توثيق الشهداء الفلسطينيين",
    description: "الرؤية والرسالة وراء منصة غُرباء لتوثيق جرائم الاحتلال.",
    images: [`${baseUrl}/images/about-og.jpg`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/about` },
};

// ===== Events =====
export const EventsMetadata: Metadata = {
  title: "الفعاليات والأحداث | غُرباء",
  description:
    "أحدث الفعاليات والأنشطة التضامنية مع القضية الفلسطينية وتوثيق الأحداث الجارية.",
  keywords: [
    "فعاليات فلسطين",
    "أحداث تضامنية",
    "نشاطات فلسطينية",
    "فعاليات غرباء",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "الفعاليات والأحداث | غُرباء",
    description:
      "تقويم الفعاليات والأنشطة التضامنية مع الشعب الفلسطيني حول العالم.",
    url: `${baseUrl}/events`,
    images: [
      {
        url: `${baseUrl}/images/events-og.jpg`,
        width: 1200,
        height: 630,
        alt: "فعاليات وأنشطة تضامنية مع فلسطين",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "الفعاليات والأحداث | غُرباء",
    description: "أحدث الفعاليات التضامنية والأنشطة الداعمة للقضية الفلسطينية.",
    images: [`${baseUrl}/images/events-og.jpg`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/events` },
};

export const AddMissingFormMetadata: Metadata = {
  title: "منصة غُرباء | إضافة مفقود جديد",
  description:
    "ساهم معنا في توثيق بيانات المفقودين الفلسطينيين عبر منصة غرباء لمساعدة عائلاتهم في البحث عن أحبائهم",
  keywords: [
    "إضافة مفقود",
    "توثيق المفقودين",
    "نموذج إضافة مفقود",
    "سجل المفقودين",
    "منصة غرباء",
    "المفقودين الفلسطينيين",
    "بحث عن مفقودين",
  ],
  openGraph: {
    title: "منصة غُرباء | إضافة مفقود جديد",
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
    index: false, // Recommended for form pages
    follow: true,
  },
  other: {
    privacy: "form-submission", // Indicates this is a form page
    "cache-control": "private, no-store", // Sensitive form handling
    "dc:rights": "جميع الحقوق محفوظة للمساهمين",
  },
};

// Missings metadata
export const MissingsMetadata = {
  title: "منصة غُرباء |  المفقودون الفلسطينيون",
  description:
    "منصة غُرباء توثق بيانات المفقودين الفلسطينيين وتساعد في البحث عنهم. استكشف قاعدة بيانات شاملة للمفقودين وشارك المعلومات لمساعدة عائلاتهم.",
  keywords: [
    "غُرباء",
    "منصة المفقودين",
    "توثيق المفقودين",
    "المفقودين الفلسطينيين",
    "بحث عن مفقودين",
    "قاعدة بيانات المفقودين",
    "مساعدة عائلات المفقودين",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "توثيق المفقودين الفلسطينيين | غُرباء",
    description:
      "منصة غُرباء توفر قاعدة بيانات شاملة للمفقودين الفلسطينيين لمساعدة عائلاتهم في البحث عن أحبائهم.",
    url: `${baseUrl}/missings`,
    images: [
      {
        url: "/missing-banner.png",
        width: 1200,
        height: 630,
        alt: "توثيق المفقودين الفلسطينيين على منصة غُرباء",
      },
    ],
  },
  twitter: {
    ...sharedTwitter,
    title: "توثيق المفقودين الفلسطينيين | غُرباء",
    description:
      "ابحث في قاعدة بيانات المفقودين الفلسطينيين عبر منصة غُرباء وساعد في العثور عليهم.",
    images: ["/images/missings-og.jpg"],
  },
  icons: baseIcons,
};
