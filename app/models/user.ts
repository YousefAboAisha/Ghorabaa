import { Schema, model, models } from "mongoose";
import { UserInterface } from "../interfaces";
import { Role } from "../enums";

// Define the Martyr schema
const userSchema = new Schema<UserInterface>(
  {
    profile_image: {
      type: String,
      required: [true, "Profile Image is required and cannot be empty."],
    },

    name: {
      type: String,
      required: [true, "User name is required and cannot be empty."],
    },

    email: {
      type: String,
      required: [true, "Email is required and cannot be empty."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required and cannot be empty."],
    },

    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const User = models.User || model<UserInterface>("User", userSchema);

export default User;
