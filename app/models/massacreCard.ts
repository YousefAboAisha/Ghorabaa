import { model, models, Schema } from "mongoose";
import { MassacreInterface } from "../interfaces";

const MassacreSchema = new Schema<MassacreInterface>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      city: { type: String, required: true },
      neighborhood: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    deathToll: {
      men: { type: Number },
      women: { type: Number },
      children: { type: Number },
      total: { type: Number, required: true },
    },
    injuries: {
      total: { type: Number },
      severe: { type: Number },
    },
    displacedFamilies: { type: Number },
    damage: {
      homes: { type: Number },
      schools: { type: Number },
      hospitals: { type: Number },
      mosques: { type: Number },
    },
    description: { type: String, required: true },
    perpetrator: { type: String },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio"],
          required: true,
        },
        url: { type: String, required: true },
        caption: { type: String },
      },
    ],
    tags: [{ type: String }],
    internationalReactions: { type: String },
  },
  { timestamps: true }
);

const Massacre =
  models.Massacre || model<MassacreInterface>("Massacre", MassacreSchema);

export default Massacre;
