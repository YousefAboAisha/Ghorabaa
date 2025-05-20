import Navbar from "@/components/navbar";
import { getSessionAction } from "../../app/actions/registerActions";
import { SessionProps } from "@/app/interfaces";

export default async function NavbarWrapper() {
  const session: SessionProps | undefined =
    (await getSessionAction()) ?? undefined; // Fetch the session on the server

  console.log("session [sever]", session);

  return <Navbar session={session} />; // Pass the session as a prop
}
