import Header from "@/components/Header";
import Courses from "@/components/courses/Courses";
import CollegeVerification from "@/components/auth/CollegeVerification";

export default function Home() {
  return (
    <CollegeVerification>
      <main className="bg-[#EDEDED] h-screen">
        <Header />
        <Courses />
      </main>
    </CollegeVerification>
  );
}
