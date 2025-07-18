"use client";

import { usePathname } from "next/navigation";

const pathTranslations: Record<string, string> = {
  events: "الفعاليات القادمة",
  about: "من نحن",
  statistics: "البيانات والإحصائيات",
  massacres: "المجازر الصهيونية",
  stories: "شهداؤنا",
  search: "البحث عن الشهداء",
};

const Hero = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const translatedRoute = pathTranslations[segments[0]];

  return (
    <>
      <div className="relative overflow-hidden flex items-center justify-center p-8 min-h-[45vh] bg-secondary-banner bg-fixed bg-center before:bg-[#1e272e30] before:absolute before:w-full before:h-full rounded-2xl ">
        <div className="flex flex-col justify-center items-center gap-6 z-10">
          <h2 className="font-bold text-white text-5xl">منصة غُربَاء</h2>
          <div className="flex items-center gap-2 text-white text-md">
            <p className="opacity-70">الرئيسية/</p>
            <p>{translatedRoute}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
