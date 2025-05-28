import StoryRequestsTable from "@/containers/dashboard/tables/storyRequestsTable";

const Dashboard = () => {
  return (
    <div className="relative mt-20">
      {!1 ? (
        <div className="cards-grid-4">
          <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      ) : (
        <div>
          <div className="cards-grid-4 mt-6">
            <div className="relative p-8 bg-[orange] rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-white font-semibold">
                طلبات الإضافة
              </h4>
              <h2 className="text-7xl text-white font-semibold">4</h2>
            </div>

            <div className="relative p-8 bg-[green] rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-white font-semibold">تم القبول</h4>
              <h2 className="text-7xl text-white font-semibold">5</h2>
            </div>

            <div className="relative p-8 bg-[red] rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-white font-semibold">تم الرفض</h4>
              <h2 className="text-7xl text-white font-semibold">10</h2>
            </div>

            <div className="relative p-8 bg-secondary rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-white">كافة القصص</h4>
              <h2 className="text-7xl text-white font-semibold">19</h2>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <StoryRequestsTable />
      </div>
    </div>
  );
};

export default Dashboard;
