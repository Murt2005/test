export interface College {
  id: string;
  name: string;
  location: string;
  logo_url?: string;
  website?: string;
  description?: string;
}

export interface User {
  email: string;
  email_verified: boolean;
  student_year?: StudentYear;
  first_name?: string;
  last_name?: string;
}

export type StudentYear = "freshman" | "sophomore" | "junior" | "senior" | "graduate" | "alumni";

export interface UserCollegeInfo {
  user: User;
  college: College;
}

export interface QuickStatsData {
  upcomingClasses: number;
  unreadMessages: number;
  diningHours: string;
}

export interface NavigationCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface CollegeAnnouncement {
  id: number;
  title: string;
  content: string;
  type: "important" | "alert" | "info";
  date: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PersonalizedWidget {
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  textColor: string;
}

export interface YearSpecificContent {
  title: string;
  description: string;
  widgets: PersonalizedWidget[];
}

export interface CollegeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface DashboardStats {
  totalCourses: number;
  upcomingAssignments: number;
  unreadMessages: number;
  diningHours: string;
  campusEvents: number;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: "academic" | "social" | "campus";
  isPublic: boolean;
}

export interface Course {
  _id: string;
  userId: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  semester: string;
  year: number;
}

export interface Assignment {
  _id: string;
  userId: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
} 
