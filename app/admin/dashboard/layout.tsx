import "@/app/globals.css";
import DashboardHeaderWrapper from "@/containers/wrappers/dashboardHeaderWrapper";
import DashboardSidebarWrapper from "@/containers/wrappers/dashboardSidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <DashboardSidebarWrapper />
      <DashboardHeaderWrapper />

      <main className="min-h-screen p-8 mr-0 md:mr-56 mt-16 md:mt-4">{children}</main>
    </div>
  );
}
