import { DOMAIN_KEYWORDS } from "@/data/domainKeywords";

function normalizeArabic(text: string) {
  return text
    .replace(/[\u064B-\u0652]/g, "") // Remove diacritics
    .replace(/[إأآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\w\s]/gi, "") // Remove punctuation
    .trim();
}

export function extractArabicKeywords(bio: string): string[] {
  if (!bio || typeof bio !== "string") return [];

  // Normalize bio text: remove punctuation and diacritics (tashkeel)
  const normalized = normalizeArabic(bio);

  const words = normalized.split(/\s+/).filter(Boolean);

  const frequency: Record<string, number> = {};

  for (const word of words) {
    if (DOMAIN_KEYWORDS.includes(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 10);
}
