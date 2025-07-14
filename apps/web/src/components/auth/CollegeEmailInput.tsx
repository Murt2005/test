"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@frosh/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { debounce } from "lodash";

interface CollegeEmailInputProps {
  value: string;
  onChange: (email: string) => void;
  onValidationChange: (isValid: boolean, college?: any) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

interface CollegeInfo {
  id: string;
  name: string;
  location: string;
  website: string;
  logo_url?: string;
}

export default function CollegeEmailInput({
  value,
  onChange,
  onValidationChange,
  placeholder = "Enter your college email",
  className = "",
  disabled = false,
}: CollegeEmailInputProps) {
  const [isValidating, setIsValidating] = useState(false);

  // Use Convex query for validation
  const validationResult = useQuery(api.collegeAuth.validateCollegeEmail, 
    value && value.includes("@") ? { email: value } : "skip"
  );

  // Update validation state when result changes
  useEffect(() => {
    if (validationResult) {
      if (validationResult.valid && validationResult.college) {
        onValidationChange(true, validationResult.college);
      } else {
        onValidationChange(false);
      }
    }
  }, [validationResult, onValidationChange]);

  // Debounced validation function for UI feedback
  const debouncedValidate = useCallback(
    debounce((email: string) => {
      if (!email || !email.includes("@")) {
        setIsValidating(false);
        return;
      }
      setIsValidating(true);
      // The actual validation is handled by the Convex query above
    }, 500),
    []
  );

  useEffect(() => {
    if (value) {
      debouncedValidate(value);
    } else {
      onValidationChange(false);
    }
  }, [value, debouncedValidate, onValidationChange]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            validationResult?.valid
              ? "border-green-500 bg-green-50"
              : validationResult?.valid === false
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
        {isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
        {validationResult?.valid && !isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* College Information Display */}
      {validationResult?.valid && validationResult.college && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            {validationResult.college.logo_url && (
              <img
                src={validationResult.college.logo_url}
                alt={`${validationResult.college.name} logo`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-green-800">
                {validationResult.college.name}
              </h4>
              <p className="text-sm text-green-600">
                {validationResult.college.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {validationResult?.valid === false && validationResult.message && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 flex items-center">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationResult.message}
          </p>
        </div>
      )}
    </div>
  );
} 
