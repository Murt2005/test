"use client";

import { CalendarIcon, ClockIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface QuickStatsProps {
  upcomingClasses: number;
  unreadMessages: number;
  diningHours: string;
  uwMode?: boolean;
}

export default function QuickStats({ upcomingClasses, unreadMessages, diningHours, uwMode }: QuickStatsProps) {
  const stats = [
    {
      name: "Upcoming Classes",
      value: upcomingClasses,
    },
    {
      name: "Unread Messages",
      value: unreadMessages,
    },
    {
      name: "Dining Hours",
      value: diningHours,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={uwMode ? "bg-white rounded-xl p-6 border border-[#4B2E83]" : "rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={uwMode ? "text-sm font-medium text-[#4B2E83] mb-1" : "text-sm font-medium text-gray-600 mb-1"}>
                {stat.name}
              </p>
              <p className={uwMode ? "text-2xl font-bold text-[#4B2E83]" : "text-2xl font-bold text-blue-600"}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
