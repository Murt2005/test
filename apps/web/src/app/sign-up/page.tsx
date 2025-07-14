"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CollegeEmailInput from "@/components/auth/CollegeEmailInput";
import { api } from "@frosh/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed firstName and lastName
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [college, setCollege] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const linkUserToCollege = useMutation(api.collegeAuth.linkUserToCollege);

  const handleEmailValidation = (isValid: boolean, collegeInfo?: any) => {
    setIsEmailValid(isValid);
    setCollege(collegeInfo);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailValid) {
      setError("Please enter a valid college email address");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Only pass email and password to Clerk
      const result = await signUp?.create({
        emailAddress: email,
        password: password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Link user to college in our database (no first/last name)
        if (result.createdUserId) {
          await linkUserToCollege({
            userId: result.createdUserId,
            email: email,
          });
        }
        router.push("/courses");
      } else if (result?.status === "missing_requirements") {
        // Redirect to /verify-code for code entry
        router.push("/verify-code");
      }
    } catch (err: any) {
      console.error("Sign-up error:", err);
      setError(err.errors?.[0]?.message || "An error occurred during sign-up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Join UniVerse</h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect with your college community
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Clerk CAPTCHA widget for bot protection */}
          <div id="clerk-captcha" className="mb-6" />
          <form className="space-y-6" onSubmit={handleSignUp}>
            {/* College Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                College Email Address
              </label>
              <div className="mt-1">
                <CollegeEmailInput
                  value={email}
                  onChange={setEmail}
                  onValidationChange={handleEmailValidation}
                  placeholder="your.email@university.edu"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Create a password (min. 8 characters)"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!isEmailValid || isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
