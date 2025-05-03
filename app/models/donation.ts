import { Schema, model, models } from "mongoose";
import { DonationInterface } from "../interfaces";

// Define the Donation schema
const donationSchema = new Schema<DonationInterface>(
  {
    amount: {
      type: Number,
      required: [true, "Donation amount is required and cannot be empty."],
    },

    donationCampaign_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Donation",
    },

    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Donation =
  models.Donation || model<DonationInterface>("Donation", donationSchema);

export default Donation;
