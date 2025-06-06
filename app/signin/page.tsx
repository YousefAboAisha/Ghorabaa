import SigninForm from "@/components/UI/Forms/signinForm";
import { getSessionAction } from "../actions/registerActions";

const Signin = async () => {
  const session = await getSessionAction();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SigninForm session={session} />
    </div>
  );
};

export default Signin;
