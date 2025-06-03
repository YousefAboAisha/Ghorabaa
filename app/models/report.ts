import { Schema, model, models } from "mongoose";
import { ReportReasons, ReportStatus } from "../enums";
import { ReportInterface } from "../interfaces";

// Define the Martyr schema
const reportSchema = new Schema<ReportInterface>(
  {
    reason: {
      type: String,
      enum: Object.values(ReportReasons),
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    content_id: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ReportStatus),
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Report = models.Report || model<ReportInterface>("Report", reportSchema);

export default Report;
