# College Email Authentication System

This document describes the implementation of the college email authentication system for the UniVerse platform.

## Overview

The system ensures that only users with valid college email addresses can register and access the platform. It includes real-time email domain validation, college verification, and integration with Clerk authentication.

## Components

### 1. CollegeEmailInput Component
**Location**: `src/components/auth/CollegeEmailInput.tsx`

A React component that provides real-time email validation with the following features:
- Validates email domains against the Convex database
- Shows college logo and information when a valid domain is detected
- Displays error messages for invalid domains
- Debounced validation to prevent excessive API calls
- Visual feedback with loading states and success/error indicators

**Usage**:
```tsx
<CollegeEmailInput
  value={email}
  onChange={setEmail}
  onValidationChange={(isValid, college) => {
    setIsEmailValid(isValid);
    setCollege(college);
  }}
  placeholder="your.email@university.edu"
/>
```

### 2. Custom Sign-Up Page
**Location**: `src/app/sign-up/page.tsx`

A custom sign-up page that:
- Uses the CollegeEmailInput component for email validation
- Integrates with Clerk authentication
- Links users to their college in the Convex database
- Handles email verification flow
- Redirects to the dashboard upon successful registration

### 3. Custom Sign-In Page
**Location**: `src/app/sign-in/page.tsx`

A custom sign-in page that:
- Shows college branding for returning users
- Uses the CollegeEmailInput component
- Integrates with Clerk authentication
- Displays user's college information if available

### 4. Email Verification Page
**Location**: `src/app/verify-email/page.tsx`

Handles the email verification step after sign-up:
- Shows verification status
- Allows resending verification emails
- Provides manual verification option
- Redirects to dashboard upon completion

### 5. College Verification Component
**Location**: `src/components/auth/CollegeVerification.tsx`

A wrapper component that ensures users have both email verification and college verification:
- Checks if user is authenticated
- Verifies email verification status
- Links users to their college if not already linked
- Shows appropriate loading and error states
- Protects routes that require college verification

**Usage**:
```tsx
<CollegeVerification>
  <ProtectedContent />
</CollegeVerification>
```

## Backend Integration

### Convex Functions
The system uses several Convex functions for college authentication:

1. **validateCollegeEmail** - Validates email domains against the college registry
2. **linkUserToCollege** - Links verified users to their college
3. **getUserCollege** - Retrieves user's college information
4. **getCollegeByDomain** - Gets college information by email domain

### Database Schema
The system relies on the following tables:
- `colleges` - College information
- `email_domains` - Email domains associated with colleges
- `users` - User information linked to colleges

## Authentication Flow

1. **Sign-Up Process**:
   - User enters college email in CollegeEmailInput
   - Real-time validation checks domain against college registry
   - If valid, user can proceed with registration
   - Clerk handles email verification
   - User is linked to their college in Convex database
   - Redirected to dashboard

2. **Sign-In Process**:
   - User enters college email
   - College branding is shown if user has previous college info
   - Clerk handles authentication
   - User is redirected to dashboard

3. **Route Protection**:
   - CollegeVerification component checks authentication
   - Ensures email verification is complete
   - Links user to college if needed
   - Shows appropriate error states

## Configuration

### Environment Variables
Ensure the following environment variables are set:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL

### Clerk Configuration
Configure Clerk to:
- Enable email verification
- Set appropriate sign-up and sign-in URLs
- Configure email templates for verification

### Convex Configuration
Ensure the college authentication functions are deployed:
```bash
npx convex deploy
```

## Usage Examples

### Basic Email Input
```tsx
import CollegeEmailInput from "@/components/auth/CollegeEmailInput";

function MyForm() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <CollegeEmailInput
      value={email}
      onChange={setEmail}
      onValidationChange={(valid) => setIsValid(valid)}
    />
  );
}
```

### Protected Route
```tsx
import CollegeVerification from "@/components/auth/CollegeVerification";

export default function ProtectedPage() {
  return (
    <CollegeVerification>
      <div>This content requires college verification</div>
    </CollegeVerification>
  );
}
```

## Error Handling

The system handles various error scenarios:
- Invalid email domains
- Network errors during validation
- Clerk authentication errors
- College linking failures
- Email verification issues

Error messages are displayed to users with appropriate guidance for resolution.

## Security Considerations

1. **Email Domain Validation**: Only pre-approved college domains are accepted
2. **Email Verification**: Users must verify their email address
3. **College Linking**: Users are automatically linked to their college upon verification
4. **Route Protection**: Protected routes require both authentication and college verification
5. **Database Security**: College data is validated server-side

## Testing

To test the system:
1. Use valid college email domains (e.g., stanford.edu, mit.edu)
2. Test with invalid domains to ensure proper error handling
3. Verify email verification flow
4. Test college linking functionality
5. Ensure protected routes are properly secured

## Troubleshooting

### Common Issues

1. **Email validation not working**: Check Convex deployment and function availability
2. **College linking fails**: Verify user authentication and email verification status
3. **Protected routes not working**: Ensure CollegeVerification component is properly implemented
4. **Clerk integration issues**: Check environment variables and Clerk configuration

### Debug Steps

1. Check browser console for errors
2. Verify Convex function calls in network tab
3. Check Clerk authentication status
4. Validate environment variable configuration
5. Test with known valid college domains 
