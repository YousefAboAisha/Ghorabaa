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
    is_read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel =
  models.Notification || model("Notification", baseSchema);

// COMMENT notification discriminator
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

// STORY (ACCEPT/REJECT) notification discriminator
const StoryNotificationSchema = new Schema({
  story_name: { type: String, required: true },
});

if (!NotificationModel.discriminators?.[NotificationTypes.ACCEPT]) {
  NotificationModel.discriminator(
    NotificationTypes.ACCEPT,
    StoryNotificationSchema
  );
}
if (!NotificationModel.discriminators?.[NotificationTypes.REJECT]) {
  NotificationModel.discriminator(
    NotificationTypes.REJECT,
    StoryNotificationSchema
  );
}

export { NotificationModel, CommentNotificationModel };
