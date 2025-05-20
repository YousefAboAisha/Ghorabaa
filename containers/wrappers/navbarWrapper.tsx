import Navbar from "@/components/navbar";
import { getSessionAction } from "../../app/actions/registerActions";

export default async function NavbarWrapper() {
  const session = await getSessionAction(); // Fetch the session on the server

  console.log("session [sever]", session);

  return <Navbar session={session} />; // Pass the session as a prop
}
