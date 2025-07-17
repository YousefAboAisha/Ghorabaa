import { model, models, Schema } from "mongoose";
import { MassacreInterface } from "../interfaces";

const MassacreSchema = new Schema<MassacreInterface>(
  {
    title: { type: String, required: true },
    cover_image: { type: String },
    date: { type: Date, required: true },
    location: {
      city: { type: String, required: true },
      neighborhood: { type: String },
    },
    visits: {
      type: Number,
      default: 0,
    },
    deaths: { type: Number },
    injuries: { type: Number },
    destroyedHouses: { type: Number },
    description: { type: String, required: true },
    media: [{ type: String }],
    tags: [{ type: String }],
    internationalReactions: [{ type: String }], // should be an array of strings
  },
  { timestamps: true }
);

const Massacre =
  models.Massacre || model<MassacreInterface>("Massacre", MassacreSchema);

export default Massacre;
