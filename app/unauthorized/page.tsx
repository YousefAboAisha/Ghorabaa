import Link from "next/link";

const Page = () => {
  return (
    <div className="relative container flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center">
        <h2 className="font-bold text-4xl">403</h2>
        <p className="text-4xl font-bold"> | </p>
        <p className="font-normal">غير مصرح لك</p>
      </div>

      <Link
        href={"/"}
        className="self-center text-[13px] text-primary mt-4 font-semibold hover:underline"
      >
        الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default Page;
