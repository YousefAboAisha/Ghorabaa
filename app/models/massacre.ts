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
    deaths: { type: Number },
    injuries: { type: Number },
    destroyedHouses: { type: Number },
    description: { type: String, required: true },
    media: [{ type: String }],
    tags: [{ type: String }],
    internationalReactions: [{ type: String }], // should be an array of strings

    externalLinks: {
      wikipedia: {
        title: { type: String },
        href: { type: String },
      },
      alJazeera: {
        title: { type: String },
        href: { type: String },
      },
      stateOfPalestine: {
        title: { type: String },
        href: { type: String },
      },
    },
  },
  { timestamps: true }
);

const Massacre =
  models.Massacre || model<MassacreInterface>("Massacre", MassacreSchema);

export default Massacre;
