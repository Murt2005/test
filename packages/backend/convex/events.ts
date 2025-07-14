import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

// Get all events for a specific user
export const getUserEvents = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return events;
  },
});

// Get all public events
export const getPublicEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    return events;
  },
});

// Get events by type
export const getEventsByType = query({
  args: {
    type: v.union(v.literal("academic"), v.literal("social"), v.literal("campus")),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();

    return events;
  },
});

// Get all events for the current user, sorted by date ascending
export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("asc")
      .collect();
  },
});

// Create a new event
export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    location: v.string(),
    type: v.union(v.literal("academic"), v.literal("social"), v.literal("campus")),
    isPublic: v.boolean(),
  },
  handler: async (ctx, { title, description, date, location, type, isPublic }) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not found");
    
    const eventId = await ctx.db.insert("events", { 
      userId, 
      title, 
      description, 
      date, 
      location, 
      type, 
      isPublic 
    });

    return eventId;
  },
});

// Update an event
export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    type: v.optional(v.union(v.literal("academic"), v.literal("social"), v.literal("campus"))),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Delete an event
export const deleteEvent = mutation({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.eventId);
  },
}); 
