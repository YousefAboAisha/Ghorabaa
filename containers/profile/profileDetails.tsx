import Image from "next/image";

const ProfileDetails = () => {
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
                    src={"/me.png"}
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
              يوسف رشاد ابو عيشة
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              رقم الهوية
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              407709260
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              البريد الالكتروني
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              yousef.aboesha@hotmail.com
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              رقم الهاتف
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              0592551405
            </td>
          </tr>

          <tr>
            <td className="py-3 px-4 border-b text-right text-sm border-l">
              تاريخ الإنشاء
            </td>

            <td className="py-3 px-4 border-b text-right text-sm ">
              25 فبراير 2025
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetails;
