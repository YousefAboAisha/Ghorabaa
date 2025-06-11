import ReportsTable from "@/components/UI/tables/reportsTable";

const Reports = () => {
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
        <ReportsTable />
      </div>
    </div>
  );
};

export default Reports;
