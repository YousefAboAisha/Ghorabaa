import { DOMAIN_KEYWORDS } from "@/data/domainKeywords";

export function extractArabicKeywords(bio: string): string[] {
  if (!bio || typeof bio !== "string") return [];

  // Normalize bio text: remove punctuation and diacritics (tashkeel)
  const normalized = bio
    .replace(/[^\u0621-\u064A\s]/g, "") // keep only Arabic letters and spaces
    .replace(/[\u064B-\u065F]/g, ""); // remove Arabic diacritics

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
