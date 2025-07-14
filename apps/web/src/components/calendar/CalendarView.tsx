"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";

const VIEW_OPTIONS = ["day", "week", "month"] as const;
type CalendarViewType = typeof VIEW_OPTIONS[number];

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export default function CalendarView() {
  const [view, setView] = useState<CalendarViewType>("week");
  const [currentDate, setCurrentDate] = useState(getToday());
  const myCourses = useQuery(api.courses.myCourses) || [];
  const assignments = useQuery(api.courses.myAssignments) || [];

  // Helper: get all days in the current week
  function getWeekDays(date: Date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }

  // Helper: get all days in the current month
  function getMonthDays(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    return Array.from({ length: last.getDate() }, (_, i) => new Date(year, month, i + 1));
  }

  // Helper: format date
  function fmt(d: Date) {
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // Navigation
  function goPrev() {
    if (view === "day") setCurrentDate(new Date(currentDate.getTime() - 86400000));
    else if (view === "week") setCurrentDate(new Date(currentDate.getTime() - 7 * 86400000));
    else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }
  function goNext() {
    if (view === "day") setCurrentDate(new Date(currentDate.getTime() + 86400000));
    else if (view === "week") setCurrentDate(new Date(currentDate.getTime() + 7 * 86400000));
    else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  // Render events for a given day
  function eventsForDay(day: Date) {
    // Classes: show if class schedule matches day (placeholder: show all)
    const classEvents = myCourses.map((uc: any) => ({
      type: "class",
      label: `${uc.course.course_code}: ${uc.course.name}`,
      time: uc.course.schedule,
      location: uc.course.location,
    }));
    // Assignments: due on this day
    const assignmentEvents = assignments.filter((a: any) => {
      const due = new Date(a.due_date);
      return due.toDateString() === day.toDateString();
    }).map((a: any) => ({
      type: "assignment",
      label: `${a.title} (${a.course?.course_code})`,
      time: new Date(a.due_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location: "",
    }));
    return [...classEvents, ...assignmentEvents];
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          {VIEW_OPTIONS.map((v) => (
            <button
              key={v}
              className={`px-3 py-1 rounded ${view === v ? "bg-blue-600 text-white" : "bg-white border"}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={goPrev} className="px-2 py-1 border rounded">&#8592;</button>
          <span className="font-semibold">
            {view === "month"
              ? currentDate.toLocaleString(undefined, { month: "long", year: "numeric" })
              : view === "week"
              ? `Week of ${fmt(getWeekDays(currentDate)[0])}`
              : fmt(currentDate)}
          </span>
          <button onClick={goNext} className="px-2 py-1 border rounded">&#8594;</button>
        </div>
      </div>
      {/* Calendar grid - takes full remaining height */}
      <div className="relative w-full flex-1 min-h-0">
        {view === "day" && (
          <div className="absolute inset-0 bg-white rounded-lg p-4 h-full">
            <div className="h-full flex flex-col">
              <h3 className="font-bold mb-4 text-2xl text-center">{fmt(currentDate)}</h3>
              <ul className="flex-1 flex flex-col justify-start">
                {eventsForDay(currentDate).length === 0 && <li className="text-gray-400 text-center">No events</li>}
                {eventsForDay(currentDate).map((ev, i) => (
                  <li key={i} className="mb-4 text-lg text-center">
                    <span className={ev.type === "assignment" ? "text-red-600" : "text-blue-700"}>{ev.label}</span>
                    {ev.time && <span className="ml-2 text-base text-gray-500">{ev.time}</span>}
                    {ev.location && <span className="ml-2 text-base text-gray-400">{ev.location}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {view === "week" && (
          <div className="absolute inset-0 grid grid-cols-7 gap-2 bg-white rounded-lg p-4 h-full">
            {getWeekDays(currentDate).map((day, idx) => (
              <div key={idx} className="flex flex-col border rounded p-2 h-full min-h-0">
                <div className="font-bold mb-2 text-center">{fmt(day)}</div>
                <ul className="flex-1 flex flex-col justify-start">
                  {eventsForDay(day).length === 0 && <li className="text-gray-300 text-xs text-center">No events</li>}
                  {eventsForDay(day).map((ev, i) => (
                    <li key={i} className="mb-2 text-xs text-center">
                      <span className={ev.type === "assignment" ? "text-red-600" : "text-blue-700"}>{ev.label}</span>
                      {ev.time && <span className="ml-1 text-gray-500">{ev.time}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {view === "month" && (
          <div className="absolute inset-0 grid grid-cols-7 gap-2 bg-white rounded-lg p-2 h-full">
            {getMonthDays(currentDate).map((day, idx) => (
              <div key={idx} className="flex flex-col border rounded p-1 h-full min-h-0">
                <div className="font-bold text-xs mb-1 text-center">{fmt(day)}</div>
                <ul className="flex-1 flex flex-col justify-start">
                  {eventsForDay(day).length === 0 && <li className="text-gray-300 text-xs">&nbsp;</li>}
                  {eventsForDay(day).map((ev, i) => (
                    <li key={i} className="mb-1 text-xs text-center">
                      <span className={ev.type === "assignment" ? "text-red-600" : "text-blue-700"}>{ev.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
