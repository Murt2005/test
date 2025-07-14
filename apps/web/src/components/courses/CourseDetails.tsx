"use client";

import { api } from "@frosh/backend/convex/_generated/api";
import { Id } from "@frosh/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface CourseDetailsProps {
  courseId: Id<"courses">;
}

const CourseDetails = ({ courseId }: CourseDetailsProps) => {
  const currentCourse = useQuery(api.courses.getCourse, { id: courseId });

  if (!currentCourse) {
    return (
      <div className="container py-20 px-[26px] sm:px-0">
        <p className="text-center text-gray-500">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="container space-y-6 sm:space-y-9 py-20 px-[26px] sm:px-0">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-black text-center pb-5 text-xl sm:text-[32px] not-italic font-semibold leading-[90.3%] tracking-[-0.8px]">
          {currentCourse.name}
        </h3>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Course Code:</span>
                  <p className="text-lg text-gray-900">{currentCourse.code}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Instructor:</span>
                  <p className="text-lg text-gray-900">{currentCourse.instructor}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Credits:</span>
                  <p className="text-lg text-gray-900">{currentCourse.credits}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Academic Details</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Semester:</span>
                  <p className="text-lg text-gray-900">{currentCourse.semester}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Year:</span>
                  <p className="text-lg text-gray-900">{currentCourse.year}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Added:</span>
                  <p className="text-lg text-gray-900">
                    {new Date(Number(currentCourse._creationTime)).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 
