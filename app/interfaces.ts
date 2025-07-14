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
  Gender,
} from "./enums";

// Define the User interface
export interface UserInterface extends Document {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  id_number?: string;
  name: string;
  highlight: Highlight[];
  image: string;
  phone_number?: string;
  email: string;
  isVerified: boolean; // Indicates if the user has verified their email.
  password?: string;
  role: Role;
  provider: ProviderTypes;
  favorites: StoryInterface[];
  createdAt: Date;
}

export interface ActiveUserInterface {
  user_id: string;
  name: string;
  email: string;
  image?: string;
  stories: number;
  comments: number;
  total: number;
}

// Define the Story interface
export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  x?: string;
}

export type Highlight = {
  path: string; // field name (e.g., "name", "bio")
  texts: {
    value: string; // the actual text fragment
    type: "text" | "hit"; // "hit" = matched part, "text" = normal part
  }[];
};

export interface StoryInterface extends Document {
  _id: Types.ObjectId | string;
  id_number: string;
  gender: Gender;
  name: string;
  highlight: Highlight[];
  social_media?: SocialMediaLinks;
  nickname?: string;
  birth_date: string;
  death_date: string;
  age: number;
  visits: number;
  city: string;
  neighborhood: string;
  bio: string;
  status: StoryStatus;
  image: string;
  publisher_id: Types.ObjectId | string;
  keywords: string[];
  rejectReason?: string;
  reports?: ReportInterface[];
  createdAt: Date;
  updatedAt?: Date;
  effectiveDate?: Date; // The date used for sorting and filtering, can be updated to the latest update date if available.
}

export interface TrendingStoryInterface {
  story_id: string;
  name: string;
  age: number;
  image?: string;
  visits: number;
  comments: number;
  total: number;
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

// Define the storyStatistics interface
export interface allStoriesStatisticsInterface {
  [StoryStatus.APPROVED]: {
    today: number;
    week: number;
    month: number;
    total: number;
  };

  [StoryStatus.PENDING]: {
    today: number;
    week: number;
    month: number;
    total: number;
  };

  [StoryStatus.REJECTED]: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
}

export interface MassacreInterface {
  _id: Types.ObjectId | string; // Unique identifier for the report.
  title: string;
  cover_image: string;
  date: string | Date;
  location: {
    city: string;
    neighborhood?: string;
  };
  deaths: number;
  injuries: number;
  destroyedHouses: number;
  description: string;
  media: string[];
  tags?: string[];
  externalLinks: {
    wikipedia: {
      title: string;
      href: string;
    };

    alJazeera: {
      title: string;
      href: string;
    };

    stateOfPalestine: {
      title: string;
      href: string;
    };
  };
  internationalReactions?: string[];
  visits?: number;
  createdAt: Date;
}
