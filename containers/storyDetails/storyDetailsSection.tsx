import { StoryInterface } from "@/app/interfaces";
import Image from "next/image";
import PageTitles from "@/components/UI/typography/pageTitles";
import { notFound } from "next/navigation";
import { getSessionAction } from "@/app/actions/registerActions";
import { dateConversion } from "@/utils/format";
import StoryActions from "../stories/storyActions";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import CommentsSection from "./commentsSection";
import { Role, StoryStatus } from "@/app/enums";
import { BsExclamationTriangle, BsEye } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import LogVisit from "@/containers/stories/logVisit";

type Props = {
  id: string;
};

const StoryDetailsSection = async ({ id }: Props) => {
  const session = await getSessionAction();
  const user_id = session?.user.id;

  const storyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/fetch/${id}`,
    {
      cache: "no-store", // optional but recommended if dynamic
    }
  );

  if (!storyResponse.ok) {
    notFound(); // redirects to 404 page
  }

  const data: StoryInterface & { publisherName: string } =
    await storyResponse.json();

  const isStoryOwner = data?.publisher_id === user_id;
  const isAdmin = session?.user.role === Role.ADMIN;
  const isApproved = data.status === StoryStatus.APPROVED;

  if (!isApproved && !isStoryOwner && !isAdmin) {
    notFound(); // only allow access if approved, OR user is admin/owner
  }

  console.log("Story Details Data", data);

  return (
    data && (
      <div className="mt-24">
        {data.status === StoryStatus.APPROVED && <LogVisit storyId={id} />}

        {/* Story Actions Component [Edit | Share  | Report | Delete ] */}
        {data.status === StoryStatus.APPROVED && data && (
          <StoryActions data={data!} session={session} />
        )}

        {data.status === StoryStatus.PENDING && (
          <div className="relative flex items-center gap-2 bg-pending text-white border rounded-md shadow-sm p-3 mt-4 mb-4 w-full font-semibold">
            <BsExclamationTriangle size={20} />
            <p className="text-[13px]">
              طلبك لإضافة القصة قيد المراجعة حالياً، ويجري التأكد من صحة
              البيانات المُدخلة من قبل المشرفين
            </p>
          </div>
        )}

        {data.status == StoryStatus.REJECTED && (
          <Link
            target="_blank"
            href={`/profile?activeTap=${StoryStatus.REJECTED}#storyContainer`}
            className="group relative flex items-center gap-2 bg-rejected text-white border rounded-md shadow-sm p-3 mt-4 mb-4 w-full font-semibold"
          >
            <BiInfoCircle size={20} />
            <p className="text-[13px] group-hover:underline">
              تم رفض طلبك لإضافة قصة الشهيد!
            </p>
          </Link>
        )}

        <div className="flex flex-col gap-2">
          <PageTitles storyName={data.name} />
        </div>

        <div className="relative mt-2 flex flex-col justify-center items-start w-full min-h-[80vh] bg-secondary rounded-2xl">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة الشهيد"
            width={350}
            height={350}
            className="mx-auto z-[10] max-h-[60vh] object-cover rounded-2xl shadow-xl"
            priority
            quality={100}
            unoptimized
          />
        </div>

        <div className="relative mt-1">
          <div className="flex justify-between text-[11px] mt-2">
            <div className="flex items-center gap-2 text-gray_dark">
              <p>بواسطة: </p>
              <Link
                className="hover:underline"
                href={`/profile/${data.publisher_id}`}
                target="_blank"
              >
                {data.publisherName}
              </Link>
              <p> | </p>
              <p>{dateConversion(data.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2 text-gray_dark">
              <p>{data?.visits || 0}</p>
              <BsEye size={18} />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <h4 className="text-lg font-semibold">الشهيد | {data.name}</h4>
            {data.nickname && (
              <p className="text-gray_dark"> &quot; {data.nickname} &quot; </p>
            )}
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
                    <p>{data.age}</p>
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

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  مواقع التواصل الاجتماعي
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {data?.social_media &&
                  Object.values(data.social_media).some(
                    (value) => value?.trim() !== ""
                  ) ? (
                    <div className="flex items-center gap-4">
                      {data.social_media?.facebook && (
                        <Link
                          href={data.social_media.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebook size={20} className="text-blue-500" />
                        </Link>
                      )}

                      {data.social_media?.x && (
                        <Link
                          href={data.social_media.x}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter size={20} />
                        </Link>
                      )}

                      {data.social_media?.instagram && (
                        <Link
                          href={data.social_media.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram size={20} className="text-[#a3244f]" />
                        </Link>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8">
            <h2 className="font-bold text-lg">نبذة عن الشهيد </h2>
            <p className="font-light text-md mt-2">{data.bio}</p>
          </div>
        </div>

        {data.status === StoryStatus.APPROVED && (
          <CommentsSection session={session} id={id} />
        )}
      </div>
    )
  );
};

export default StoryDetailsSection;
