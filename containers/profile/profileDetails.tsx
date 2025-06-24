import ErrorMessage from "@/components/responseMessages/errorMessage";
import EditProfileForm from "@/components/UI/Forms/editProfileForm";
import { dateConversion } from "@/utils/format";
import { getRoleColor, getRoleInArabic } from "@/utils/text";
import { cookies } from "next/headers";
import Image from "next/image";

const ProfileDetails = async () => {
  const cookieStore = await cookies(); // Access current cookies

  const userDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/users/userDetails/fetch`,
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
      <div className="flex-col md:flex md:flex-row gap-4 md:gap-4">
        {/* Profile Card Details */}

        <EditProfileForm
          data={{
            name: data?.name,
            id_number: data?.id_number,
            phone_number: data?.phone_number,
          }}
        />

        <table className="h-full w-full md:min-w-fit md:w-fit md:mt-0 mt-8 rounded-t-lg">
          <tbody className="bg-white h-full">
            <tr className="rounded-t-md">
              <td colSpan={2}>
                <div className="relative flex items-center justify-center bg-secondary p-6 rounded-t-md ">
                  <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full border-2 p-[2px]">
                    <Image
                      src={data?.image || "/notFound.png"}
                      width={100}
                      height={100}
                      alt="صورة الملف الشخصي"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr className="border">
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                الاسم
              </td>

              <td className="py-3 px-4 border-b text-right text-sm ">
                {data?.name || "الاسم غير معرّف"}
              </td>
            </tr>

            <tr className="border">
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                البريد الالكتروني
              </td>

              <td className="py-3 px-4 border-b text-right text-sm ">
                {data?.email || "البريد الالكتروني غير معرّف"}
              </td>
            </tr>

            <tr className="border">
              <td className="py-3 px-4 border-b text-right text-sm border-l">
                صلاحية الحساب
              </td>

              <td className="py-3 px-4 border-b text-right">
                <p
                  style={{
                    backgroundColor: getRoleColor(data?.role),
                  }}
                  className={`w-fit p-1.5 px-2.5 rounded-sm text-white text-[13px]`}
                >
                  {getRoleInArabic(data?.role)}
                </p>
              </td>
            </tr>

            <tr className="border">
              <td className="py-3 px-4 text-right text-sm border-l">
                تاريخ الإنشاء
              </td>

              <td className="py-3 px-4 text-right text-sm">
                {(data?.createdAt &&
                  dateConversion(new Date(data.createdAt))) ||
                  "تاريخ الإنشاء غير معرّف"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default ProfileDetails;
