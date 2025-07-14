import Header from "@/components/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import { Id } from "@frosh/backend/convex/_generated/dataModel";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="bg-[#F5F7FE] h-screen">
      <Header />
      <CourseDetails courseId={slug as Id<"courses">} />
    </main>
  );
}
