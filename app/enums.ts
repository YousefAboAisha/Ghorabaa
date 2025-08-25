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
  MASSACRE = "MASSACRE",
  EVENT = "EVENT",
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
  DELETED = "DELETED",
  KEPT = "KEPT",
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
  REQUEST = "REQUEST",
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

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

// Massacre Status Enums
export enum MassacreStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ARCHIVED = "ARCHIVED",
}

// Event Status Enums
export enum EventStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ARCHIVED = "ARCHIVED",
}

export enum Profession {
  DOCTOR = "طبيب",
  ENGINEERING = "مهندس",
  JOURNALIST = "صحافي",
  TEACHER = "معلم",
  SCIENTIST = "عالِم",
  FORIGEN = "أجنبي",
  ATHLETE = "لاعب رياضي",
  NONE = "غير ذلك",
}

export enum IdNumberStatus {
  IDLE = "idle",
  CHECKING = "checking",
  VALID = "valid",
  INVALID = "invalid",
}
