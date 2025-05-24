import { Schema, model, models } from "mongoose";
import { CommentInterface } from "@/app/interfaces";
import { Role } from "../enums";

// Define the Comment schema
const commentSchema = new Schema<CommentInterface>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    author_name: {
      type: String,
      required: [true, "Comment author name is required and cannot be empty."],
    },

    author_image: {
      type: String,
      required: [true, "Comment autohr image is required and cannot be empty."],
    },

    text: {
      type: String,
      required: [true, "Comment text is required and cannot be empty."],
    },

    story_id: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },

    author_role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const Comment =
  models.Comment || model<CommentInterface>("Comment", commentSchema);

export default Comment;
