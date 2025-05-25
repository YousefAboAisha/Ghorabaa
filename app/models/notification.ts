import { Schema, model, models } from "mongoose";
import { NotificationInterface } from "../interfaces";
import { NotificationTypes } from "../enums";

const baseSchema = new Schema<NotificationInterface>(
  {
    title: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    story_id: { type: Schema.Types.ObjectId, ref: "Story", required: true },
    notification_type: {
      type: String,
      enum: Object.values(NotificationTypes),
      required: true,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure base model is only created once
const NotificationModel =
  models.Notification || model("Notification", baseSchema);

// Avoid redefining discriminators
const CommentNotificationSchema = new Schema({
  author_name: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

let CommentNotificationModel;
if (!NotificationModel.discriminators?.[NotificationTypes.COMMENT]) {
  CommentNotificationModel = NotificationModel.discriminator(
    NotificationTypes.COMMENT,
    CommentNotificationSchema
  );
} else {
  CommentNotificationModel =
    NotificationModel.discriminators[NotificationTypes.COMMENT];
}

export { NotificationModel, CommentNotificationModel };
