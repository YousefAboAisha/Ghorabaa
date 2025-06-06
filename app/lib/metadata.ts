// lib/metadata.ts

const baseUrl = "https://ghorabaa.com";
const baseTitle = "غُرباء";
const baseDescription =
  "منصة غُرباء توثق قصص الشهداء الفلسطينيين وتخلد ذكراهم. استكشف مكتبة رقمية غنية بالسير الذاتية، الصور، والإحصائيات حول الشهداء، وشارك قصصهم مع العالم.";
const baseImage = `${baseUrl}/og-banner.png`;
const baseIcons = {
  icon: "/zad-logo.svg",
  apple: "/zad-logo.svg",
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
