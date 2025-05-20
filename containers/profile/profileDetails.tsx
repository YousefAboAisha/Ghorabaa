import { getSessionAction } from "@/app/actions/registerActions";
import { dateConversion, getRoleInArabic } from "@/conversions";
import Image from "next/image";

const ProfileDetails = async () => {
  const session = await getSessionAction(); // Fetch the session on the server
  // const id = session?.user.id;

  // const userDetails = async () => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/fetch/${id}`,
  //     {
  //       cache: "no-store",
  //     }
  //   );

  //   if (!res.ok) {
  //     console.log("Failed to fetch data");
  //   }

  //   return res.json();
  // };
  // const response = await userDetails();
  // const { name, email, image, role, createdAt } = response.data;

  const userSession = session?.user;

  return (
    <div className="flex-col md:flex md:flex-row gap-4 md:gap-4 mt-8">
      {/* Profile Card Details */}

      <div className="relative w-full bg-white p-4 border"></div>

      <table className="h-full w-full md:min-w-fit md:w-fit border md:mt-0 mt-8">
        <tbody className="bg-white h-full">
          <tr>
            <td colSpan={2}>
              <div className="relative flex items-center justify-center bg-secondary p-6">
                <div className="w-[100px] h-[100px] rounded-full border-2 p-[2px]">
                  <Image
                    src={userSession?.image || "/notFound.png"}
                    width={100}
                    height={100}
                    alt="صورة الملف الشخصي"
                    className="rounded-full"
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              الاسم
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              {userSession?.name}
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              البريد الالكتروني
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              {userSession?.email}
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              صلاحية الحساب
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              {userSession?.role && getRoleInArabic(userSession?.role)}
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              تاريخ الإنشاء
            </td>

            <td className="py-3 px-4 border-b text-right text-sm">
              {userSession?.createdAt &&
                dateConversion(new Date(userSession.createdAt))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetails;
