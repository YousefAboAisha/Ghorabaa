import { Document, Types } from "mongoose";
import {
  DonationCampaignStatus,
  EventStatus,
  ReportReasons,
  ReportStatus,
  Role,
  StoryStatus,
} from "./enums";

// Define the User interface
export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}

// Define the Story interface
export interface StoryInterface extends Document {
  id_number: string;
  profile_image: string;
  first_name: string;
  father_name: string;
  grandfather_name: string;
  last_name: string;
  birth_date: string;
  death_date: string;
  city: string;
  neighborhood: string;
  bio: string;
  related_images: string[];
  status: StoryStatus;
  publisher_id: Types.ObjectId; // Reference to User who made the add story request.
  createdAt: Date;
}

// Define the Report interface
export interface ReportInterface extends Document {
  reason: ReportReasons;
  status: ReportStatus;
  content_id: Types.ObjectId; // Reference to the content that a user has reported.
  user_id: Types.ObjectId; // Reference to the user who made the report.
  createdAt: Date;
}

// Define the Comment interface
export interface CommentInterface extends Document {
  text: string;
  user_id: Types.ObjectId; // Reference to the user who made the comment.
  story_id: Types.ObjectId; // Reference to the content that a user has made a comment on.
  createdAt: Date;
}

// Define the User Profile interface
export interface UserProfileInterface extends Document {
  name: string;
  profile_image: string;
  submited_stories: StoryInterface[]; // Submitted stories, including: PENDING, APPROVED AND REJECTED stories.
  createdAt: Date;
}

// Define the Event interface
export interface EventInterface extends Document {
  title: string;
  details: string;
  location: string;
  start_date: Date;
  end_date: Date;
  status: EventStatus;
  createdAt: Date;
}

// Define the Donation Campaign interface
export interface DonationCampaignInterface extends Document {
  title: string;
  details: string;
  current_amount: number;
  goal_amount: number;
  status: DonationCampaignStatus;
  createdAt: Date;
}

// Define the Donation interface
export interface DonationInterface extends Document {
  amount: number;
  donationCampaign_id: Types.ObjectId; // Reference to the Donation Campaign that a user has made a donation on.
  user_id: Types.ObjectId; // Reference to the user who made the donation.
  createdAt: Date;
}
