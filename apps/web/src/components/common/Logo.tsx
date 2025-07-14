import Link from "next/link";
import React from "react";

interface Props {
  isMobile?: boolean;
  color?: string;
  className?: string;
}

const Logo = ({ isMobile, color = "#000", className = "" }: Props) => {
  return (
    <Link href={"/"}>
      <div className="flex gap-2 items-center">
        {!isMobile ? (
          <h1 className={`font-montserrat font-extrabold text-4xl sm:text-5xl not-italic leading-[90.3%] tracking-[-0.875px] ${className}`} style={{ color }}>
            UniVerse
          </h1>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
