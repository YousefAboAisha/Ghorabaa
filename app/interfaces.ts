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
  image: string;
  name: string;
  phone_number?: string;
  id_number?: string;
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
  id_number: string;
  name: string;
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
  createdAt: Date;
}

// Define the Report interface
export interface ReportInterface extends Document {
  reason: ReportReasons;
  status: ReportStatus;
  content_id: Types.ObjectId | string; // Reference to the content that a user has reported.
  user_id: Types.ObjectId | string; // Reference to the user who made the report.
  message: string;
  createdAt: Date;
}

// Define the Comment interface
export interface CommentInterface extends Document {
  author_name?: string;
  author_image?: string;
  text: string;
  user_id: Types.ObjectId | string; // Reference to the user who made the comment.
  story_id: Types.ObjectId | string; // Reference to the content that a user has made a comment on.
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
  donationCampaign_id: Types.ObjectId | string; // Reference to the Donation Campaign that a user has made a donation on.
  user_id: Types.ObjectId | string; // Reference to the user who made the donation.
  createdAt: Date;
}

// Define the Notification Interface
export interface NotificationInterface extends Document {
  user_id: Types.ObjectId | string; // Reference to the user who will recieve the notification
  title: string;
  notification_type: NotificationTypes;
  story_id: Types.ObjectId | string; // Reference to the story which the user have made comment on OR it has been [APPROVED | REJECTED ]
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
