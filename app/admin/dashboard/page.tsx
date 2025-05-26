import StoryRequestsTable from "@/containers/dashboard/tables/storyRequestsTable";

const Dashboard = () => {
  // if (error) return <p className="text-red-500">حدث خطأ: {error}</p>;

  return (
    <div className="relative">
      <div className="relative">
        <div className="relative mt-8">
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
                <div className="relative p-8 bg-secondary rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    إجمالي المقاعد
                  </h4>
                  <h2 className="text-7xl text-white">19</h2>
                </div>

                <div className="relative p-8 bg-[#c0392b] rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    المقاعد المحجوزة
                  </h4>
                  <h2 className="text-7xl text-white"></h2>
                </div>

                <div className="relative bg-[green] rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    المقاعد المتاحة
                  </h4>
                  <h2 className="text-7xl text-white"></h2>
                </div>

                <div className="relative p-8 bg-blue rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white">مشتركو اليوم</h4>
                  <h2 className="text-7xl text-white"></h2>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12">
            <StoryRequestsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
