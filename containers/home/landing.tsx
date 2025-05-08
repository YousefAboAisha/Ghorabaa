import Image from "next/image";
import scrollDown from "@/public/scrollDown.gif";
import Heading from "@/components/UI/typography/heading";
import Button from "@/components/UI/inputs/button";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="relative flex flex-col justify-center items-start w-full min-h-[90vh] mt-[70px] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0000009a] bg-fixed">
      <div className="container flex flex-col gap-4 absolute right-0 h-full w-full backdrop-blur-none md:w-[50%] md:backdrop-blur-sm lg:w-[50%] lg:backdrop-blur-sm  items-center justify-center">
        <div className="flex flex-col w-10/12 md:w-8/12 lg:w-6/12">
          <Heading
            title=""
            highLightText="منصة غُربَاء | عُروجٌ فخلود"
            highlightColor="before:bg-primary"
            details="أول منصة رقمية أنشئت لتخليد ذكرى شهدائنا الأبطال وإبقاء طيفهم حاضراً في أذهاننا على مرّ الزمان"
            className="text-white mb-4 !text-3xl"
            detailsStyles="mt-4"
          />
          <Link href={"/search"} className="w-8/12 lg:w-6/12 ">
            <Button
              title="اعرفهم الآن"
              className="bg-primary text-white px-2"
              icon={<FaSearch />}
            />
          </Link>
        </div>
      </div>

      <Image
        src={scrollDown}
        className="w-12 h-12 absolute text-white left-[50%] translate-x-[-50%] bottom-0 "
        alt="سحب لأسفل"
        unoptimized
      />
    </div>
  );
};

export default Landing;
