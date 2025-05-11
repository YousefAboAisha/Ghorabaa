import Button from "@/components/UI/inputs/button";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const PageNotFound = () => {
  return (
    <div className="relative container flex flex-col items-center justify-center mt-40">
      <h2 className="text-[120px] font-bold">404</h2>
      <p className="">الصفحة غير متوفرة</p>
      <Link href={"/"} className="w-full">
        <Button
          title=" الصفحة الرئيسية"
          className="mt-4 bg-primary w-full md:w-3/12 mx-auto"
          hasShiningBar={false}
          icon={<RiArrowGoBackFill />}
        />
      </Link>
    </div>
  );
};

export default PageNotFound;
