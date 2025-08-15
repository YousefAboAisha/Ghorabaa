// /app/utils/extractTags.ts

// -------------------- STOPWORDS --------------------
const arabicStopWords = new Set([
  "في",
  "من",
  "على",
  "عن",
  "إلى",
  "أن",
  "إن",
  "كان",
  "كانت",
  "ما",
  "هذا",
  "هذه",
  "ذلك",
  "تلك",
  "هناك",
  "هو",
  "هي",
  "كما",
  "أو",
  "أي",
  "كل",
  "ثم",
  "قد",
  "لا",
  "لم",
  "لن",
  "بعد",
  "قبل",
  "مع",
  "بين",
  "حتى",
  "عند",
  "إذ",
  "لكن",
  "لذلك",
  "وهذا",
  "وهذه",
  "التي",
  "الذي",
  "و",
  "يا",
  "إلا",
  "أين",
  "كيف",
  "لماذا",
  "متى",
  "إذًا",
  "أجل",
  "أمام",
  "خلف",
  "تحت",
  "فوق",
  "حول",
  "أثناء",
  "حسب",
  "مثل",
  "إضافة",
  "أيضًا",
  "به",
  "فيه",
  "فيها",
  "بها",
  "بهو",
  "وهو",
  "وهي",
  "فهو",
  "فهي",
  "إما",
  "حيث",
  "أحد",
  "إحدى",
  "بعض",
  "كلما",
  "أصبح",
  "أمسى",
  "ظل",
  "بات",
  "صار",
  "ليس",
  "إنما",
  "إيا",
  "ذو",
  "ذات",
  "اللذان",
  "اللتان",
  "الذين",
  "اللاتي",
  "اللائي",
  "كأن",
  "لعل",
  "ليت",
  "لو",
  "لولا",
  "أما",
  "بل",
  "ربما",
  "مثلا",
  "سوف",
  "هل",
  "ألا",
  "مازال",
  "مابرح",
  "ماانفك",
  "مافتئ",
  "نحن",
  "أنا",
  "أنت",
  "أنتِ",
  "أنتم",
  "أنتن",
  "هم",
  "هن",
  "إياك",
  "إياكم",
  "إياكن",
  "إياهم",
  "إياه",
  "إياها",
  "نفسه",
  "نفسها",
  "أنفسهم",
  "أنفسنا",
]);

// -------------------- KEYWORDS --------------------
const martyrStoryKeywords = new Set([
  "شهيد",
  "استشهاد",
  "شهادة",
  "بطل",
  "فداء",
  "جهاد",
  "مقاومة",
  "كفاح",
  "وطن",
  "دماء",
  "قضية",
  "عزة",
  "كرامة",
  "حزن",
  "فراق",
  "دموع",
  "ذكرى",
  "فقدان",
  "فراغ",
  "حنين",
  "ألم",
  "عتاب",
  "وداع",
  "احتلال",
  "صمود",
  "انتفاضة",
  "مجزرة",
  "قصف",
  "اعتداء",
  "أسير",
  "حرية",
  "حق العودة",
  "أقصى",
  "غزة",
  "الضفة",
  "القدس",
  "جنة",
  "لقاء",
  "دعاء",
  "صبر",
  "رحمة",
  "ثبات",
  "شفاعة",
  "قضاء وقدر",
  "رباط",
  "ثواب",
  "ضحكة",
  "صوت",
  "عائلة",
  "أم",
  "أب",
  "ولد",
  "بنت",
  "صديق",
  "طفولة",
  "حلم",
  "رسالة",
  "كلمات أخيرة",
  "شفيع",
]);

// -------------------- NORMALIZATION --------------------
const normalizeArabic = (text: string): string => {
  return text
    .replace(/[\u064B-\u065F\u0610-\u061A]/g, "") // diacritics
    .replace(/[إأآا]/g, "ا") // alef forms
    .replace(/ى/g, "ي") // alef maqsura
    .replace(/ة/g, "ه") // taa marbuta
    .replace(/ؤ/g, "و") // hamza on waw
    .replace(/ئ/g, "ي") // hamza on ya
    .replace(/ـ/g, "") // tatweel
    .replace(/[.,،؛!؟«»()#]/g, "") // punctuation
    .trim();
};

// -------------------- LIGHT STEMMER --------------------
const stemArabic = (word: string): string => {
  word = word.replace(/^(ال|وال|بال|كال|فال|لل)/, ""); // common prefixes
  word = word.replace(/(ات|ون|ين|ان|ه|ها|هم|كم|نا|وا|ي)$/g, ""); // common suffixes
  return word;
};

// -------------------- EXTRACTOR --------------------
export const extractMartyrStoryKeywords = (storyDetails: string): string[] => {
  if (!storyDetails || typeof storyDetails !== "string") return [];

  const normalizedText = normalizeArabic(storyDetails.toLowerCase());

  const words = normalizedText
    .split(/\s+/)
    .filter((word) => word.length > 1 && !arabicStopWords.has(word));

  // Preprocess keywords
  const normalizedKeywords = Array.from(martyrStoryKeywords).map((kw) =>
    normalizeArabic(kw).toLowerCase()
  );

  const foundKeywords = new Set<string>();

  // ---------------- Single words ----------------
  words.forEach((word) => {
    const stemmedWord = stemArabic(word);
    normalizedKeywords.forEach((kw) => {
      if (stemArabic(kw) === stemmedWord) {
        foundKeywords.add(kw);
      }
    });
  });

  // ---------------- Multi-word phrases (2-3) ----------------
  for (let n = 2; n <= 3; n++) {
    for (let i = 0; i <= words.length - n; i++) {
      const phrase = words.slice(i, i + n).join(" ");
      normalizedKeywords.forEach((kw) => {
        if (stemArabic(kw) === stemArabic(phrase)) {
          foundKeywords.add(kw);
        }
      });
    }
  }

  return Array.from(foundKeywords);
};
