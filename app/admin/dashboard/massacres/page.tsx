import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <Link href={"admin/dashboard/massacres/addMassacre"}>
      إضافة مجزرة جديدة
    </Link>
  );
};

export default Page;
