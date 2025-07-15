import React from "react";
import GeneralStatisticCard from "@/components/UI/cards/generalStatisticCard";
import { BiUser } from "react-icons/bi";
import { BsJournal } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { GiGraduateCap, GiTeacher } from "react-icons/gi";
import { MdOutlineEngineering } from "react-icons/md";

const Categories = () => {
  return (
    <div className="cards-grid-3 section">
      <GeneralStatisticCard
        title="الصحافيين"
        count={136}
        icon={<BsJournal size={35} />}
      />

      <GeneralStatisticCard
        title="الأجانب"
        count={136}
        icon={<BiUser size={35} />}
      />

      <GeneralStatisticCard
        title="القامات العلمية"
        count={136}
        icon={<GiGraduateCap size={35} />}
      />

      <GeneralStatisticCard
        title="الأطباء"
        count={136}
        icon={<FaUserDoctor size={35} />}
      />

      <GeneralStatisticCard
        title="المهندسين"
        count={136}
        icon={<MdOutlineEngineering size={35} />}
      />

      <GeneralStatisticCard
        title="المعلّمون"
        count={136}
        icon={<GiTeacher size={35} />}
      />
    </div>
  );
};

export default Categories;
