import { Schema, model, models } from "mongoose";
import { UserInterface } from "../interfaces";
import { ProviderTypes, Role } from "../enums";

// Define the Martyr schema
const userSchema = new Schema<UserInterface>(
  {
    image: {
      type: String,
      required: [true, "Profile Image is required and cannot be empty."],
    },

    name: {
      type: String,
      required: [true, "User name is required and cannot be empty."],
    },

    phone_number: {
      type: String,
      required: false,
    },

    id_number: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required and cannot be empty."],
    },

    provider: {
      type: String,
      enum: Object.values(ProviderTypes),
      default: ProviderTypes.DEFAULT,
    },

    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story", // Must match the model name used for stories
      },
    ],

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
