"use client";
import { useQuery } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";
import { useRef } from "react";

function generateICS(assignments: any[]) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };
  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UniVerse//Course Calendar//EN",
  ];
  for (const a of assignments) {
    ics.push("BEGIN:VEVENT");
    ics.push(`UID:${a._id}@universe`);
    ics.push(`DTSTAMP:${formatDate(a.due_date)}`);
    ics.push(`DTSTART:${formatDate(a.due_date)}`);
    ics.push(`SUMMARY:${a.title} (${a.course?.course_code || ""})`);
    ics.push(`DESCRIPTION:${a.description}`);
    ics.push("END:VEVENT");
  }
  ics.push("END:VCALENDAR");
  return ics.join("\r\n");
}

export default function AssignmentTracker() {
  const assignments = useQuery(api.courses.myAssignments) || [];
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleExport = () => {
    const ics = generateICS(assignments);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = "universe-assignments.ics";
      downloadRef.current.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
        <button
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          onClick={handleExport}
          disabled={assignments.length === 0}
        >
          Export to Google Calendar
        </button>
        <a ref={downloadRef} style={{ display: "none" }} />
      </div>
      {assignments.length === 0 ? (
        <div className="text-gray-400">No upcoming assignments</div>
      ) : (
        <ul>
          {assignments.map((a: any) => (
            <li key={a._id} className="mb-3 p-3 bg-white rounded border">
              <div className="font-bold">{a.title}</div>
              <div className="text-sm text-gray-600 mb-1">
                {a.course?.course_code} &middot; Due: {new Date(a.due_date).toLocaleString()}
              </div>
              <div className="text-sm">{a.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 
