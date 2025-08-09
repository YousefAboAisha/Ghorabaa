import SigninForm from "@/components/UI/forms/signinForm";
import { Metadata } from "next";
import { SigninMetadata } from "../lib/metadata";

export const metadata: Metadata = SigninMetadata;

const Page = async () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SigninForm />
    </div>
  );
};

export default Page;
