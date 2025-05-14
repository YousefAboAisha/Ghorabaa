import Link from "next/link";
import { Social } from "@/data/social";
import Logo from "./UI/logo";
import RenderredRoutes from "./renderredRoutes";

const Footer = () => {
  return (
    <footer className="relative container mt-24 mb-12 p-6 gap-4 border rounded-md bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="realtive flex flex-col items-center lg:items-start">
          <h2 className="font-semibold xt-center lg:text-start">
            أقسام الموقع
          </h2>
          <div className="flex flex-col gap-3 mt-4 text-center lg:text-start">
            {<RenderredRoutes />}
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center">
          <Logo className="text-4xl opacity-20" />

          <div className="flex flex-row gap-4">
            {Social.map(({ href, Icon }, index) => {
              return (
                <Link
                  key={index}
                  href={href}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>

        <div
          style={{
            lineHeight: "25px",
          }}
          className="self-center text-center text-[13px]"
        >
          هذه المنصّة صدقة جارية عن روح الشهيد المهندس{" "}
          <b className="text-secondary">محمد عبد الله حسب الله</b> من صديقه
          المُخلص <b>يوسف رشاد رزق أبو عيشة</b> نسأل الله الرحمة والخلود لجميع
          شهدائنا وأن يتقبل صالح أعمالنا، وأن يوفي أجورنا كاملةً 🧡
        </div>
      </div>
    </footer>
  );
};

export default Footer;
