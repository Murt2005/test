import Link from "next/link";
import DeleteCourse from "./DeleteCourse";

export interface CourseProps {
  course: {
    name: string;
    code: string;
    instructor: string;
    credits: number;
    semester: string;
    year: number;
    _id: string;
    _creationTime: number;
  };
  deleteCourse: any;
}

const CourseItem = ({ course, deleteCourse }: CourseProps) => {
  return (
    <div className="flex justify-between items-center h-[74px] bg-[#F9FAFB] py-5 px-5 sm:px-11 gap-x-5 sm:gap-x-10">
      <Link href={`/courses/${course._id}`} className="flex-1">
        <div>
          <h1 className="text-[#2D2D2D] text-[17px] sm:text-2xl not-italic font-normal leading-[114.3%] tracking-[-0.6px]">
            {course.name}
          </h1>
          <p className="text-[#6B7280] text-[14px] sm:text-lg not-italic font-light leading-[114.3%] tracking-[-0.6px]">
            {course.code} • {course.instructor} • {course.credits} credits
          </p>
        </div>
      </Link>
      <div className="hidden md:flex flex-col items-end">
        <p className="text-[#2D2D2D] text-center text-xl not-italic font-extralight leading-[114.3%] tracking-[-0.5px]">
          {course.semester} {course.year}
        </p>
        <p className="text-[#6B7280] text-[14px] not-italic font-light leading-[114.3%] tracking-[-0.6px]">
          {new Date(Number(course._creationTime)).toLocaleDateString()}
        </p>
      </div>
      <DeleteCourse deleteAction={() => deleteCourse({ courseId: course._id })} />
    </div>
  );
};

export default CourseItem; 
