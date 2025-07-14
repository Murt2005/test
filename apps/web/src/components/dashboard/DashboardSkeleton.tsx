"use client";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full animate-pulse" />
              <div className="text-white">
                <div className="h-8 w-64 bg-white bg-opacity-20 rounded animate-pulse mb-2" />
                <div className="h-4 w-32 bg-white bg-opacity-20 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-white bg-opacity-20 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-20 bg-white bg-opacity-20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="h-8 w-80 bg-white bg-opacity-20 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-white bg-opacity-20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Cards Skeleton */}
            <div className="space-y-6">
              <div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gray-100 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-4" />
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Widgets Skeleton */}
            <div className="space-y-6">
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="flex-1">
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-3" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-1" />
                      <div className="flex-1">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
