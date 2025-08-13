import { getSessionAction } from "@/app/actions/registerActions";
import DashboardHeader from "@/components/layout/dashboardHeader";

export default async function DashboardHeaderWrapper() {
  const session = await getSessionAction();
  return <DashboardHeader session={session} />; // Pass the session as a prop
}
