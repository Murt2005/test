"use client";

import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  BuildingLibraryIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon 
} from "@heroicons/react/24/outline";

interface PersonalizedWidgetsProps {
  studentYear?: string;
  college: {
    id: string;
    name: string;
    location: string;
  };
  uwMode?: boolean;
}

export default function PersonalizedWidgets({ studentYear, college, uwMode }: PersonalizedWidgetsProps) {
  const getYearSpecificContent = (year?: string) => {
    switch (year) {
      case "freshman":
        return {
          title: "Welcome to Your First Year!",
          description: "Get started with campus resources and meet your fellow freshmen.",
          widgets: [
            {
              title: "Orientation Events",
              content: "Complete your orientation checklist",
              icon: UserGroupIcon,
              color: "bg-green-500",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              title: "First-Year Seminar",
              content: "Join your assigned seminar group",
              icon: AcademicCapIcon,
              color: "bg-blue-500",
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              title: "Campus Map",
              content: "Find your way around campus",
              icon: MapPinIcon,
              color: "bg-purple-500",
              bgColor: "bg-purple-50",
              textColor: "text-purple-600",
            },
          ],
        };
      case "sophomore":
        return {
          title: "Sophomore Year Resources",
          description: "Focus on your major and explore career opportunities.",
          widgets: [
            {
              title: "Major Declaration",
              content: "Declare your major by the end of this semester",
              icon: AcademicCapIcon,
              color: "bg-indigo-500",
              bgColor: "bg-indigo-50",
              textColor: "text-indigo-600",
            },
            {
              title: "Career Exploration",
              content: "Attend career fairs and workshops",
              icon: UserGroupIcon,
              color: "bg-orange-500",
              bgColor: "bg-orange-50",
              textColor: "text-orange-600",
            },
            {
              title: "Study Abroad",
              content: "Explore study abroad opportunities",
              icon: MapPinIcon,
              color: "bg-teal-500",
              bgColor: "bg-teal-50",
              textColor: "text-teal-600",
            },
          ],
        };
      case "junior":
        return {
          title: "Junior Year Planning",
          description: "Prepare for internships and advanced coursework.",
          widgets: [
            {
              title: "Internship Search",
              content: "Apply for summer internships",
              icon: UserGroupIcon,
              color: "bg-blue-500",
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              title: "Research Opportunities",
              content: "Connect with faculty for research",
              icon: BuildingLibraryIcon,
              color: "bg-purple-500",
              bgColor: "bg-purple-50",
              textColor: "text-purple-600",
            },
            {
              title: "Graduate School Prep",
              content: "Start preparing for graduate school",
              icon: AcademicCapIcon,
              color: "bg-green-500",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
          ],
        };
      case "senior":
        return {
          title: "Senior Year Success",
          description: "Complete your degree and plan your next steps.",
          widgets: [
            {
              title: "Graduation Requirements",
              content: "Check your graduation status",
              icon: StarIcon,
              color: "bg-yellow-500",
              bgColor: "bg-yellow-50",
              textColor: "text-yellow-600",
            },
            {
              title: "Job Search",
              content: "Attend job fairs and networking events",
              icon: UserGroupIcon,
              color: "bg-green-500",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              title: "Capstone Project",
              content: "Complete your senior capstone",
              icon: AcademicCapIcon,
              color: "bg-red-500",
              bgColor: "bg-red-50",
              textColor: "text-red-600",
            },
          ],
        };
      default:
        return {
          title: "Student Resources",
          description: "Access all available campus resources and services.",
          widgets: [
            {
              title: "Academic Support",
              content: "Get help with your coursework",
              icon: AcademicCapIcon,
              color: "bg-blue-500",
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              title: "Student Services",
              content: "Access health, counseling, and other services",
              icon: UserGroupIcon,
              color: "bg-green-500",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              title: "Library Resources",
              content: "Access research databases and study spaces",
              icon: BuildingLibraryIcon,
              color: "bg-purple-500",
              bgColor: "bg-purple-50",
              textColor: "text-purple-600",
            },
          ],
        };
    }
  };

  const content = getYearSpecificContent(studentYear);

  return (
    <div className="space-y-6">
      <div>
        <h2 className={uwMode ? "text-2xl font-bold text-[#4B2E83] mb-2" : "text-2xl font-bold text-gray-900 mb-2"}>
          {content.title}
        </h2>
        <p className={uwMode ? "text-[#4B2E83]" : "text-gray-600"}>
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.widgets.map((widget, index) => (
          <div
            key={index}
            className={uwMode ? "bg-white border border-[#4B2E83] rounded-xl p-6" : `${widget.bgColor} border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start space-x-4">
              {/* Remove colored icon if uwMode */}
              <div className={uwMode ? "hidden" : `${widget.color} p-3 rounded-lg`}>
                <widget.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={uwMode ? "font-semibold text-[#4B2E83] mb-2" : "font-semibold text-gray-900 mb-2"}>
                  {widget.title}
                </h3>
                <p className={uwMode ? "text-sm text-[#4B2E83] mb-3" : "text-sm text-gray-600 mb-3"}>
                  {widget.content}
                </p>
                <button className={uwMode ? "text-sm font-medium text-[#4B2E83] hover:underline" : `text-sm font-medium ${widget.textColor} hover:underline`}>
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={uwMode ? "border border-[#4B2E83] rounded-xl p-6 bg-white" : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6"}>
        <h3 className={uwMode ? "text-lg font-semibold text-[#4B2E83] mb-4" : "text-lg font-semibold text-gray-900 mb-4"}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className={uwMode ? "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border border-[#4B2E83]" : "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"}>
            <span className={uwMode ? "text-[#4B2E83]" : "text-blue-600"}>Schedule</span>
          </button>
          <button className={uwMode ? "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border border-[#4B2E83]" : "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"}>
            <span className={uwMode ? "text-[#4B2E83]" : "text-green-600"}>Campus Map</span>
          </button>
          <button className={uwMode ? "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border border-[#4B2E83]" : "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"}>
            <span className={uwMode ? "text-[#4B2E83]" : "text-purple-600"}>Directory</span>
          </button>
          <button className={uwMode ? "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border border-[#4B2E83]" : "flex flex-col items-center space-y-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"}>
            <span className={uwMode ? "text-[#4B2E83]" : "text-orange-600"}>Library</span>
          </button>
        </div>
      </div>
    </div>
  );
} 
