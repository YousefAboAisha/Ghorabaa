import React from "react";
import { Metadata } from "next";
import { AddMissingFormMetadata } from "../lib/metadata";
import MissingForm from "@/components/UI/forms/missingForm";

export const metadata: Metadata = AddMissingFormMetadata;

const Page = () => {
  return (
    <div className="container md:w-1/2 mx-auto flex flex-col items-center justify-center min-h-screen mt-28">
      <MissingForm />
    </div>
  );
};

export default Page;
