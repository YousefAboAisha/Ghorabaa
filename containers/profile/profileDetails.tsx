import { getSessionAction } from "@/app/actions/registerActions";
import { Role } from "@/app/enums";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import { arabicDateConversion } from "@/utils/format";
import { getRoleColor, getRoleInArabic } from "@/utils/text";
import { cookies } from "next/headers";
import Image from "next/image";
import EditProfileDetailsButton from "./editProfileDetailsButton";

type ProfileDetailsProps = {
  user_id: string;
};

const ProfileDetails = async ({ user_id }: ProfileDetailsProps) => {
  const cookieStore = await cookies(); // Access current cookies
  const session = await getSessionAction();
  const isAdmin = session?.user.role == Role.ADMIN;
  const isOwner = session?.user.id == user_id;

  const userDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/users/userDetails/fetch/${user_id}`,
      {
        headers: {
          Cookie: cookieStore.toString(), // ⬅️ Forward cookies
        },
        cache: "no-store",
      }
    );

    return res.json();
  };

  const { data, error } = await userDetails();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (data) {
    return (
      <div className="relative w-full bg-white border rounded-md min-h-[30vh] mb-6 p-4">
        {isOwner ? (
          <EditProfileDetailsButton
            data={{
              name: data.name,
              phone_number: data?.phone_number,
              id_number: data?.id_number,
              image: data?.image || "/notFound.png",
            }}
          />
        ) : null}

        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center w-full bg-secondary-pattern bg-fixed h-[25vh] rounded-md">
            <div className="relative flex items-center justify-center bg-white w-[120px] h-[120px] rounded-full translate-y-[12vh]">
              <Image
                src={data?.image || "/notFound.png"}
                fill
                alt="صورة الملف الشخصي"
                className="p-1 w-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="w-full flex flex-wrap items-stretch gap-4 mt-12">
            <div className="flex flex-col gap-2 items-center justify-center flex-1 flex-grow-1 bg-background_light rounded-md border p-6">
              <h2 className="text-sm font-semibold text-center">الاسم</h2>
              <p className="text-[13px] text-center">{data.name}</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center flex-1 flex-grow-1 bg-background_light rounded-md border p-6">
              <h2 className="text-sm font-semibold text-center">
                البريد الالكتروني
              </h2>
              <p className="text-[13px] text-center">{data.email}</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center flex-1 flex-grow-1 bg-background_light rounded-md border p-6">
              <h2 className="text-sm font-semibold text-center">رقم الهاتف</h2>
              <p className="text-[13px] text-center">{data.phone_number}</p>
            </div>

            {(isAdmin || isOwner) && (
              <div className="flex flex-col gap-2 items-center justify-center flex-1 flex-grow-1 bg-background_light rounded-md border p-6">
                <h2 className="text-sm font-semibold text-center">الصلاحية</h2>
                <p
                  style={{
                    backgroundColor: getRoleColor(data.role),
                  }}
                  className={`w-fit p-1.5 px-2.5 rounded-sm text-white text-[13px] text-center`}
                >
                  {getRoleInArabic(data.role)}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 items-center justify-center flex-1 flex-grow-1 bg-background_light rounded-md border p-6">
              <h2 className="text-sm font-semibold text-center">
                تاريخ الإنشاء
              </h2>
              <p className="text-[13px] text-center">
                {(data?.createdAt &&
                  arabicDateConversion(new Date(data.createdAt))) ||
                  "تاريخ الإنشاء غير معرّف"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileDetails;
