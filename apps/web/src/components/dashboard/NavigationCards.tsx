"use client";

import Link from "next/link";
import { 
  CalendarDaysIcon, 
  BookOpenIcon, 
  BriefcaseIcon, 
  ChatBubbleLeftRightIcon, 
  ClockIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

export default function NavigationCards({ uwMode }: { uwMode?: boolean }) {
  const navigationCards = [
    {
      title: "Course Calendar",
      description: "View your class schedule and upcoming assignments",
      href: "/calendar",
    },
    {
      title: "Textbook Exchange",
      description: "Buy, sell, or trade textbooks with other students",
      href: "/textbooks",
    },
    {
      title: "Career Center",
      description: "Find internships, jobs, and career resources",
      href: "/career",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={uwMode ? "text-2xl font-bold text-[#4B2E83] mb-2" : "text-2xl font-bold text-gray-900 mb-2"}>
          Quick Access
        </h2>
        <p className={uwMode ? "text-[#4B2E83]" : "text-gray-600"}>
          Access all your college resources in one place
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={uwMode ? "block bg-white border border-[#4B2E83] rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1" : "group block bg-blue-50 border-blue-200 border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={uwMode ? "text-lg font-semibold text-[#4B2E83] mb-2" : "text-lg font-semibold text-gray-900 mb-2"}>
                  {card.title}
                </h3>
                <p className={uwMode ? "text-sm text-[#4B2E83] mb-4" : "text-sm text-gray-600 mb-4"}>
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
