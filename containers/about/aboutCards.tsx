import AboutCard from "@/components/UI/cards/aboutCard";
import React from "react";
import { BsCheck2Circle, BsFillJournalBookmarkFill } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";
import { MdPostAdd } from "react-icons/md";

const AboutCards = () => {
  return (
    <div className="cards-grid-4 gap-4 mt-12 -translate-y-40 p-10">
      <AboutCard
        title="محتوى مستقل"
        icon={<MdPostAdd size={25} className="text-blueColor" />}
        classname="bg-[#2980b930]"
        details="نُنتج محتوى موثوقاً يُسلّط الضوء على قصص الشهداء بموضوعية، بعيداً عن أي توجيه أو تسييس."
      />

      <AboutCard
        title="معلومات أرشيفية"
        icon={<BsFillJournalBookmarkFill className="text-rejected" size={25} />}
        classname="bg-[#c2361630]"
        details="نجمع ونُؤرشف المعلومات والوثائق المتعلقة بالشهداء لضمان حفظ الذاكرة الوطنية للأجيال القادمة."
      />

      <AboutCard
        title="بيانات إحصائية"
        icon={<GrAnalytics size={25} className="text-approved" />}
        classname="bg-[#44bd3230]"
        details="نُحلّل البيانات المتعلقة بالشهداء ومناطقهم وأعمارهم لتقديم صورة شاملة تُعزز من فهم الواقع وتوجيه الدعم."
      />

      <AboutCard
        title="دقة ومصداقية"
        icon={<BsCheck2Circle size={25} className="text-pending" />}
        classname="bg-[#f39c1230]"
        details="حيث أننا نتحرى الدقة العالية والمصداقية في جمع البيانات للوصول إلى أرشيف وقاعدة بيانات صحيحة تماماً"
      />
    </div>
  );
};

export default AboutCards;
