import { getSessionAction } from "@/app/actions/registerActions";
import Sidebar from "@/containers/dashboard/sidebar";

export default async function SidebarWrapper() {
  const session = await getSessionAction();
  return <Sidebar session={session} />; // Pass the session as a prop
}
