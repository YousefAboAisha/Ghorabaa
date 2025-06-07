import StoryRequestsTable from "@/components/UI/tables/storyRequestsTable";

const StoryRequests = () => {
  return (
    <div className="relative">
      <div className="relative bg-white border min-h-[40vh] mt-4">
        <div className="abs-center text-center">
          <p>Line chart OR Pie chart</p>
          <p>
            يتم فيهم تحديد عدد القصص المقبولة في مدة زمنية معينة، ونسبة الإقبال
            على إضافة القصص
          </p>
        </div>
      </div>

      <div className="mt-12">
        <StoryRequestsTable />
      </div>
    </div>
  );
};

export default StoryRequests;
