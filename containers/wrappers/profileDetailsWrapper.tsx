"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import ProfileDetails from "../profile/profileDetails";
import SubmittedStories from "../profile/submittedStories";
import RecentComments from "../profile/recentComments";

type Props = {
  id: string;
};

const ProfileDetailsWrapper = ({ id }: Props) => {
  return (
    <SessionProvider>
      <div className="container min-h-screen mt-28">
        <ProfileDetails user_id={id} />
        <SubmittedStories user_id={id} />
        <RecentComments user_id={id} />
      </div>
    </SessionProvider>
  );
};

export default ProfileDetailsWrapper;
