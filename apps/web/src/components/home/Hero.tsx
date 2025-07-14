import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg_image">
      <div className="container py-16 sm:py-36 px-6 sm:px-0">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="font-montserrat pb-7 sm:pb-[26px] text-black text-[44px] sm:text-[75px] not-italic font-medium leading-[111.3%] tracking-[-1.1px] sm:tracking-[-1.875px]">
            Your Complete <br /> College Experience
          </h2>
          <p className="font-montserrat sm:pb-16 max-w-[680px] text-black text-xl sm:text-3xl not-italic font-normal leading-[103.3%] tracking-[-0.5px] sm:tracking-[-0.75px] pb-11">
            UniVerse is the ultimate platform for college students to manage courses, 
            find study groups, discover campus events, and connect with fellow students
          </p>
          <Link href={"/sign-up"}>
            <button className="button gap-2.5 px-8 py-4 font-montserrat text-white text-xl sm:text-3xl not-italic font-semibold leading-[90.3%] tracking-[-0.5px] sm:tracking-[-0.75px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
