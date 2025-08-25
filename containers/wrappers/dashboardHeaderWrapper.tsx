import { authOptions } from "@/app/lib/authOptions";
import DashboardHeader from "@/components/layout/dashboardHeader";
import { getServerSession } from "next-auth";

export default async function DashboardSidebarWrapper() {
  const session = await getServerSession(authOptions);

  return <DashboardHeader session={session} />;
}
