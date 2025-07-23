'use client'

import { useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
  }

  const handleContinue = () => {
    if (selectedRole === 'builder') {
      router.push('/onboarding/builder')
    } else {
      // For community/mentor, redirect to main app or community page
      router.push('/discover')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Welcome</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Progress Dots */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What brings you here?
            </h2>
            <p className="text-gray-600 mb-8">
              Are you a builder, community member, or mentor?
            </p>

            {/* Role Selection Cards */}
            <div className="space-y-4">
              {/* Builder Card */}
              <button
                onClick={() => handleRoleSelect('builder')}
                className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                  selectedRole === 'builder'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Builder
                    </h3>
                    <p className="text-sm text-gray-600">
                      I'm Building Something
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Get accountability, support, and funding
                    </p>
                  </div>
                </div>
              </button>

              {/* Community Member Card */}
              <button
                onClick={() => handleRoleSelect('community')}
                className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                  selectedRole === 'community'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💪</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Community Member
                    </h3>
                    <p className="text-sm text-gray-600">
                      I Want to Support Builders
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Discover projects early and earn rewards
                    </p>
                  </div>
                </div>
              </button>

              {/* Mentor Card */}
              <button
                onClick={() => handleRoleSelect('mentor')}
                className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                  selectedRole === 'mentor'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Mentor
                    </h3>
                    <p className="text-sm text-gray-600">
                      I Want to Mentor
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Share expertise and guide builders
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
              selectedRole
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}