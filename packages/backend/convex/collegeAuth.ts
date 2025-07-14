import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

// Validate if an email domain exists in our college registry
export const validateCollegeEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    // Extract domain from email
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) {
      return { valid: false, message: "Invalid email format" };
    }

    // Check if domain exists in email_domains table
    const emailDomain = await ctx.db
      .query("email_domains")
      .filter((q) => q.eq(q.field("domain"), domain))
      .filter((q) => q.eq(q.field("active"), true))
      .first();

    if (!emailDomain) {
      return { valid: false, message: "Email domain not recognized" };
    }

    // Get college information
    const college = await ctx.db.get(emailDomain.college_id);
    if (!college || !college.active) {
      return { valid: false, message: "College not active" };
    }

    return {
      valid: true,
      college: {
        id: college._id,
        name: college.name,
        location: college.location,
        website: college.website,
        logo_url: college.logo_url,
      },
      domain_type: emailDomain.domain_type,
    };
  },
});

// Get college information by domain
export const getCollegeByDomain = query({
  args: {
    domain: v.string(),
  },
  handler: async (ctx, { domain }) => {
    const emailDomain = await ctx.db
      .query("email_domains")
      .filter((q) => q.eq(q.field("domain"), domain.toLowerCase()))
      .filter((q) => q.eq(q.field("active"), true))
      .first();

    if (!emailDomain) {
      return null;
    }

    const college = await ctx.db.get(emailDomain.college_id);
    if (!college || !college.active) {
      return null;
    }

    return {
      id: college._id,
      name: college.name,
      location: college.location,
      website: college.website,
      logo_url: college.logo_url,
      description: college.description,
      domain_type: emailDomain.domain_type,
    };
  },
});

// Get user's college information
export const getUserCollege = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!user || !user.college_id) {
      return null;
    }

    const college = await ctx.db.get(user.college_id);
    if (!college) {
      return null;
    }

    return {
      user: {
        email: user.email,
        email_verified: user.email_verified,
        student_year: user.student_year,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      college: {
        id: college._id,
        name: college.name,
        location: college.location,
        website: college.website,
        logo_url: college.logo_url,
        description: college.description,
      },
    };
  },
});

// Link verified user to their college
export const linkUserToCollege = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    profile_image: v.optional(v.string()),
  },
  handler: async (ctx, { userId, email, profile_image }) => {
    // Validate email domain
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) {
      throw new Error("Invalid email format");
    }

    const emailDomain = await ctx.db
      .query("email_domains")
      .filter((q) => q.eq(q.field("domain"), domain))
      .filter((q) => q.eq(q.field("active"), true))
      .first();

    if (!emailDomain) {
      throw new Error("Email domain not recognized");
    }

    const college = await ctx.db.get(emailDomain.college_id);
    if (!college || !college.active) {
      throw new Error("College not active");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    const now = new Date().toISOString();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: email,
        college_id: college._id,
        email_verified: true,
        profile_image: profile_image || existingUser.profile_image,
        updated_at: now,
      });
      return { success: true, user_id: existingUser._id, college_id: college._id };
    } else {
      // Create new user
      const user_id = await ctx.db.insert("users", {
        userId: userId,
        email: email,
        college_id: college._id,
        email_verified: true,
        profile_image: profile_image,
        created_at: now,
        updated_at: now,
      });
      return { success: true, user_id: user_id, college_id: college._id };
    }
  },
});

// Update user's student year
export const updateStudentYear = mutation({
  args: {
    student_year: v.union(
      v.literal("freshman"),
      v.literal("sophomore"),
      v.literal("junior"),
      v.literal("senior"),
      v.literal("graduate"),
      v.literal("alumni")
    ),
  },
  handler: async (ctx, { student_year }) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      student_year: student_year,
      updated_at: new Date().toISOString(),
    });

    return { success: true };
  },
});

// Get all colleges (for dropdown/selection)
export const getAllColleges = query({
  args: {},
  handler: async (ctx) => {
    const colleges = await ctx.db
      .query("colleges")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    return colleges.map(college => ({
      id: college._id,
      name: college.name,
      location: college.location,
      logo_url: college.logo_url,
    }));
  },
}); 
