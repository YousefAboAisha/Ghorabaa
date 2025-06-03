// User Roles Enums
export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

// Conntent Types Enums
export enum ContentType {
  STORY = "STORY", // for stories
  COMMENT = "COMMENT", // for comments
}

// Story Status Enums
export enum StoryStatus {
  IMPORTED = "IMPORTED", // default for newly imported stories
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Report Status Enums
export enum ReportStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

// Event Status Enums
export enum EventStatus {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

// Donation Campaigns status Enums
export enum DonationCampaignStatus {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

// Reort Reasons Enums
export enum ReportReasons {
  DISRESPECT = "DISRESPECT",
  HATE_SPEECH = "HATE_SPEECH",
  MISINFORMATION = "MISINFORMATION",
  VIOLENCE = "VIOLENCE",
  HARASSMENT = "HARASSMENT",
  POLITICAL_PROVOCATION = "POLITICAL_PROVOCATION",
  EXTREMISM = "EXTREMISM",
  SEXUAL_CONTENT = "SEXUAL_CONTENT",
  IMPERSONATION = "IMPERSONATION",
  PRIVACY_VIOLATION = "PRIVACY_VIOLATION",
  SPAM = "SPAM",
  OTHER = "OTHER",
}

// Notification Types Enums
export enum NotificationTypes {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  COMMENT = "COMMENT",
  DONATION = "DONATION",
  BAN = "BAN",
}

// Account Providers Enums
export enum ProviderTypes {
  GOOGLE = "google",
  DEFAULT = "default",
}
