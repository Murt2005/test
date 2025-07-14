const benefits = [
  {
    title: "Course Management",
    description: "Organize your classes, track assignments, and manage your academic progress",
  },
  {
    title: "Study Groups",
    description:
      "Find and join study groups with classmates to collaborate on projects and assignments.",
  },
  {
    title: "Campus Events",
    description:
      "Discover exciting campus events, parties, and activities happening around you.",
  },
  {
    title: "Social Connection",
    description:
      "Connect with fellow students, share experiences, and build your campus community.",
  },
];

const Benefits = () => {
  return (
    <section id="Features" className="relative">
      <div className="container py-16 px-2 md:px-0">
        <p className="text-black text-[17px] sm:text-3xl not-italic font-medium leading-[90.3%] tracking-[-0.75px] text-center font-montserrat pb-2 sm:pb-[18px]">
          Features
        </p>
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose UniVerse
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border rounded-[17px] py-8 px-6 border-solid border-[#B8B5B5] shadow-xl"
            >
              <h4 className="text-black text-[24px] sm:text-[42px] not-italic font-medium leading-[90.3%] tracking-[-1.05px] pb-4 sm:pb-6 font-montserrat">
                {benefit.title}
              </h4>
              <p className="font-montserrat text-black text-[17px] sm:text-3xl not-italic font-normal leading-[90.3%] tracking-[-0.75px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
