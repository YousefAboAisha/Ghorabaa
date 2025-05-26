import NetworkErrorPage from "@/components/responseMessages/networkErrorPage";
import Button from "@/components/UI/inputs/button";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

const TodaysMartyr = async () => {
  const fetchTodaysMartyr = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/todaysMartyr`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    return res.json();
  };
  const { data } = await fetchTodaysMartyr();

  return data ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row items-center gap-4 text-[14px]">
            <h4 className="font-bold text-lg  ">{data?.name}</h4>
          </div>

          <p className="text-[13px]">{data?.bio}</p>
        </div>

        <Link href={`/stories/${data?._id}`} className="mt-4">
          <Button
            title="عرض الملف الشخصي"
            className="w-full bg-primary text-[12px] px-4"
            icon={<BsEye size={18} />}
            hasShiningBar={false}
          />
        </Link>
      </div>

      <div className="relative flex flex-col justify-center w-full min-h-[60vh] rounded-2xl bg-secondary">
        <Image
          src={data?.image || "/notFound.png"}
          width={350}
          height={350}
          alt="Today's martyr"
          className="shadow-2xl self-center h-[350px] group-hover:scale-125 duration-700 object-cover rounded-xl"
          blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
          placeholder="blur"
          priority
          quality={100}
        />
      </div>
    </div>
  ) : (
    <NetworkErrorPage />
  );
};

export default TodaysMartyr;
