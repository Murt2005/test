"use client";

import { MegaphoneIcon, CalendarIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface CollegeAnnouncementsProps {
  college: {
    id: string;
    name: string;
    location: string;
  };
  uwMode?: boolean;
}

export default function CollegeAnnouncements({ college, uwMode }: CollegeAnnouncementsProps) {
  // Mock announcements - in a real app, these would come from the backend
  const announcements = [
    {
      id: 1,
      title: "Spring Semester Registration Opens",
      content: "Registration for Spring 2024 semester begins next Monday. Make sure to meet with your advisor.",
      type: "important",
      date: "2024-01-15",
      icon: CalendarIcon,
    },
    {
      id: 2,
      title: "Campus Safety Alert",
      content: "Please be aware of ongoing construction near the library. Use designated walkways.",
      type: "alert",
      date: "2024-01-14",
      icon: ExclamationTriangleIcon,
    },
    {
      id: 3,
      title: "Student Life Fair",
      content: "Join us for the annual Student Life Fair this Friday in the Student Center.",
      type: "info",
      date: "2024-01-13",
      icon: MegaphoneIcon,
    },
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "important":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          titleColor: "text-blue-900",
        };
      case "alert":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          titleColor: "text-red-900",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
          titleColor: "text-gray-900",
        };
    }
  };

  return (
    <div className={uwMode ? "bg-white rounded-xl border border-[#4B2E83] p-6" : "bg-white rounded-xl border border-gray-200 p-6"}>
      <div className="flex items-center space-x-2 mb-6">
        <MegaphoneIcon className={uwMode ? "w-6 h-6 text-[#4B2E83]" : "w-6 h-6 text-gray-600"} />
        <h3 className={uwMode ? "text-xl font-semibold text-[#4B2E83]" : "text-xl font-semibold text-gray-900"}>
          {college.name} Announcements
        </h3>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={uwMode ? "bg-white border border-[#4B2E83] rounded-lg p-4" : `${getTypeStyles(announcement.type).bgColor} ${getTypeStyles(announcement.type).borderColor} border rounded-lg p-4`}
          >
            <div className="flex items-start space-x-3">
              <div className={uwMode ? "text-[#4B2E83] mt-1" : `${getTypeStyles(announcement.type).iconColor} mt-1`}>
                <announcement.icon className={uwMode ? "w-5 h-5" : "w-5 h-5"} />
              </div>
              <div className="flex-1">
                <h4 className={uwMode ? "font-semibold text-[#4B2E83] mb-1" : `font-semibold ${getTypeStyles(announcement.type).titleColor} mb-1`}>
                  {announcement.title}
                </h4>
                <p className={uwMode ? "text-sm text-[#4B2E83] mb-2" : "text-sm text-gray-600 mb-2"}>
                  {announcement.content}
                </p>
                <p className={uwMode ? "text-xs text-[#4B2E83]" : "text-xs text-gray-500"}>
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className={uwMode ? "text-sm text-[#4B2E83] hover:text-[#4B2E83] font-medium" : "text-sm text-blue-600 hover:text-blue-800 font-medium"}>
          View All Announcements →
        </button>
      </div>
    </div>
  );
} 
