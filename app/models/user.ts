import { Schema, model, models } from "mongoose";
import { UserInterface } from "../interfaces";
import { Role } from "../enums";

// Define the Martyr schema
const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "ID number is required and cannot be empty."],
      unique: true, // Ensure ID number is unique
    },

    email: {
      type: String,
      required: [true, "Profile image is required and cannot be empty."],
    },

    password: {
      type: String,
      required: [true, "First name is required and cannot be empty."],
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
