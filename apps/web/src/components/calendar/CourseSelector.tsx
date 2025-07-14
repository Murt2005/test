"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";

export default function CourseSelector() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const enroll = useMutation(api.courses.enrollInCourse);
  const myCourses = useQuery(api.courses.myCourses) || [];

  const handleSearch = async () => {
    setSearching(true);
    const results = await api.courses.searchCourses({ query });
    setSearchResults(results);
    setSearching(false);
  };

  const handleAdd = async (course_id: string) => {
    await enroll({ course_id });
  };

  const enrolledIds = new Set(myCourses.map((uc: any) => uc.course_id));

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Add Courses</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Search by course code (e.g. CSE 142)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={!query.trim() || searching}
        >
          Search
        </button>
      </div>
      <ul>
        {searchResults.length === 0 && !searching && <li className="text-gray-400">No results</li>}
        {searchResults.map((course) => (
          <li key={course._id} className="flex justify-between items-center py-2 border-b">
            <span>{course.course_code} - {course.name}</span>
            <button
              className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={() => handleAdd(course._id)}
              disabled={enrolledIds.has(course._id)}
            >
              {enrolledIds.has(course._id) ? "Enrolled" : "Add"}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">My Courses</h3>
        <ul>
          {myCourses.length === 0 && <li className="text-gray-400">No enrolled courses</li>}
          {myCourses.map((uc: any) => (
            <li key={uc.course._id} className="py-1">
              {uc.course.course_code} - {uc.course.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
