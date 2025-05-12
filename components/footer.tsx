import { Routes } from "@/data/routes";
import Link from "next/link";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="relative container mt-24 mb-12 p-6 gap-4 border rounded-md bg-white shadow-lg">
      <div className="flex items-center justify-center gap-4 w-fit border-b p-4 mx-auto">
        {Routes.map(({ title, href }, index) => (
          <Link
            key={index}
            href={href}
            className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-sm font-primary outline-none font-noto_kufi `}
            title={title}
          >
            {title}
          </Link>
        ))}
      </div>

      <h2 className="text-center text-[13px] font-semibold mt-4">
        هذه المنصة صدقة جارية عن روح الشهيد المهندس/ محمد عبد الله حسب الله{" "}
        {date} 🧡
      </h2>
    </footer>
  );
};

export default Footer;
