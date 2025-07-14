"use client";

import Header from "@/components/Header";
import CollegeDashboard from "@/components/dashboard/CollegeDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <CollegeDashboard />
    </main>
  );
}
