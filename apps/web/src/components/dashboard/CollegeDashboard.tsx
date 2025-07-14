"use client";

import { useQuery } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import CollegeHeader from "./CollegeHeader";
import QuickStats from "./QuickStats";
import NavigationCards from "./NavigationCards";
import CollegeAnnouncements from "./CollegeAnnouncements";
import PersonalizedWidgets from "./PersonalizedWidgets";
import DashboardSkeleton from "./DashboardSkeleton";
import { UserCollegeInfo, QuickStatsData } from "@/types/dashboard";
import Link from "next/link";

export default function CollegeDashboard() {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get user's college information
  const userCollege = useQuery(api.collegeAuth.getUserCollege);
  
  // Get user's courses for stats
  const myCourses = useQuery(api.courses.myCourses);
  
  // Get upcoming events
  // const events = useQuery(api.events.getEvents);

  useEffect(() => {
    if (isLoaded && userCollege !== undefined) {
      setIsLoading(false);
    }
  }, [isLoaded, userCollege]);

  // If not signed in, show UW mode, blur content, and overlay sign-in prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-white relative">
        <CollegeHeader
          college={{
            id: "uw",
            name: "University of Washington",
            location: "Seattle, WA",
            logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/University_of_Washington_seal.svg/1200px-University_of_Washington_seal.svg.png",
          }}
          user={{ email: "", student_year: undefined }}
          uwMode={true}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 className="font-montserrat text-[7rem] sm:text-[10rem] font-extrabold mb-10" style={{ color: "#000" }}>
            UniVerse
          </h1>
          <Link href="/sign-in" className="text-2xl sm:text-3xl text-black underline font-semibold">
            Sign in to continue
          </Link>
        </div>
        <div className="absolute inset-0 z-10 backdrop-blur-md" />
        <div className="relative z-0">
          {/* Blurred content below header (invisible to user) */}
          <div className="container mx-auto px-4 py-8">
            <QuickStats upcomingClasses={0} unreadMessages={0} diningHours={""} uwMode={true} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 space-y-8">
                <NavigationCards uwMode={true} />
                <PersonalizedWidgets studentYear={undefined} college={{ id: "uw", name: "University of Washington", location: "Seattle, WA" }} uwMode={true} />
              </div>
              <div className="space-y-8">
                <CollegeAnnouncements college={{ id: "uw", name: "University of Washington", location: "Seattle, WA" }} uwMode={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!userCollege) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#4B2E83] mb-2">
            College Information Not Found
          </h2>
          <p className="text-[#4B2E83]">
            Please contact support to link your account to your college.
          </p>
        </div>
      </div>
    );
  }

  const isUW = userCollege.college.name === "University of Washington";

  const upcomingClasses = myCourses?.filter(uc => {
    // Simple logic - you can enhance this with actual class schedules
    return uc.course?.semester === "Fall 2024";
  }) || [];

  const unreadMessages = 3; // Mock data - replace with actual message count
  const diningHours = "7:00 AM - 10:00 PM"; // Mock data - replace with actual dining hours

  return (
    <div className={isUW ? "min-h-screen bg-white" : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"}>
      {/* College Header */}
      <CollegeHeader college={userCollege.college} user={userCollege.user} uwMode={isUW} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <QuickStats 
          upcomingClasses={upcomingClasses.length}
          unreadMessages={unreadMessages}
          diningHours={diningHours}
          uwMode={isUW}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Cards */}
            <NavigationCards uwMode={isUW} />
            
            {/* Personalized Widgets */}
            <PersonalizedWidgets 
              studentYear={userCollege.user.student_year}
              college={userCollege.college}
              uwMode={isUW}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* College Announcements */}
            <CollegeAnnouncements college={userCollege.college} uwMode={isUW} />
          </div>
        </div>
      </div>
    </div>
  );
} 
