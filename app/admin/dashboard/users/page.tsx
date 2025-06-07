import UsersTable from "@/components/UI/tables/usersTable";
import React from "react";

const Users = () => {
  return (
    <div className="relative">
      <div className="relative bg-white border min-h-[40vh] mt-4">
        <div className="abs-center text-center">
          <p>Line chart OR Pie chart</p>
          <p>
            توضيح عدد المستخدمين للمنصة ومدى الإقبال عليها ونسبة الزيادة فيها من
            ناحية المستخدمين
          </p>
        </div>
      </div>

      <div className="mt-12">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
