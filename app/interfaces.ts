import { Document, Types } from "mongoose";
import {
  ProviderTypes,
  DonationCampaignStatus,
  EventStatus,
  ReportReasons,
  ReportStatus,
  Role,
  StoryStatus,
  NotificationTypes,
} from "./enums";

// Define the User interface
export interface UserInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  id_number?: string;
  name: string;
  image: string;
  phone_number?: string;
  email: string;
  password?: string;
  role: Role;
  provider: ProviderTypes;
  favorites: StoryInterface[];
  notifications: NotificationInterface[];
  createdAt: Date;
}

// Define the Story interface
export interface StoryInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  id_number: string;
  name: string;
  nickname?: string;
  birth_date: string;
  death_date: string;
  city: string;
  neighborhood: string;
  bio: string;
  status: StoryStatus;
  image: string;
  publisher_id: Types.ObjectId | string; // Reference to User who made the add story request.
  hasCompleteProfile: boolean;
  keywords: string[];
  rejectReason?: string; // ✅ Optional field for rejected stories
  reports?: ReportInterface[];
  createdAt: Date;
}

// Define the Report interface
export interface ReportInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  reason: ReportReasons;
  details: string;
  content_id: Types.ObjectId | string; // Reference to the content that a user has reported.
  content: CommentInterface; // The content that has been reported, can be a Story or a Comment.
  user_id: Types.ObjectId | string; // Reference to the user who made the report.
  author_name?: string; // Name of the user who made the report.
  status: ReportStatus;
  createdAt: Date;
}

export interface ReportWithUserDataInterface extends ReportInterface {
  reporter_name: string;
  reporter_image: string;
  reporter_role: Role;

  reported_user_id?: string;
  reported_user_name?: string;
  reported_user_image?: string;
  reported_user_role?: Role;

  text?: string; // from content.text (for comments)
}

// Define the Comment interface
export interface CommentInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  author_id: Types.ObjectId | string; // Reference to the user who made the comment.
  author_name?: string;
  author_image?: string;
  text: string;
  story_id: Types.ObjectId | string; // Reference to the content that a user has made a comment on.
  author_role?: Role;
  createdAt: Date;
}

// Define the User Profile interface
export interface UserProfileInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  name: string;
  profile_image: string;
  submited_stories: StoryInterface[]; // Submitted stories, including: PENDING, APPROVED AND REJECTED stories.
  createdAt: Date;
}

// Define the Event interface
export interface EventInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
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
  _id: Types.ObjectId | string; // Unique identifier for the report.
  title: string;
  details: string;
  current_amount: number;
  goal_amount: number;
  status: DonationCampaignStatus;
  createdAt: Date;
}

// Define the Donation interface
export interface DonationInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  amount: number;
  donationCampaign_id: Types.ObjectId | string; // Reference to the Donation Campaign that a user has made a donation on.
  user_id: Types.ObjectId | string; // Reference to the user who made the donation.
  createdAt: Date;
}

// Define the Notification Interface
export interface NotificationInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  user_id: Types.ObjectId | string; // Reference to the user who will recieve the notification
  message: string;
  notification_type: NotificationTypes;
  href: string; // URL to redirect the user when they click on the notification
  is_read: boolean;
  createdAt: Date;
}

// Define the StoryNotification Interface
export interface StoryNotificationInterface extends NotificationInterface {
  notification_type: NotificationTypes.ACCEPT | NotificationTypes.REJECT;
}

// Define the CommentNotification Interface
export interface CommentNotificationInterface extends NotificationInterface {
  author_name: string; // Reference to the user who made the action [Adding a comment]
  author_id: Types.ObjectId | string; // Reference to the user who made the action [Adding a comment]
  notification_type: NotificationTypes.COMMENT;
}
