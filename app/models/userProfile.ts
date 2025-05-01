import { Schema, model, models } from "mongoose";
import { UserProfileInterface } from "@/app/interfaces";

// Define the UserProfile schema
const userProfileSchema = new Schema<UserProfileInterface>(
  {
    name: {
      type: String,
      required: [true, "Name is required and cannot be empty."],
    },

    profile_image: {
      type: String,
      required: true,
    },

    submited_stories: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const UserProfile =
  models.UserProfile ||
  model<UserProfileInterface>("UserProfile", userProfileSchema);

export default UserProfile;
