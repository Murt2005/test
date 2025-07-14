import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed data for major universities
const collegesData = [
  {
    name: "Harvard University",
    email_domains: ["harvard.edu", "hbs.edu", "g.harvard.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png",
    active: true,
    location: "Cambridge, MA",
    website: "https://www.harvard.edu",
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts."
  },
  {
    name: "Stanford University",
    email_domains: ["stanford.edu", "alumni.stanford.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png",
    active: true,
    location: "Stanford, CA",
    website: "https://www.stanford.edu",
    description: "Stanford University is a private research university in Stanford, California."
  },
  {
    name: "Massachusetts Institute of Technology",
    email_domains: ["mit.edu", "alum.mit.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/MIT_Seal.svg/1200px-MIT_Seal.svg.png",
    active: true,
    location: "Cambridge, MA",
    website: "https://www.mit.edu",
    description: "MIT is a private research university in Cambridge, Massachusetts."
  },
  {
    name: "University of California, Los Angeles",
    email_domains: ["ucla.edu", "g.ucla.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/UCLA_Bruins_logo.svg/1200px-UCLA_Bruins_logo.svg.png",
    active: true,
    location: "Los Angeles, CA",
    website: "https://www.ucla.edu",
    description: "UCLA is a public research university in Los Angeles, California."
  },
  {
    name: "Yale University",
    email_domains: ["yale.edu", "alumni.yale.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Yale_University_logo.svg/1200px-Yale_University_logo.svg.png",
    active: true,
    location: "New Haven, CT",
    website: "https://www.yale.edu",
    description: "Yale University is a private Ivy League research university in New Haven, Connecticut."
  },
  {
    name: "Princeton University",
    email_domains: ["princeton.edu", "alumni.princeton.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png",
    active: true,
    location: "Princeton, NJ",
    website: "https://www.princeton.edu",
    description: "Princeton University is a private Ivy League research university in Princeton, New Jersey."
  },
  {
    name: "Columbia University",
    email_domains: ["columbia.edu", "alumni.columbia.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Columbia_University_logo.svg/1200px-Columbia_University_logo.svg.png",
    active: true,
    location: "New York, NY",
    website: "https://www.columbia.edu",
    description: "Columbia University is a private Ivy League research university in New York City."
  },
  {
    name: "University of Pennsylvania",
    email_domains: ["upenn.edu", "alumni.upenn.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/University_of_Pennsylvania_logo.svg/1200px-University_of_Pennsylvania_logo.svg.png",
    active: true,
    location: "Philadelphia, PA",
    website: "https://www.upenn.edu",
    description: "The University of Pennsylvania is a private Ivy League research university in Philadelphia."
  },
  {
    name: "Dartmouth College",
    email_domains: ["dartmouth.edu", "alumni.dartmouth.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Dartmouth_College_shield.svg/1200px-Dartmouth_College_shield.svg.png",
    active: true,
    location: "Hanover, NH",
    website: "https://www.dartmouth.edu",
    description: "Dartmouth College is a private Ivy League research university in Hanover, New Hampshire."
  },
  {
    name: "Brown University",
    email_domains: ["brown.edu", "alumni.brown.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Brown_University_logo.svg/1200px-Brown_University_logo.svg.png",
    active: true,
    location: "Providence, RI",
    website: "https://www.brown.edu",
    description: "Brown University is a private Ivy League research university in Providence, Rhode Island."
  },
  {
    name: "University of Washington",
    email_domains: ["uw.edu", "washington.edu", "alumni.washington.edu"],
    logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/University_of_Washington_seal.svg/1200px-University_of_Washington_seal.svg.png",
    active: true,
    location: "Seattle, WA",
    website: "https://www.washington.edu",
    description: "The University of Washington is a public research university in Seattle, Washington."
  }
];

export const seedColleges = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    for (const collegeData of collegesData) {
      // Insert college
      const collegeId = await ctx.db.insert("colleges", {
        name: collegeData.name,
        email_domains: collegeData.email_domains,
        logo_url: collegeData.logo_url,
        active: collegeData.active,
        location: collegeData.location,
        website: collegeData.website,
        description: collegeData.description,
      });
      
      // Insert email domains for this college
      for (const domain of collegeData.email_domains) {
        const domainType = domain.includes("alumni") ? "alumni" : "primary";
        await ctx.db.insert("email_domains", {
          domain: domain,
          college_id: collegeId,
          domain_type: domainType,
          active: true,
        });
      }
      
      results.push({ collegeId, name: collegeData.name });
    }
    
    return results;
  },
}); 

// Mock course data for a few colleges
const mockCourses = [
  // University of Washington
  {
    college_name: "University of Washington",
    college_id: null, // to be filled in
    course_code: "CSE 142",
    name: "Computer Programming I",
    professor: "Dr. Jane Smith",
    schedule: "MWF 9:30-10:20",
    location: "EEB 125",
    semester: "Fall 2024",
  },
  {
    college_name: "University of Washington",
    college_id: null,
    course_code: "MATH 124",
    name: "Calculus with Analytic Geometry I",
    professor: "Dr. John Doe",
    schedule: "TTh 11:00-12:20",
    location: "GWN 201",
    semester: "Fall 2024",
  },
  // Harvard University
  {
    college_name: "Harvard University",
    college_id: null,
    course_code: "CS50",
    name: "Introduction to Computer Science",
    professor: "Prof. David Malan",
    schedule: "MW 1:30-2:45",
    location: "Science Center B",
    semester: "Fall 2024",
  },
  {
    college_name: "Harvard University",
    college_id: null,
    course_code: "ECON 10A",
    name: "Principles of Economics",
    professor: "Dr. Emily Chen",
    schedule: "TTh 10:00-11:15",
    location: "Emerson 105",
    semester: "Fall 2024",
  },
  // MIT
  {
    college_name: "Massachusetts Institute of Technology",
    college_id: null,
    course_code: "6.006",
    name: "Introduction to Algorithms",
    professor: "Prof. Erik Demaine",
    schedule: "MWF 10:00-11:00",
    location: "32-123",
    semester: "Fall 2024",
  },
  {
    college_name: "Massachusetts Institute of Technology",
    college_id: null,
    course_code: "18.01",
    name: "Single Variable Calculus",
    professor: "Dr. Sarah Johnson",
    schedule: "TTh 9:00-10:30",
    location: "2-190",
    semester: "Fall 2024",
  },
];

export const seedCourses = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all colleges
    const colleges = await ctx.db.query("colleges").collect();
    // Map college names to IDs
    const collegeMap = Object.fromEntries(colleges.map(c => [c.name, c._id]));
    // Insert courses
    for (const course of mockCourses) {
      const college_id = collegeMap[course.college_name];
      if (!college_id) continue;
      await ctx.db.insert("courses", {
        college_id,
        course_code: course.course_code,
        name: course.name,
        professor: course.professor,
        schedule: course.schedule,
        location: course.location,
        semester: course.semester,
      });
    }
    return { success: true };
  },
});

export const clearCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("courses").collect();
    for (const c of all) {
      await ctx.db.delete(c._id);
    }
    return { success: true };
  },
}); 
