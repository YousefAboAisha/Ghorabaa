import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

const TodaysMartyr = async () => {
  const fetchTodaysMartyr = async () => {
    const res = await fetch(`http://localhost:3000/api/story/todaysMartyr`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const { data } = await fetchTodaysMartyr();

  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-start">
        <Heading
          title=""
          highLightText="شهيد اليوم"
          details="وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ ۚ بَلْ أَحْيَاءٌ وَلَٰكِن لّا تَشْعُرُونَ"
          highlightColor="before:bg-primary"
        />

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row items-center gap-4 text-[14px]">
            <h4 className="font-bold text-lg  ">{data.name}</h4>
          </div>

          <p className="text-[13px]">{data.bio}</p>
        </div>

        <Link href={`/martyrs/${data._id}`} className="mt-4">
          <Button
            title="عرض الملف الشخصي"
            className="w-full bg-primary text-[12px] px-4"
            icon={<BsEye size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>

      <div className="relative mt-2 flex flex-col justify-center items-start w-full min-h-[60vh] bg-home-landing before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000000d8] rounded-xl before:rounded-xl">
        <Image
          src={data.image}
          width={1000}
          height={1000}
          alt="Today's martyr"
          className="shadow-2xl self-center w-full h-[300px] group-hover:scale-125 duration-700 object-contain z-[10]"
          blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
          placeholder="blur"
          priority
          quality={100}
        />
      </div>
    </div>
  );
};

export default TodaysMartyr;
