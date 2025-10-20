import { MissingInterface } from "@/app/interfaces";
import Image from "next/image";
import PageTitles from "@/components/UI/typography/pageTitles";
import { notFound } from "next/navigation";
import { dateConversion, fullDateConversion } from "@/utils/format";
import Link from "next/link";
import { ContentType, MissingStatus, Role } from "@/app/enums";
import { BsExclamationTriangle, BsEye } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import LogVisit from "@/containers/missings/logVisit";
import { getAgeLabel, getFullName } from "@/utils/text";
import ShareButton from "../stories/shareButton";
import { getServerSession } from "next-auth";
import { StoryWatermark } from "@/components/UI/watermark/storyWatermark";

type Props = {
  id: string;
};

const MissingDetails = async ({ id }: Props) => {
  const session = await getServerSession();
  const user_id = session?.user.id;

  const storyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/missings/fetch/${id}`,
    {
      cache: "no-store", // optional but recommended if dynamic
    }
  );

  if (!storyResponse.ok) {
    notFound(); // redirects to 404 page
  }

  const data: MissingInterface & { publisherName: string } =
    await storyResponse.json();

  const isStoryOwner = data?.publisher_id === user_id;
  const isAdmin =
    session?.user.role === Role.ADMIN || session?.user.role === Role.EDITOR;
  const isApproved = data.status === MissingStatus.APPROVED;

  if (!isApproved && !isStoryOwner && !isAdmin) {
    notFound(); // only allow access if approved, OR user is admin/owner
  }
  const fullName = getFullName(data.title);

  return (
    <div className="mt-24">
      {data.status === MissingStatus.APPROVED && <LogVisit missing_id={id} />}

      {data.status === MissingStatus.PENDING && (
        <div className="relative flex items-center gap-2 bg-pending text-white border rounded-md shadow-sm p-3 mt-4 mb-4 w-full font-semibold">
          <BsExclamationTriangle size={20} />
          <p className="text-[13px]">
            هذه القصة قيد المراجعة حالياً، وسيتم نشرها بعد الموافقة عليها من قبل
            المشرفين!
          </p>
        </div>
      )}

      {data.status === MissingStatus.REJECTED &&
        (isStoryOwner ? (
          <Link
            target="_blank"
            href={`/profile/${user_id}?activeTap=${MissingStatus.REJECTED}#storyContainer`}
            className="group relative flex items-center gap-2 bg-rejected text-white border rounded-md shadow-sm p-3 mt-4 mb-4 w-full font-semibold"
          >
            <BiInfoCircle size={20} />
            <p className="text-[13px] group-hover:underline">
              تم رفض طلبك لإضافة قصة المفقود!
            </p>
          </Link>
        ) : (
          <div className="relative flex items-center gap-2 bg-rejected text-white border rounded-md shadow-sm p-3 mt-4 mb-4 w-full font-semibold">
            <BiInfoCircle size={20} />
            <p className="text-[13px]">
              هذه القصة مرفوضة حالياً، ولم يتم نشرها رسمياً بعد!
            </p>
          </div>
        ))}

      <div className="flex flex-col gap-2">
        <PageTitles content_title={fullName} />
      </div>

      <div className="relative mt-2 flex flex-col justify-center items-start w-full min-h-[80vh] bg-martyr-pattern rounded-2xl">
        <div className="relative max-h-[60vh] mx-auto overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={data?.image || "/notFound.png"}
            alt="صورة المفقود"
            width={350}
            height={350}
            className="mx-auto z-[10] object-cover "
            priority
            quality={100}
            unoptimized
          />
          <StoryWatermark />
        </div>
      </div>

      <div className="relative mt-1">
        <div className="flex justify-between text-[11px] mt-2">
          <div className="flex items-center gap-2 text-gray_dark">
            <p>بواسطة: </p>

            {data.publisherName}
            <p> | </p>
            <p>{fullDateConversion(data.createdAt)}</p>
          </div>

          <div className="flex items-center gap-2 text-gray_dark">
            <p title="المشاهدات">{data?.visits || 0}</p>
            <BsEye title="المشاهدات" size={18} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 ">
            <h4 className="text-lg font-semibold">المفقود | {fullName}</h4>

            {data.nickname && (
              <p className="text-gray_dark">&quot; {data.nickname} &quot; </p>
            )}
          </div>

          {/* Share content button */}
          {data.status === MissingStatus.APPROVED && data && (
            <ShareButton data={data!} content_type={ContentType.STORY} />
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
                {dateConversion(data.birth_date as Date)}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                تاريخ الفقد
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                {dateConversion(data.missing_date as Date)}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                العمر
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                {getAgeLabel(data?.age as number)}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                مكان الفقد
              </td>
              <td className="py-3 px-4 border-b text-right text-sm">
                <div className="flex items-center gap-1">
                  <p>{data.location.city}</p>-
                  <p>{data.location.neighborhood}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8">
          <h2 className="font-bold text-lg">تفاصيل عن المفقود</h2>
          <p className="font-light text-md mt-2">{data.details}</p>
        </div>
      </div>
    </div>
  );
};

export default MissingDetails;
