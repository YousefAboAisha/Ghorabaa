import { Highlight } from "@/app/interfaces";

export const HighlightedText = ({
  highlights,
  field,
  fallback,
}: {
  highlights?: Highlight[];
  field: string;
  fallback: string;
}) => {
  const textParts = highlights
    ?.filter((h) => h.path === field)
    .flatMap((h) => h.texts);

  if (!textParts || textParts.length === 0) return fallback;

  return (
    <>
      {textParts.map((t, i) =>
        t.type === "hit" ? (
          <mark key={i} className="bg-yellow-200 text-black rounded px-1">
            {t.value}
          </mark>
        ) : (
          <span key={i}>{t.value}</span>
        )
      )}
    </>
  );
};
