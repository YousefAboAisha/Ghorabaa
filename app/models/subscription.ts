import { Schema, model, models } from "mongoose";
import { CommentInterface } from "@/app/interfaces";

// Define the Comment schema
const commentSchema = new Schema<CommentInterface>(
  {
    author: {
      type: String,
      required: [true, "Author is required and cannot be empty."],
    },
    comment_text: {
      type: String,
      required: [true, "Comment text is required and cannot be empty."],
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
