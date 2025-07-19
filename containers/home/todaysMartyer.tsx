import ErrorMessage from "@/components/responseMessages/errorMessage";
import Button from "@/components/UI/inputs/button";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

const TodaysMartyr = async () => {
  // Fetching the data for the martyr of the day
  const fetchTodaysMartyr = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/todaysMartyr`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };

  const { data, error } = await fetchTodaysMartyr();

  // console.log("Todays martyr data: ", data);
  // console.log("Todays martyr error: ", error);

  if (error) {
    return <ErrorMessage error={error} className="mt-4" />;
  }

  if (data) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-row items-center gap-4 text-[14px]">
              <h4 className="font-bold text-lg  ">{data?.name}</h4>
            </div>

            <p className="text-md font-light line-clamp-[13]">{data?.bio}</p>
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

        <div className="relative flex flex-col justify-center w-full min-h-[60vh] rounded-md bg-[#1e272e30]  ">
          <Image
            src={data?.image || "/notFound.png"}
            width={350}
            height={350}
            alt="Today's martyr"
            className="shadow-2xl self-center h-[350px] rounded-xl object-cover object-center"
            priority
            quality={100}
          />
        </div>
      </div>
    );
  }
};

export default TodaysMartyr;
