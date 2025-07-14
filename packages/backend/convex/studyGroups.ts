import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

// Get all study groups
export const getStudyGroups = query({
  args: {},
  handler: async (ctx) => {
    const studyGroups = await ctx.db
      .query("studyGroups")
      .collect();

    return studyGroups;
  },
});

// Get study groups by course
export const getStudyGroupsByCourse = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const studyGroups = await ctx.db
      .query("studyGroups")
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .collect();

    return studyGroups;
  },
});

// Get study groups where user is a member
export const getUserStudyGroups = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const studyGroups = await ctx.db
      .query("studyGroups")
      .filter((q) => q.field("members").includes(userId))
      .collect();

    return studyGroups;
  },
});

// Create a new study group
export const createStudyGroup = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    courseId: v.optional(v.id("courses")),
    maxMembers: v.number(),
    meetingTime: v.string(),
    location: v.string(),
  },
  handler: async (ctx, { name, description, courseId, maxMembers, meetingTime, location }) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");
    
    const studyGroupId = await ctx.db.insert("studyGroups", { 
      name, 
      description, 
      courseId, 
      creatorId: userId, 
      members: [userId], 
      maxMembers, 
      meetingTime, 
      location 
    });

    return studyGroupId;
  },
});

// Join a study group
export const joinStudyGroup = mutation({
  args: {
    studyGroupId: v.id("studyGroups"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");

    const studyGroup = await ctx.db.get(args.studyGroupId);
    if (!studyGroup) throw new Error("Study group not found");

    if (studyGroup.members.includes(userId)) {
      throw new Error("User is already a member");
    }

    if (studyGroup.members.length >= studyGroup.maxMembers) {
      throw new Error("Study group is full");
    }

    await ctx.db.patch(args.studyGroupId, {
      members: [...studyGroup.members, userId],
    });
  },
});

// Leave a study group
export const leaveStudyGroup = mutation({
  args: {
    studyGroupId: v.id("studyGroups"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");

    const studyGroup = await ctx.db.get(args.studyGroupId);
    if (!studyGroup) throw new Error("Study group not found");

    if (!studyGroup.members.includes(userId)) {
      throw new Error("User is not a member");
    }

    await ctx.db.patch(args.studyGroupId, {
      members: studyGroup.members.filter((member) => member !== userId),
    });
  },
});

// Delete a study group (only creator can delete)
export const deleteStudyGroup = mutation({
  args: {
    studyGroupId: v.id("studyGroups"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");

    const studyGroup = await ctx.db.get(args.studyGroupId);
    if (!studyGroup) throw new Error("Study group not found");

    if (studyGroup.creatorId !== userId) {
      throw new Error("Only the creator can delete the study group");
    }

    await ctx.db.delete(args.studyGroupId);
  },
}); 
