# College Student Dashboard

A comprehensive, college-specific student dashboard built with Next.js, TypeScript, and Tailwind CSS v4.

## Features

### 🎨 College-Specific Branding
- Dynamic color schemes based on user's college
- College logos and branding integration
- Responsive design with college-specific theming

### 📊 Quick Stats Dashboard
- Upcoming classes count
- Unread messages
- Dining hall hours
- Real-time data from Convex backend

### 🧭 Navigation Cards
- **Course Calendar**: View class schedules and assignments
- **Textbook Exchange**: Buy, sell, or trade textbooks
- **Career Center**: Access internships and career resources
- **Dorm Chat**: Connect with residence hall students
- **Dining Info**: Check dining hall hours and menus

### 📢 College Announcements
- Real-time college-specific announcements
- Categorized by importance (important, alert, info)
- College branding integration

### 🎯 Personalized Widgets
- Content tailored to student year (freshman, sophomore, junior, senior)
- Year-specific resources and recommendations
- Quick action buttons for common tasks

### ⚡ Loading States
- College-specific skeleton screens
- Smooth loading transitions
- Responsive loading animations

## Components

### Core Components
- `CollegeDashboard`: Main dashboard container
- `CollegeHeader`: College-branded header with logo and colors
- `QuickStats`: Statistics cards for key information
- `NavigationCards`: Main navigation interface
- `CollegeAnnouncements`: College-specific announcements
- `PersonalizedWidgets`: Year-specific content and resources
- `DashboardSkeleton`: Loading state component

### Utility Functions
- `getCollegeColors`: College color scheme management
- `getCollegeTailwindClasses`: Tailwind CSS class generation
- `getCollegeGradient`: Gradient generation for college themes

## TypeScript Interfaces

All components are fully typed with comprehensive interfaces:
- `College`: College information structure
- `User`: User data with student year
- `UserCollegeInfo`: Combined user and college data
- `QuickStatsData`: Statistics data structure
- `NavigationCard`: Navigation card configuration
- `CollegeAnnouncement`: Announcement data structure
- `PersonalizedWidget`: Widget configuration
- `YearSpecificContent`: Year-specific content structure

## College Color Schemes

The dashboard supports 11 major universities with their official colors:

1. **Harvard University**: Crimson (#A51C30)
2. **Stanford University**: Cardinal (#8C1515)
3. **MIT**: Gray and Red (#8A8B8C, #A31F34)
4. **UCLA**: Blue and Gold (#2774AE, #FFD100)
5. **Yale University**: Blue (#00356B)
6. **Princeton University**: Orange (#FF6000)
7. **Columbia University**: Blue (#B9C9AC)
8. **University of Pennsylvania**: Blue and Red (#011F5B, #990000)
9. **Dartmouth College**: Green (#00693E)
10. **Brown University**: Brown (#4E3629)
11. **University of Washington**: Purple (#4B2E83)

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interface
- Optimized for all screen sizes

## Integration

### Backend Integration
- Convex for real-time data
- College authentication system
- User-college linking
- Course and event management

### Authentication
- Clerk authentication integration
- College email verification
- User profile management

## Usage

```tsx
import CollegeDashboard from "@/components/dashboard/CollegeDashboard";

export default function DashboardPage() {
  return (
    <CollegeVerification>
      <main className="min-h-screen bg-gray-50">
        <Header />
        <CollegeDashboard />
      </main>
    </CollegeVerification>
  );
}
```

## Customization

### Adding New Colleges
1. Add college colors to `getCollegeColors` function
2. Update Tailwind CSS theme variables
3. Add college logo URL to database

### Adding New Features
1. Create new component in dashboard directory
2. Add TypeScript interfaces
3. Integrate with existing dashboard layout
4. Update navigation as needed

## Performance

- Optimized loading states
- Efficient re-rendering
- Lazy loading for non-critical components
- Responsive image loading
- Minimal bundle size impact 
