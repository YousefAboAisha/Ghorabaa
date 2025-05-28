import "@/app/globals.css";
import SidebarWrapper from "@/containers/wrappers/sidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex h-full mt-0">
      <div className="relative w-[17%] min-h-screen">
        <SidebarWrapper />
      </div>
      <div className="w-[83%] min-h-screen p-8">{children}</div>
    </div>
  );
}
