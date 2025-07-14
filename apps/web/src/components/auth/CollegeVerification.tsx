"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@frosh/backend/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

interface CollegeVerificationProps {
  children: React.ReactNode;
}

export default function CollegeVerification({ children }: CollegeVerificationProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);

  // Get user's college information
  const userCollege = useQuery(api.collegeAuth.getUserCollege);
  const linkUserToCollege = useMutation(api.collegeAuth.linkUserToCollege);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Check if user has verified their email
    if (!user.emailAddresses?.[0]?.verification?.status === "verified") {
      router.push("/verify-email");
      return;
    }

    // If user doesn't have college info, try to link them
    if (user && user.emailAddresses?.[0]?.emailAddress && !userCollege && !isVerifying) {
      setIsVerifying(true);
      
      const email = user.emailAddresses[0].emailAddress;
      const profileImage = user.imageUrl;

      linkUserToCollege({
        userId: user.id,
        email: email,
        profile_image: profileImage,
      }).catch((error) => {
        console.error("Failed to link user to college:", error);
        // If linking fails, redirect to sign-up with error
        router.push("/sign-up?error=invalid_email");
      }).finally(() => {
        setIsVerifying(false);
      });
    }
  }, [user, isLoaded, userCollege, router, linkUserToCollege, isVerifying]);

  // Show loading state while verifying
  if (!isLoaded || isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">Verifying your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your college email...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, don't render children
  if (!user) {
    return null;
  }

  // If user doesn't have college info, show verification required
  if (!userCollege) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">College Verification Required</h1>
            <p className="mt-2 text-sm text-gray-600">
              We need to verify your college email address before you can access this page.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push("/sign-up")}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has college info, render children
  return <>{children}</>;
} 
