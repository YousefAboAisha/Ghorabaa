import { Schema, model, models } from "mongoose";
import { DonationCampaignInterface } from "../interfaces";
import { DonationCampaignStatus } from "../enums";

// Define the DonationCampaign schema
const donationCampaignSchema = new Schema<DonationCampaignInterface>(
  {
    title: {
      type: String,
      required: [
        true,
        "DonationCampaign Title is required and cannot be empty.",
      ],
    },

    details: {
      type: String,
      required: [
        true,
        "DonationCampaign Details are required and cannot be empty.",
      ],
    },

    current_amount: {
      type: Number,
      required: true,
    },

    goal_amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(DonationCampaignStatus),
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const DonationCampaign =
  models.DonationCampaign ||
  model<DonationCampaignInterface>("DonationCampaign", donationCampaignSchema);

export default DonationCampaign;
