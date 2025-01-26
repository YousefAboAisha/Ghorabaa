import { Document } from "mongoose";

// Define the User interface
export interface MartyrInterface extends Document {
  id_number: number;
  first_name: string;
  father_name: string;
  grandfather_name: string;
  last_name: string;
  birth_date: string;
  death_date: string;
  city: string;
  neighbourhood: string;
  bio: string;
  status: string;
  createdAt: Date;
  comments: CommentInterface[]; // Array of subscription objects
}

// Define the SubscriptionInterface
export interface CommentInterface extends Document {
  author: string;
  comment_text: string;
  createdAt: Date;
}
