import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all courses (admin)
export const listAllCourses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("courses").collect();
  },
});

// Add a new course (admin)
export const addCourse = mutation({
  args: {
    college_id: v.id("colleges"),
    course_code: v.string(),
    name: v.string(),
    professor: v.string(),
    schedule: v.string(),
    location: v.string(),
    semester: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", args);
  },
});

// Update a course (admin)
export const updateCourse = mutation({
  args: {
    id: v.id("courses"),
    college_id: v.id("colleges"),
    course_code: v.string(),
    name: v.string(),
    professor: v.string(),
    schedule: v.string(),
    location: v.string(),
    semester: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return { success: true };
  },
});

// Delete a course (admin)
export const deleteCourse = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Search courses by course_code (case-insensitive, partial match)
export const searchCourses = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    if (!query.trim()) return [];
    const all = await ctx.db.query("courses").collect();
    return all.filter(c => c.course_code.toLowerCase().includes(query.toLowerCase()));
  },
});

// Enroll user in a course
export const enrollInCourse = mutation({
  args: { course_id: v.id("courses") },
  handler: async (ctx, { course_id }) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) throw new Error("Not signed in");
    // Prevent duplicate
    const existing = await ctx.db
      .query("user_courses")
      .filter(q => q.eq(q.field("user_id"), userId))
      .filter(q => q.eq(q.field("course_id"), course_id))
      .first();
    if (existing) return { alreadyEnrolled: true };
    await ctx.db.insert("user_courses", {
      user_id: userId,
      course_id,
      enrolled_date: new Date().toISOString(),
      grade: undefined,
    });
    return { success: true };
  },
});

// List all courses the current user is enrolled in (with course details)
export const myCourses = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];
    const userCourses = await ctx.db
      .query("user_courses")
      .filter(q => q.eq(q.field("user_id"), userId))
      .collect();
    const allCourses = await ctx.db.query("courses").collect();
    return userCourses.map(uc => ({
      ...uc,
      course: allCourses.find(c => c._id === uc.course_id),
    })).filter(uc => uc.course);
  },
});

// Get all assignments for the current user's enrolled courses (with course details)
export const myAssignments = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];
    const userCourses = await ctx.db
      .query("user_courses")
      .filter(q => q.eq(q.field("user_id"), userId))
      .collect();
    const courseIds = userCourses.map(uc => uc.course_id);
    const allAssignments = await ctx.db.query("assignments").collect();
    const allCourses = await ctx.db.query("courses").collect();
    return allAssignments
      .filter(a => courseIds.includes(a.course_id))
      .map(a => ({
        ...a,
        course: allCourses.find(c => c._id === a.course_id),
      }))
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  },
}); 
