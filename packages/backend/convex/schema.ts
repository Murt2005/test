import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // College email authentication tables
  colleges: defineTable({
    name: v.string(),
    email_domains: v.array(v.string()),
    logo_url: v.optional(v.string()),
    active: v.boolean(),
    location: v.string(),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
  }),
  
  email_domains: defineTable({
    domain: v.string(),
    college_id: v.id("colleges"),
    domain_type: v.union(v.literal("primary"), v.literal("secondary"), v.literal("alumni")),
    active: v.boolean(),
  }),
  
  users: defineTable({
    userId: v.string(), // Clerk user ID
    email: v.string(),
    college_id: v.optional(v.id("colleges")),
    email_verified: v.boolean(),
    student_year: v.optional(v.union(
      v.literal("freshman"),
      v.literal("sophomore"), 
      v.literal("junior"),
      v.literal("senior"),
      v.literal("graduate"),
      v.literal("alumni")
    )),
    profile_image: v.optional(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  }),
  
  // College course management tables
  courses: defineTable({
    college_id: v.id("colleges"),
    course_code: v.string(),
    name: v.string(),
    professor: v.string(),
    schedule: v.string(), // e.g. "MWF 10:00-11:00"
    location: v.string(),
    semester: v.string(), // e.g. "Fall 2024"
  }),
  user_courses: defineTable({
    user_id: v.string(),
    course_id: v.id("courses"),
    enrolled_date: v.string(),
    grade: v.optional(v.string()),
  }),
  assignments: defineTable({
    course_id: v.id("courses"),
    title: v.string(),
    due_date: v.string(),
    description: v.string(),
    points: v.number(),
  }),
  
  events: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    date: v.string(),
    location: v.string(),
    type: v.union(v.literal("academic"), v.literal("social"), v.literal("campus")),
    isPublic: v.boolean(),
  }),
  
  studyGroups: defineTable({
    name: v.string(),
    description: v.string(),
    courseId: v.optional(v.id("courses")),
    creatorId: v.string(),
    members: v.array(v.string()),
    maxMembers: v.number(),
    meetingTime: v.string(),
    location: v.string(),
  }),
  
  posts: defineTable({
    userId: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    likes: v.array(v.string()),
    comments: v.array(v.object({
      userId: v.string(),
      content: v.string(),
      timestamp: v.string(),
    })),
    timestamp: v.string(),
  }),
});
