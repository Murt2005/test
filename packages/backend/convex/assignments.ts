import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

// Get all assignments for a specific user
export const getAssignments = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const assignments = await ctx.db
      .query("assignments")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return assignments;
  },
});

// Get assignments for a specific course
export const getAssignmentsByCourse = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const assignments = await ctx.db
      .query("assignments")
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .collect();

    return assignments;
  },
});

// Create a new assignment
export const createAssignment = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    dueDate: v.string(),
    status: v.union(v.literal("pending"), v.literal("in-progress"), v.literal("completed")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, { courseId, title, description, dueDate, status, priority }) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");
    
    const assignmentId = await ctx.db.insert("assignments", { 
      userId, 
      courseId, 
      title, 
      description, 
      dueDate, 
      status, 
      priority 
    });

    return assignmentId;
  },
});

// Update assignment status
export const updateAssignmentStatus = mutation({
  args: {
    id: v.id("assignments"),
    status: v.union(v.literal("pending"), v.literal("in-progress"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

// Delete an assignment
export const deleteAssignment = mutation({
  args: {
    assignmentId: v.id("assignments"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.assignmentId);
  },
}); 
