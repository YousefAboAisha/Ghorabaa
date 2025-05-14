import ShareModal from "@/containers/events/shareModal";
import PageTitles from "@/components/UI/typography/pageTitles";
import { FaEye } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import CommentForm from "@/components/UI/Forms/commentForm";
import { getSessionAction } from "@/app/actions/registerActions";
import Image from "next/image";
import { CommentInterface, StoryInterface } from "@/app/interfaces";
import { dateConversion } from "@/conversions";
import CommentCard from "@/components/UI/cards/commentCard";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await getSessionAction();
  console.log("Session values", session);

  const martyrResponse = await fetch(`http://localhost:3000/api/story/${id}`);
  const martyr: StoryInterface = await martyrResponse.json();

  const age =
    martyr?.death_date && martyr?.birth_date
      ? new Date(martyr.death_date).getFullYear() -
        new Date(martyr.birth_date).getFullYear()
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
            src={martyr.image}
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
              <p>يوسف رشاد أبو عيشة</p>
              <p> | </p>
              <p>{dateConversion(martyr.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2 text-gray_dark">
              <p>232</p>
              <FaEye size={16} />
            </div>
          </div>

          <div className="flex items-center gap-8 mt-6">
            <h4 className="text-lg font-extrabold">الشهيد | {martyr.name}</h4>
            <ShareModal
              title="مشاركة صفحة الشهيد"
              // get the current URl
              sharedLink={`https://ghorabaa.com/martyrs/${id}`}
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
                  {martyr.birth_date}
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  تاريخ الاستشهاد
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {martyr.death_date}
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
                    <p>{martyr.city}</p>-<p>{martyr.neighborhood}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8">
            <h2 className="font-bold text-lg">نبذة عن الشهيد </h2>
            <p className="font-light text-md mt-2">{martyr.bio}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-10 mt-8">
        <h2 className="font-bold text-lg">التعليقات</h2>

        <CommentForm session={session} story_id={id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {comments.data.map((elem: Partial<CommentInterface>) => (
            <CommentCard
              key={elem._id as string}
              text={elem.text as string}
              createdAt={elem.createdAt as Date}
              image={elem?.author_image as string}
              name={elem?.author_name as string}
            />
          ))}
        </div>
        <div className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto cursor-pointer">
          <p>عرض المزيد</p>
        </div>
      </div>
    </div>
  );
}
