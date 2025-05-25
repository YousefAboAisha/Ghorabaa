import Logo from "../UI/logo";
import RenderredRoutes from "./renderredRoutes";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="container flex flex-col mt-24 mb-12">
      <div className="relative p-6 gap-4 border rounded-md rounded-b-none border-b-0 bg-white">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Logo className="text-2xl" />

          <div className="flex flex-wrap justify-center gap-4">
            <RenderredRoutes />
          </div>

          <p className="text-[12px] font-light">
            جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة {date}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center bg-secondary text-white p-2 border rounded-b-md">
        <div
          style={{
            lineHeight: "25px",
          }}
          className="self-center text-center text-[12px] w-full md:w-10/12"
        >
          هذه المنصّة صدقة جارية عن روح الشهيد المهندس/ محمد عبد الله حسب الله 🧡
        </div>
      </div>
    </footer>
  );
};

export default Footer;
