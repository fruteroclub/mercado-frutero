'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon, 
  FireIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [weeklyUpdateDue] = useState(true)

  // Mock data - in real app this would come from API
  const stats = {
    followers: 12,
    totalUpdates: 0,
    communityRating: 0,
    daysInStreak: 0
  }

  const upcomingDeadline = "Friday, July 26th"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your Builder Dashboard! 🚀
          </h1>
          <p className="text-gray-600">
            Track your progress, engage with your community, and build in public.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Weekly Update Reminder */}
          {weeklyUpdateDue && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">
                    Weekly Update Due
                  </h3>
                  <p className="text-orange-800 text-sm mb-3">
                    Don&apos;t break your streak! Update due by {upcomingDeadline}
                  </p>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Post Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Start New Project */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <PlusIcon className="w-6 h-6 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Create Your First Project
                </h3>
                <p className="text-blue-800 text-sm mb-3">
                  Start your journey by setting up your project profile and goals.
                </p>
                <Link
                  href="/onboarding/builder"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start">
              <UserGroupIcon className="w-6 h-6 text-green-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">
                  Join the Community
                </h3>
                <p className="text-green-800 text-sm mb-3">
                  Discover other builders and find projects to support.
                </p>
                <Link
                  href="/discover"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CalendarIcon className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUpdates}</p>
                <p className="text-sm text-gray-600">Updates</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FireIcon className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.daysInStreak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.communityRating}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
              <p className="text-gray-600 mb-4">
                Start building your project and engaging with the community to see activity here.
              </p>
              <Link
                href="/onboarding/builder"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Your First Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}