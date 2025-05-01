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

    profile_image: {
      type: String,
      required: [true, "Profile image is required and cannot be empty."],
    },

    first_name: {
      type: String,
      required: [true, "First name is required and cannot be empty."],
    },

    father_name: {
      type: String,
      required: [true, "Father's name is required and cannot be empty."],
    },

    grandfather_name: {
      type: String,
      required: [true, "Grandfather's name is required and cannot be empty."],
    },

    last_name: {
      type: String,
      required: [true, "Last name is required and cannot be empty."],
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

    related_images: {
      type: [],
    },

    publisher_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

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
