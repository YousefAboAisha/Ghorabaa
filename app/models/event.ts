import { Schema, model, models } from "mongoose";
import { EventInterface } from "../interfaces";
import { EventStatus } from "../enums";

// Define the Event schema
const eventSchema = new Schema<EventInterface>(
  {
    title: {
      type: String,
      required: [true, "Event Title is required and cannot be empty."],
    },

    details: {
      type: String,
      required: [true, "Event Details are required and cannot be empty."],
    },

    location: {
      type: String,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(EventStatus),
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Event = models.Event || model<EventInterface>("Event", eventSchema);

export default Event;
