import { Schema, model, models } from "mongoose";
import { ContactMessageInterface } from "../interfaces";

// Define the ContactMessage schema
const contactMessageSchema = new Schema<ContactMessageInterface>(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const ContactMessage =
  models.ContactMessage ||
  model<ContactMessageInterface>("ContactMessage", contactMessageSchema);

export default ContactMessage;
