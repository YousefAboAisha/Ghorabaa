import "@/app/globals.css";
import Header from "@/containers/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <Header />
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
}
