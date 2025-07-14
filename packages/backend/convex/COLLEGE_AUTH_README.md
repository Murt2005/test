# College Email Authentication System

This system provides college email domain validation and user-college linking for the UniVerse platform.

## Schema Overview

### Tables

1. **`colleges`** - Stores college information
   - `name`: College name
   - `email_domains`: Array of email domains
   - `logo_url`: College logo URL
   - `active`: Whether the college is active
   - `location`: College location
   - `website`: College website
   - `description`: College description

2. **`email_domains`** - Stores email domain mappings
   - `domain`: Email domain (e.g., "harvard.edu")
   - `college_id`: Reference to college
   - `domain_type`: "primary", "secondary", or "alumni"
   - `active`: Whether the domain is active

3. **`users`** - Enhanced user table with college info
   - `userId`: Clerk user ID
   - `email`: User's email
   - `college_id`: Reference to college
   - `email_verified`: Whether email is verified
   - `student_year`: Academic year
   - `first_name`, `last_name`: User names
   - `profile_image`: Profile picture URL
   - `created_at`, `updated_at`: Timestamps

## Functions

### Queries

1. **`validateCollegeEmail(email: string)`**
   - Validates if an email domain is recognized
   - Returns college information if valid
   - Usage: Check if user's email is from a supported college

2. **`getCollegeByDomain(domain: string)`**
   - Gets college information by email domain
   - Returns null if domain not found
   - Usage: Get college details for a specific domain

3. **`getUserCollege()`**
   - Gets current user's college information
   - Returns null if user not linked to college
   - Usage: Display user's college info in UI

4. **`getAllColleges()`**
   - Gets list of all active colleges
   - Usage: Populate college selection dropdowns

### Mutations

1. **`linkUserToCollege(userId, email, first_name?, last_name?, profile_image?)`**
   - Links a verified user to their college
   - Creates or updates user record
   - Usage: After user signs up with college email

2. **`updateStudentYear(student_year)`**
   - Updates user's academic year
   - Usage: Let users set their student year

3. **`seedColleges()`**
   - Seeds the database with 10 major universities
   - Usage: Run once to populate initial college data

## Setup Instructions

1. **Deploy the schema changes:**
   ```bash
   cd packages/backend
   npx convex deploy
   ```

2. **Seed the database with colleges:**
   ```bash
   # Run this mutation once to populate colleges
   npx convex run seedColleges
   ```

3. **Integrate with your frontend:**
   ```typescript
   import { api } from "@frosh/backend/convex/_generated/api";
   import { useMutation, useQuery } from "convex/react";

   // Validate email during signup
   const validateEmail = useQuery(api.collegeAuth.validateCollegeEmail, { 
     email: "student@harvard.edu" 
   });

   // Link user after successful authentication
   const linkUser = useMutation(api.collegeAuth.linkUserToCollege);
   ```

## Supported Colleges

The system comes pre-seeded with 11 major universities:

1. Harvard University (harvard.edu, hbs.edu, g.harvard.edu)
2. Stanford University (stanford.edu, alumni.stanford.edu)
3. MIT (mit.edu, alum.mit.edu)
4. UCLA (ucla.edu, g.ucla.edu)
5. Yale University (yale.edu, alumni.yale.edu)
6. Princeton University (princeton.edu, alumni.princeton.edu)
7. Columbia University (columbia.edu, alumni.columbia.edu)
8. University of Pennsylvania (upenn.edu, alumni.upenn.edu)
9. Dartmouth College (dartmouth.edu, alumni.dartmouth.edu)
10. Brown University (brown.edu, alumni.brown.edu)
11. University of Washington (uw.edu, washington.edu, alumni.washington.edu)

## Usage Examples

### Frontend Integration

```typescript
// Email validation during signup
const [email, setEmail] = useState("");
const emailValidation = useQuery(api.collegeAuth.validateCollegeEmail, { email });

if (emailValidation?.valid) {
  console.log("Valid college email:", emailValidation.college.name);
} else {
  console.log("Invalid email:", emailValidation?.message);
}

// Link user after Clerk authentication
const linkUser = useMutation(api.collegeAuth.linkUserToCollege);

const handleSignUp = async (user: any) => {
  try {
    await linkUser({
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      first_name: user.firstName,
      last_name: user.lastName,
      profile_image: user.imageUrl,
    });
  } catch (error) {
    console.error("Failed to link user to college:", error);
  }
};

// Get user's college info
const userCollege = useQuery(api.collegeAuth.getUserCollege);
if (userCollege) {
  console.log("User attends:", userCollege.college.name);
}
```

### Adding New Colleges

To add a new college, you can either:

1. **Use the seed function as a template** and create a new mutation
2. **Manually insert** into the `colleges` and `email_domains` tables
3. **Create an admin interface** for managing colleges

## Security Notes

- Email validation happens server-side in Convex
- User authentication is handled by Clerk
- College linking requires valid email domain
- All queries are protected by Convex's built-in security 
