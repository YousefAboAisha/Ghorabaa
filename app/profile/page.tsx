import PageTitles from "@/components/UI/typography/pageTitles";
import ProfileDetails from "@/containers/profile/profileDetails";
import SubmittedStories from "@/containers/profile/submittedStories";

import React from "react";

const page = () => {
  return (
    <div className="container min-h-screen mt-24">
      <PageTitles first_title="الملف الشخصي" />
      <ProfileDetails />
      <SubmittedStories />
    </div>
  );
};

export default page;
