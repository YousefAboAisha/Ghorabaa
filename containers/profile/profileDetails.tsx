import { getSessionAction } from "@/app/actions/registerActions";
import EditProfileForm from "@/components/UI/Forms/editProfileForm";
import { dateConversion, getRoleInArabic } from "@/conversions";
import Image from "next/image";

const ProfileDetails = async () => {
  const session = await getSessionAction(); // Fetch the session on the server
  const id = session?.user.id;

  const userDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/fetch/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch data");
    }

    return res.json();
  };
  const response = await userDetails();
  const { id_number, name, phone_number, email, image, role, createdAt } =
    response.data;

  return (
    <div className="flex-col md:flex md:flex-row gap-4 md:gap-4 mt-8">
      {/* Profile Card Details */}

      <EditProfileForm
        data={{
          name,
          id_number,
          phone_number,
        }}
      />

      <table className="h-full w-full md:min-w-fit md:w-fit md:mt-0 mt-8 rounded-t-lg ">
        <tbody className="bg-white h-full">
          <tr className="rounded-t-md">
            <td colSpan={2}>
              <div className="relative flex items-center justify-center bg-secondary p-6 rounded-t-md ">
                <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full border-2 p-[2px]">
                  <Image
                    src={image || "/notFound.png"}
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
              {name || "الاسم غير معرّف"}
            </td>
          </tr>

          <tr className="border">
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              البريد الالكتروني
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              {email || "البريد الالكتروني غير معرّف"}
            </td>
          </tr>

          <tr className="border">
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              صلاحية الحساب
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              {(role && getRoleInArabic(role)) || "صلاحية الحساب غير معرّفة"}
            </td>
          </tr>

          <tr className="border">
            <td className="py-3 px-4 text-right text-sm border-l">
              تاريخ الإنشاء
            </td>

            <td className="py-3 px-4 text-right text-sm">
              {(createdAt && dateConversion(new Date(createdAt))) ||
                "تاريخ الإنشاء غير معرّف"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetails;
