import { Schema, model, models } from "mongoose";
import { StoryInterface } from "../interfaces";
import { StoryStatus } from "../enums";

// Define the Martyr schema
const storySchema = new Schema<StoryInterface>(
  {
    id_number: {
      type: String,
      required: [true, "ID number is required and cannot be empty."],
      unique: true, // Ensure ID number is unique
    },

    name: {
      type: String,
      required: [true, "First name is required and cannot be empty."],
    },

    birth_date: {
      type: String,
      required: [true, "Birth date is required and cannot be empty."],
    },

    death_date: {
      type: String,
      required: [true, "Death date is required and cannot be empty."],
    },

    city: {
      type: String,
      required: [true, "City is required and cannot be empty."],
    },

    neighborhood: {
      type: String,
      required: [true, "Neighborhood is required and cannot be empty."],
    },

    bio: {
      type: String,
      required: [true, "Bio is required and cannot be empty."],
    },

    image: {
      type: String,
      required: [true, "Profile image is required and cannot be empty."],
    },

    publisher_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

    hasCompleteProfile: {
      type: Boolean,
      default: false,
    },

    rejectReason: {
      type: String,
      required: false,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(StoryStatus),
      default: StoryStatus.PENDING,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Story = models.Story || model<StoryInterface>("Story", storySchema);

export default Story;
