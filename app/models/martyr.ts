import { Schema, model, models } from "mongoose";
import { MartyrInterface } from "@/app/interfaces";

// Define the Martyr schema
const martyrSchema = new Schema<MartyrInterface>(
  {
    id_number: {
      type: Number,
      required: [true, "ID number is required and cannot be empty."],
      unique: true, // Ensure ID number is unique
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
    neighbourhood: {
      type: String,
      required: [true, "Neighbourhood is required and cannot be empty."],
    },
    bio: {
      type: String,
      required: [true, "Bio is required and cannot be empty."],
    },
    status: {
      type: String,
      default: "0",
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Reference to Comment documents
      default: [], // Default value (empty array)
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Martyr = models.Martyr || model<MartyrInterface>("Martyr", martyrSchema);

export default Martyr;
