// TypeScript types for college authentication system

export type StudentYear = 
  | "freshman"
  | "sophomore" 
  | "junior"
  | "senior"
  | "graduate"
  | "alumni";

export type DomainType = "primary" | "secondary" | "alumni";

export interface College {
  _id: string;
  name: string;
  email_domains: string[];
  logo_url?: string;
  active: boolean;
  location: string;
  website?: string;
  description?: string;
}

export interface EmailDomain {
  _id: string;
  domain: string;
  college_id: string;
  domain_type: DomainType;
  active: boolean;
}

export interface User {
  _id: string;
  userId: string; // Clerk user ID
  email: string;
  college_id?: string;
  email_verified: boolean;
  student_year?: StudentYear;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CollegeValidationResult {
  valid: boolean;
  message?: string;
  college?: {
    id: string;
    name: string;
    location: string;
    website?: string;
    logo_url?: string;
  };
  domain_type?: DomainType;
}

export interface CollegeInfo {
  id: string;
  name: string;
  location: string;
  website?: string;
  logo_url?: string;
  description?: string;
  domain_type?: DomainType;
}

export interface UserCollegeInfo {
  user: {
    email: string;
    email_verified: boolean;
    student_year?: StudentYear;
  };
  college: {
    id: string;
    name: string;
    location: string;
    website?: string;
    logo_url?: string;
    description?: string;
  };
}

export interface LinkUserResult {
  success: boolean;
  user_id: string;
  college_id: string;
}

export interface CollegeListItem {
  id: string;
  name: string;
  location: string;
  logo_url?: string;
} 
