// User Roles Enums
export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

// Story Status Enums
export enum StoryStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Report Status Enums
export enum ReportStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
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
  INCORRECT_INFORMATION = "INCORRECT_INFORMATION",
  MISSING_INFORMATION = "MISSING_INFORMATION",
}

// Notification Types Enums
export enum NotificationTypes {
  DONATION = "DONATION",
  BAN = "BAN",
  REJECT = "REJECT",
  ACCEPT = "ACCEPT",
  COMMENT = "COMMENT",
}
