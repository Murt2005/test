import Link from "next/link";
import React from "react";

const FooterHero = () => {
  return (
    <div className="bg-primary">
      <div className="container py-20 px-6 sm:px-0 text-center">
        <div className="max-w-[802px] mx-auto">
          <h2 className="font-montserrat text-white not-italic text-3xl md:text-[57px] font-semibold sm:leading-[109.3%] sm:tracking-[-1.425px] leading-[97.3%] tracking-[-0.75px] pb-[31px] sm:pb-[38px]">
            Start Your College Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up now and experience the ultimate college student platform with UniVerse
          </p>
          <Link href={"/sign-up"}>
            <button className="linear_gradient flex max-w-[438px] w-full mx-auto justify-center items-center gap-2.5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[11px]  text-black text-xl sm:text-3xl not-italic font-semibold leading-[90.3%] tracking-[-0.75px]">
              Get Started For Free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterHero;
