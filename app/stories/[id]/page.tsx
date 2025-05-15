import ShareModal from "@/containers/events/shareModal";
import PageTitles from "@/components/UI/typography/pageTitles";
import { FaEye } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { getSessionAction } from "@/app/actions/registerActions";
import Image from "next/image";
import { StoryInterface } from "@/app/interfaces";
import { dateConversion } from "@/conversions";
import CommentsSection from "@/containers/storyDetails/commentsSection";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await getSessionAction();
  console.log("Session values", session);

  const storyResponse = await fetch(`http://localhost:3000/api/story/${id}`);
  const data: StoryInterface & { publisherName: string } =
    await storyResponse.json();

  console.log("Story Details", data);

  const age =
    data?.death_date && data?.birth_date
      ? new Date(data.death_date).getFullYear() -
        new Date(data.birth_date).getFullYear()
      : "N/A";

  const commentsResponse = await fetch(
    `http://localhost:3000/api/comment/${id}`
  );

  const comments = await commentsResponse.json();
  console.log("Comments Data", comments.data); // an array of comments

  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <PageTitles />

        <div className="relative mt-2 flex flex-col justify-center items-start w-full min-h-[80vh] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000000d8] bg-fixed rounded-xl before:rounded-xl">
          <Image
            src={data.image || "/notFound.png"}
            alt="صورة الشهيد"
            width={350}
            height={350}
            className="mx-auto rounded-2xl shadow-xl z-[10]"
            priority
            quality={100}
          />

          <div
            title="إضافة إلى المحفوظات"
            className="absolute top-5 right-5 backdrop-blur-sm rounded-full flex items-center justify-center p-3 bg-background_light shadow-lg cursor-pointer "
          >
            <BsBookmark size={16} />
          </div>
        </div>

        <div className="relative mt-1">
          <div className="flex flex- justify-between text-[11px]">
            <div className="flex items-center gap-2 text-gray_dark">
              <p>بواسطة: </p>
              <p>{data.publisherName}</p>
              <p> | </p>
              <p>{dateConversion(data.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2 text-gray_dark">
              <p>232</p>
              <FaEye size={16} />
            </div>
          </div>

          <div className="flex items-center gap-8 mt-6">
            <h4 className="text-lg font-extrabold">الشهيد | {data.name}</h4>
            <ShareModal
              title="مشاركة صفحة الشهيد"
              // get the current URl
              sharedLink={`https://ghorabaa.com/stories/${id}`}
            />
          </div>

          <table className="h-full w-full  border mt-8">
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
                  <div className="flex items-center gap-1  ">
                    <p>{age}</p>
                    <p>عاماً</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  مكان السكن
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
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

      {session && <CommentsSection session={session} id={id} />}
    </div>
  );
}
