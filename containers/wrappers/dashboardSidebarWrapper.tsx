import { authOptions } from "@/app/lib/authOptions";
import DashboardSidebar from "@/components/layout/dashboardSidebar";
import { getServerSession } from "next-auth";

export default async function DashboardSidebarWrapper() {
  const session = await getServerSession(authOptions);

  return <DashboardSidebar session={session} />;
}
