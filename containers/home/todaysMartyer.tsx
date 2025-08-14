import ErrorMessage from "@/components/responseMessages/errorMessage";
import Button from "@/components/UI/inputs/button";
import { getFullName } from "@/utils/text";
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

  if (error) {
    return <ErrorMessage error={error} className="mt-4 !border-none" />;
  }

  if (data) {
    const fullName = getFullName(data?.name);
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-row items-center gap-4 text-[14px]">
              <h4 className="font-bold text-lg  ">{fullName}</h4>
            </div>

            <p className="text-md font-light line-clamp-[12]">{data?.bio}</p>
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

        <div className="relative flex flex-col justify-center">
          <Image
            src={data?.image || "/notFound.png"}
            width={400}
            height={400}
            alt="Today's martyr"
            className="shadow-2xl self-center h-[400px] rounded-xl object-cover object-center w-full md:w-auto"
            priority
            quality={100}
          />
        </div>
      </div>
    );
  }
};

export default TodaysMartyr;
