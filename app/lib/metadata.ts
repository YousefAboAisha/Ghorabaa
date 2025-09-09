// lib/metadata.ts

import { Metadata } from "next";

const baseUrl = "https://ghorabaa.com";
const baseTitle = "غُرباء";
const baseDescription =
  "منصة غُرباء توثق قصص الشهداء الفلسطينيين وتخلد ذكراهم. استكشف مكتبة رقمية غنية بالسير الذاتية، الصور، والإحصائيات حول الشهداء، وشارك قصصهم مع العالم.";
const baseImage = `${baseUrl}/og-banner.png`;
const baseIcons = {
  icon: "/logo.png",
  apple: "/logo.png",
};

const baseTwitterHandle = "@ghorabaa"; // update if needed

const sharedOpenGraph = {
  siteName: "غُرباء",
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

// [ Home metadata ]
export const HomeMetadata = {
  title: {
    default: `${baseTitle} | أكبر منصة رقمية لقصص الشهداء الفلسطينيين`,
    template: "%s | غُرباء",
  },
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
  authors: [{ name: "منصة غُرباء", url: baseUrl }],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    ...sharedOpenGraph,
    title: baseTitle,
    description: baseDescription,
    url: baseUrl,
  },
  twitter: {
    ...sharedTwitter,
    title: baseTitle,
    description: baseDescription,
  },
  icons: baseIcons,
};

// [ Search metadata ]
export const SearchMetadata = {
  title: {
    default: `${baseTitle} |  البحث عن الشهداء`,
  },
  description:
    "ابحث في أكبر قاعدة بيانات رقمية للشهداء الفلسطينيين حسب الاسم، أو رقم الهوية.",
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
};

// [ Stories metadata ]
export const StoriesMetadata = {
  title: {
    default: `${baseTitle} | قصص الشهداء`,
    template: "%s | شهداؤنا",
  },
  description:
    "اكتشف قصص شهدائنا الأبرار الذين ضحوا في سبيل الحق والحرية. منصة غُرباء تجمع أرشيفاً رقمياً شاملاً لتوثيق بطولات الشهداء الفلسطينيين.",
  keywords: [
    "شهداء",
    "قصص شهداء",
    "منصة الشهداء",
    "شهداء فلسطين",
    "تاريخ الشهداء",
    "غُرباء",
    "شهداؤنا الأبرار",
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: "شهداؤنا الأبرار | غُرباء - منصة الشهداء",
    description:
      "منصة غُرباء تعرض قصص الشهداء الفلسطينيين الأبرار الذين ضحوا في سبيل الحق.",
    url: `${baseUrl}/stories`,
  },
  twitter: {
    ...sharedTwitter,
    title: "شهداؤنا الأبرار | غُرباء - منصة الشهداء",
    description:
      "منصة غُرباء تعرض قصص الشهداء الفلسطينيين الأبرار الذين ضحوا في سبيل الحق.",
  },
  icons: baseIcons,
};

