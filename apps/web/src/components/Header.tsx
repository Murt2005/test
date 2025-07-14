"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./common/Logo";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import { UserNav } from "./common/UserNav";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@frosh/backend/convex/_generated/api";

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
];

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const userCollege = useQuery(api.collegeAuth.getUserCollege);
  const isUW = userCollege?.college?.name === "University of Washington";
  const logoColor = user ? (isUW ? "#4B2E83" : "#4B2E83") : "#000";

  // If not signed in, use special layout
  if (!user) {
    return (
      <nav className="w-full flex items-center justify-between h-16 sm:h-20 px-8">
        <div className="flex shrink-0 items-center">
          <Logo color={logoColor} className="font-extrabold" />
        </div>
        <div className="flex items-center">
          <Link
            href="/sign-in"
            className="border-4 border-black rounded-lg text-black text-center text-xl font-bold not-italic leading-[normal] font-montserrat px-5 py-[5px] bg-white hover:bg-gray-100"
          >
            Sign in
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <Disclosure as="nav" className=" ">
      {({ open }) => (
        <>
          <div className="flex items-center bg-white h-16 sm:h-20">
            <div className="container px-2 sm:px-0">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex sm:hidden shrink-0 items-center">
                  <Logo isMobile color={logoColor} className="font-extrabold font-bold" />
                </div>
                <div className="sm:flex hidden shrink-0 items-center">
                  <Logo color={logoColor} className="font-extrabold font-bold" />
                </div>
                {pathname === "/" && (
                  <div className="flex flex-1 items-center justify-center ">
                    <div className="hidden sm:ml-6 sm:block">
                      {/* No navigation links */}
                    </div>
                  </div>
                )}
                {user ? (
                  <div className="hidden sm:flex absolute inset-y-0 right-0 gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link href="/calendar">
                      <button
                        type="button"
                        className={`text-white text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-[22px] py-[11px] rounded-lg ${isUW ? 'bg-[#4B2E83]' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        Calendar
                      </button>
                    </Link>
                    <UserNav
                      image={user?.imageUrl}
                      name={user?.fullName!}
                      email={user?.primaryEmailAddress?.emailAddress!}
                    />
                  </div>
                ) : (
                  <div className="hidden sm:flex absolute inset-y-0 right-0 gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link
                      href="/sign-in"
                      className="border-4 border-black rounded-lg text-black text-center text-xl font-bold not-italic leading-[normal] font-montserrat px-5 py-[5px] bg-white hover:bg-gray-100"
                    >
                      Sign in
                    </Link>
                  </div>
                )}
                <div className="block sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex  items-center justify-center rounded-md p-2 text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col gap-3 items-start">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal]"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {user ? (
                <div className="flex flex-col gap-3 w-full">
                  <Link
                    href="/calendar"
                    className="text-white text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-5 py-2 button"
                  >
                    Calendar
                  </Link>
                </div>
              ) : (
                <div className="flex gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link
                    href="/sign-in"
                    className="border rounded-lg border-solid border-[#2D2D2D] text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-5 py-[5px]"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className=" text-white text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-5 py-1.5 button"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
