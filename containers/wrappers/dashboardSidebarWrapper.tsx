import { getSessionAction } from "@/app/actions/registerActions";
import DashboardSidebar from "@/components/layout/dashboardSidebar";

export default async function DashboardSidebarWrapper() {
  const session = await getSessionAction();
  return <DashboardSidebar session={session} />; // Pass the session as a prop
}