// Massacres metadate
export const MassacresMetadata: Metadata = {
  title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
  description:
    "توثيق شامل للمجازر الصهيونية بحق الشعب الفلسطيني مع تفاصيل الضحايا والأحداث والتواريخ",
  keywords: [
    "مجازر صهيونية",
    "جرائم الاحتلال",
    "شهداء فلسطين",
    "توثيق المجازر",
    "جرائم الحرب",
    "غرباء",
  ],
  openGraph: {
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description:
      "أرشيف كامل لمجازر الاحتلال الصهيوني ضد الفلسطينيين مع صور وتفاصيل الضحايا",
    url: "https://ghorabaa.vercel.app/massacres",
    images: [
      {
        url: "/images/massacres-og.jpg",
        width: 1200,
        height: 630,
        alt: "توثيق المجازر الصهيونية بحق الشعب الفلسطيني",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المجازر الصهيونية | سجل جرائم الاحتلال - غرباء",
    description: "توثيق كامل لمجازر الاحتلال الصهيوني ضد الشعب الفلسطيني",
    images: ["/images/massacres-og.jpg"],
  },
  alternates: {
    canonical: "/massacres",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dc:language": "ar",
    "dc:title": "المجازر الصهيونية ضد الفلسطينيين",
    "dc:description": "توثيق تاريخي للمجازر الصهيونية بحق الشعب الفلسطيني",
  },
};

// Statistics metadata
export const StatisticsMetadata: Metadata = {
  title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
  description:
    "أحدث الإحصائيات والبيانات الموثقة عن شهداء فلسطين مع تحليلات وتقارير مفصلة",
  keywords: [
    "إحصائيات الشهداء",
    "بيانات الشهداء الفلسطينيين",
    "تقارير إحصائية",
    "أرقام الشهداء",
    "توثيق إحصائي",
    "غرباء",
  ],
  openGraph: {
    title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
    description: "بيانات رقمية موثقة وتقارير إحصائية عن شهداء فلسطين",
    url: "https://ghorabaa.vercel.app/statistics",
    images: [
      {
        url: "/images/statistics-og.jpg",
        width: 1200,
        height: 630,
        alt: "إحصائيات وتقارير عن شهداء فلسطين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الإحصائيات والبيانات | أرقام وتقارير عن الشهداء - غرباء",
    description: "أحدث البيانات الإحصائية الموثقة عن شهداء فلسطين",
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
  },
};

// About metadata
export const AboutMetadata: Metadata = {
  title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين - قصص وإحصائيات",
  description:
    "منصة غرباء توثق قصص الشهداء الفلسطينيين وتقدم بيانات موثقة عن جرائم الاحتلال",
  keywords: [
    "منصة غرباء",
    "توثيق الشهداء",
    "قصص الشهداء الفلسطينيين",
    "عن الموقع",
    "رسالة غرباء",
    "رؤية المنصة",
  ],
  openGraph: {
    title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين",
    description:
      "تعرف على رؤية ورسالة منصة غرباء في توثيق قصص الشهداء وإحصاءات الجرائم الصهيونية",
    url: "https://ghorabaa.vercel.app/about",
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "عن منصة غرباء لتوثيق الشهداء الفلسطينيين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "عن غرباء | منصة توثيق الشهداء الفلسطينيين",
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

// Events metadata
export const EventsMetadata: Metadata = {
  title: "الفعاليات والأحداث | أنشطة ونشاطات تضامنية مع فلسطين - غرباء",
  description:
    "أحدث الفعاليات والأنشطة التضامنية مع القضية الفلسطينية وتوثيق الأحداث الجارية",
  keywords: [
    "فعاليات فلسطين",
    "أحداث تضامنية",
    "أنشطة دعم فلسطين",
    "تقويم الأحداث",
    "فعاليات غرباء",
    "نشاطات فلسطينية",
  ],
  openGraph: {
    title: "الفعاليات والأحداث | أنشطة تضامنية مع فلسطين - غرباء",
    description:
      "تقويم الفعاليات والأنشطة التضامنية مع الشعب الفلسطيني حول العالم",
    url: "https://ghorabaa.vercel.app/events",
    images: [
      {
        url: "/images/events-og.jpg",
        width: 1200,
        height: 630,
        alt: "فعاليات وأنشطة تضامنية مع فلسطين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الفعاليات والأحداث | أنشطة تضامنية مع فلسطين",
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

// Sign-in metadata
export const SigninMetadata: Metadata = {
  title: "تسجيل الدخول - موقع غرباء",
  description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
  keywords: ["تسجيل دخول", "حساب غرباء", "دخول الأعضاء", "موقع غرباء"],
  robots: {
    index: false, // Prevent search engines from indexing sign-in page
    follow: true,
  },
  openGraph: {
    title: "تسجيل الدخول - موقع غرباء",
    description: "سجل الدخول إلى حسابك للوصول إلى محتوى غرباء الحصري",
    url: "https://ghorabaa.vercel.app/signin",
    type: "website",
  },
};

// Sign-up metadata
export const SignupMetadata: Metadata = {
  title: "إنشاء حساب جديد - موقع غرباء",
  description:
    "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري",
  keywords: [
    "تسجيل جديد",
    "إنشاء حساب",
    "تسجيل عضو جديد",
    "موقع غرباء",
    "انضم إلينا",
  ],
  robots: {
    index: false, // Recommended to prevent indexing of signup pages
    follow: true,
  },
  openGraph: {
    title: "إنشاء حساب جديد - موقع غرباء",
    description:
      "انضم إلى مجتمع غرباء وأنشئ حسابك الشخصي للوصول إلى المحتوى الحصري",
    url: "https://ghorabaa.vercel.app/signup",
    type: "website",
    images: [
      {
        url: "/images/og-signup.jpg", // Your custom signup OG image
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
    images: ["/images/og-signup.jpg"],
  },
  alternates: {
    canonical: "https://ghorabaa.vercel.app/signup",
  },
};

// Add Story metadata
export const AddStoryMetadata: Metadata = {
  title: "إضافة قصة شهيد جديد | توثيق قصص الشهداء - غرباء",
  description:
    "ساهم معنا في توثيق قصة شهيد فلسطيني عبر منصة غرباء لضمان بقاء الذكرى خالدة",
  keywords: [
    "إضافة قصة شهيد",
    "توثيق الشهداء",
    "نموذج إضافة قصة",
    "سجل الشهداء",
    "منصة غرباء",
    "قصص الشهداء الفلسطينيين",
  ],
  openGraph: {
    title: "إضافة قصة شهيد جديد | منصة غرباء",
    description:
      "ساهم في توثيق تاريخ الشهداء الفلسطينيين عبر إضافة قصصهم على منصة غرباء",
    url: "https://ghorabaa.vercel.app/addStory",
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
    index: false, // Recommended for form pages
    follow: true,
  },
  other: {
    privacy: "form-submission", // Indicates this is a form page
    "cache-control": "private, no-store", // Sensitive form handling
    "dc:rights": "جميع الحقوق محفوظة للمساهمين",
  },
};
