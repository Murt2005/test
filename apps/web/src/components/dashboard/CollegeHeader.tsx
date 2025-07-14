"use client";

import { CalendarIcon, ClockIcon, BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getCollegeColors } from "@/lib/collegeColors";

interface CollegeHeaderProps {
  college: {
    id: string;
    name: string;
    location: string;
    logo_url?: string;
    website?: string;
  };
  user: {
    email: string;
    student_year?: string;
  };
  uwMode?: boolean;
}

export default function CollegeHeader({ college, user, uwMode }: CollegeHeaderProps) {
  const colors = getCollegeColors(college.name);
  return (
    <div 
      className={uwMode ? "relative overflow-hidden bg-[#4B2E83]" : "relative overflow-hidden"}
      style={uwMode ? { background: "#4B2E83" } : { background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}
    >
      {/* No pattern if uwMode */}
      {!uwMode && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      )}
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* College Info */}
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            {college.logo_url && (
              <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg">
                <img
                  src={college.logo_url}
                  alt={`${college.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className={uwMode ? "text-white" : "text-white"}>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {college.name}
              </h1>
              <p className="text-lg opacity-90 mb-1">
                {college.location}
              </p>
              <p className="text-sm opacity-75">
                {user.student_year ? `${user.student_year.charAt(0).toUpperCase() + user.student_year.slice(1)} Year` : 'Student'}
              </p>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <div className={uwMode ? "bg-white bg-opacity-100 text-[#4B2E83] px-4 py-2 rounded-lg" : "flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200"}>
              {/* Placeholder for future quick actions */}
            </div>
          </div>
        </div>
        {/* Welcome Message */}
        <div className="mt-8 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
            Welcome back, {user.email.split('@')[0]}!
          </h2>
          <p className="text-lg text-white opacity-90">
            Here's what's happening at {college.name} today
          </p>
        </div>
      </div>
    </div>
  );
} 
