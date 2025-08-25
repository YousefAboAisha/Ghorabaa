import { authOptions } from "@/app/lib/authOptions";
import Navbar from "@/components/layout/navbar";
import { getServerSession } from "next-auth";

export default async function DashboardSidebarWrapper() {
  const session = await getServerSession(authOptions);

  return <Navbar session={session} />;
}
