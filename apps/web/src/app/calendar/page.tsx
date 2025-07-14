"use client";

import Header from "@/components/Header";
import CourseSelector from "@/components/calendar/CourseSelector";
import CalendarView from "@/components/calendar/CalendarView";
import AssignmentTracker from "@/components/calendar/AssignmentTracker";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* First Page - Full Calendar View */}
      <div className="h-screen flex flex-col">
        {/* Equal border spacing around calendar */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="h-full bg-gray-50 rounded-xl shadow">
            <div className="h-full p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">My Calendar</h1>
              <div className="h-[calc(100%-4rem)] md:h-[calc(100%-5rem)]">
                <CalendarView />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Page - Additional Components (only visible when scrolling down) */}
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
          <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CourseSelector />
            <AssignmentTracker />
          </section>
        </div>
      </div>
    </main>
  );
} 
