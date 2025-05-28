import "@/app/globals.css";
import DashboardSidebarWrapper from "@/containers/wrappers/dashboardSidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex h-full mt-0">
      <div className="relative w-[17%] min-h-screen">
        <DashboardSidebarWrapper />
      </div>
      <div className="w-[83%] min-h-screen p-8 mt-14">{children}</div>
    </div>
  );
}
