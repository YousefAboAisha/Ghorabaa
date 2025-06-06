// app/auth-redirect/page.tsx
import { redirect } from "next/navigation";
import { getSessionAction } from "../actions/registerActions";

export default async function AuthRedirect() {
  const session = await getSessionAction();

  // This is just a fallback - middleware should handle the redirect
  if (!session) {
    redirect("/signin");
  }

  // Show loading state while middleware processes
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting you to the appropriate dashboard...</p>
      </div>
    </div>
  );
}
