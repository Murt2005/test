"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";

export default function AdminPage() {
  const courses = useQuery(api.courses.listAllCourses) || [];
  const colleges = useQuery(api.collegeAuth.getAllColleges) || [];
  const seedCourses = useMutation(api.seedData.seedCourses);
  const clearCourses = useMutation(api.seedData.clearCourses);

  const [form, setForm] = useState({
    college_id: "",
    course_code: "",
    name: "",
    professor: "",
    schedule: "",
    location: "",
    semester: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await api.courses.updateCourse({ id: editingId, ...form });
      setEditingId(null);
    } else {
      await api.courses.addCourse(form);
    }
    setForm({ college_id: "", course_code: "", name: "", professor: "", schedule: "", location: "", semester: "" });
    setLoading(false);
  };

  const handleEdit = (course: any) => {
    setEditingId(course._id);
    setForm({
      college_id: course.college_id,
      course_code: course.course_code,
      name: course.name,
      professor: course.professor,
      schedule: course.schedule,
      location: course.location,
      semester: course.semester,
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await api.courses.deleteCourse({ id });
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin: Manage Courses</h1>
      <div className="flex gap-4 mb-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => seedCourses({})}
          disabled={loading}
        >
          Seed Mock Data
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => clearCourses({})}
          disabled={loading}
        >
          Clear All Courses
        </button>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" onSubmit={handleSubmit}>
        <select
          name="college_id"
          value={form.college_id}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Select College</option>
          {colleges.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="course_code" value={form.course_code} onChange={handleChange} className="border rounded p-2" placeholder="Course Code" required />
        <input name="name" value={form.name} onChange={handleChange} className="border rounded p-2" placeholder="Course Name" required />
        <input name="professor" value={form.professor} onChange={handleChange} className="border rounded p-2" placeholder="Professor" required />
        <input name="schedule" value={form.schedule} onChange={handleChange} className="border rounded p-2" placeholder="Schedule" required />
        <input name="location" value={form.location} onChange={handleChange} className="border rounded p-2" placeholder="Location" required />
        <input name="semester" value={form.semester} onChange={handleChange} className="border rounded p-2" placeholder="Semester" required />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">College</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Professor</th>
              <th className="p-2 border">Schedule</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Semester</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any) => (
              <tr key={course._id}>
                <td className="p-2 border">{colleges.find((c: any) => c.id === course.college_id)?.name || ""}</td>
                <td className="p-2 border">{course.course_code}</td>
                <td className="p-2 border">{course.name}</td>
                <td className="p-2 border">{course.professor}</td>
                <td className="p-2 border">{course.schedule}</td>
                <td className="p-2 border">{course.location}</td>
                <td className="p-2 border">{course.semester}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
