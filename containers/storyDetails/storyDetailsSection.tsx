import { StoryInterface } from "@/app/interfaces";
import Image from "next/image";
import PageTitles from "@/components/UI/typography/pageTitles";
import { notFound } from "next/navigation";
import { getSessionAction } from "@/app/actions/registerActions";
import EditStoryButton from "./editStoryButton";
import ShareModal from "../../components/UI/modals/shareModal";
import { dateConversion } from "@/utils/format";

type Props = {
  id: string;
};

const StoryDetailsSection = async ({ id }: Props) => {
  const session = await getSessionAction();
  const user_id = session?.user.id;

  const storyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/${id}`,
    {
      cache: "no-store", // optional but recommended if dynamic
    }
  );

  if (!storyResponse.ok) {
    notFound(); // redirects to 404 page
  }

  const data: StoryInterface & { publisherName: string } =
    await storyResponse.json();

  console.log("Story Details Data", data);

  const age =
    data?.death_date && data?.birth_date
      ? new Date(data.death_date).getFullYear() -
        new Date(data.birth_date).getFullYear()
      : "N/A";

  console.log("Current logged in ID", user_id);
  console.log("Story publisher_id", data.publisher_id);

  return (
    <div className="mt-24">
      <div className="flex flex-col gap-2">
        <PageTitles storyName={data.name} />
      </div>

      <div className="relative mt-2 flex flex-col justify-center items-start w-full min-h-[80vh] bg-secondary">
        <Image
          src={data.image || "/notFound.png"}
          alt="صورة الشهيد"
          width={350}
          height={350}
          className="mx-auto z-[10] max-h-[60vh] object-cover rounded-2xl shadow-xl"
          priority
          quality={100}
        />

        {data.publisher_id == user_id && <EditStoryButton data={data} />}
      </div>

      <div className="relative mt-1">
        <div className="flex justify-between text-[11px] mt-2">
          <div className="flex items-center gap-2 text-gray_dark">
            <p>بواسطة: </p>
            <p>{data.publisherName}</p>
            <p> | </p>
            <p>{dateConversion(data.createdAt)}</p>
          </div>

          <ShareModal
            title="مشاركة صفحة الشهيد"
            sharedLink={`https://ghorabaa.com/stories/${id}`}
          />
        </div>

        <div className="flex items-center gap-8 mt-6">
          <h4 className="text-lg font-extrabold">الشهيد | {data.name}</h4>
        </div>

        {data.keywords.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {data?.keywords?.map((keywrod, index) => {
              return (
                <div
                  key={index}
                  className="border bg-white rounded-xl shadow-sm p-1.5 px-3 text-[12px]"
                >
                  #{keywrod}
                </div>
              );
            })}
          </div>
        )}

        <table className="h-full w-full border mt-4">
          <tbody className="bg-white h-full">
            <tr>
              <td
                colSpan={2}
                className="py-3 px-4 border-b text-center text-sm border-l bg-secondary text-white font-semibold"
              >
                المعلومات الشخصية
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                تاريخ الميلاد
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                {data.birth_date}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                تاريخ الاستشهاد
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                {data.death_date}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                العمر
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                <div className="flex items-center gap-1">
                  <p>{age}</p>
                  <p>عاماً</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                مكان السكن
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                <div className="flex items-center gap-1">
                  <p>{data.city}</p>-<p>{data.neighborhood}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8">
          <h2 className="font-bold text-lg">نبذة عن الشهيد </h2>
          <p className="font-light text-md mt-2">{data.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsSection;
