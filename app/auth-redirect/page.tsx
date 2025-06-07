// app/auth-redirect/page.tsx
import { redirect } from "next/navigation";
import { getSessionAction } from "../actions/registerActions";
import Logo from "@/components/UI/logo";

export default async function AuthRedirect() {
  const session = await getSessionAction();

  // This is just a fallback - middleware should handle the redirect
  if (!session) {
    redirect("/signin");
  }

  // Show loading state while middleware processes
  return (
    <div
      role="status"
      className={`abs-center fixed w-screen h-screen z-[100000] bg-[white]`}
    >
      <Logo className="animate-pulse text-lg abs-center" />
    </div>
  );
}
