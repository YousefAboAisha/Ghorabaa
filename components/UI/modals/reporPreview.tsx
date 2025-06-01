"use client";
import { ReportInterface } from "@/app/interfaces";
import React, { Dispatch, SetStateAction } from "react";

type ReportPreviewProps = {
  data: ReportInterface;
  refetchData?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};

const ReportPreview = ({ data }: ReportPreviewProps) => {
  console.log("Report data ", data);
  return <div className="relative p-8 flex flex-col gap-2"></div>;
};

export default ReportPreview;
