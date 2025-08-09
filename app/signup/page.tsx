import SignupForm from "@/components/UI/forms/signupForm";
import { Metadata } from "next";
import { SignupMetadata } from "../lib/metadata";

export const metadata: Metadata = SignupMetadata;

const Page = async () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default Page;
