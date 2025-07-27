// /app/utils/extractTags.ts

const arabicStopWords = new Set([
  // Original words
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

  // Added stopwords
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
  "حتى",
  "حيث",
  "أثناء",
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
  "ثم",
  "قد",
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
  "هو",
  "هي",
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

const normalizeArabic = (text: string): string => {
  return text
    .replace(/[\u064B-\u0652]/g, "") // remove diacritics (Tashkeel)
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]؟«»]/g, "") // remove punctuation
    .replace(/\s{2,}/g, " ") // collapse spaces
    .trim();
};

export default function extractTags(text: string, topK: number = 7): string[] {
  const normalized = normalizeArabic(text);
  const words = normalized.split(/\s+/);

  const freqMap = new Map<string, number>();

  for (const word of words) {
    if (word.length < 3 || arabicStopWords.has(word)) continue;
    freqMap.set(word, (freqMap.get(word) ?? 0) + 1);
  }

  // Sort by frequency descending
  const sorted = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);

  // Return top K words
  return sorted.slice(0, topK).map(([word]) => word);
}
