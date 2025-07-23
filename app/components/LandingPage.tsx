import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Token/Coin Visual */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-2xl">
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl font-bold">₿</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          From Builder to<br />
          Token Launch: Turn<br />
          Your Ideas Into<br />
          Funded Projects
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl">
          Join the community where consistent progress leads to community support and real funding
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Start Building
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <Link
            href="/discover"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-white/20"
          >
            Join Community
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Build */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build</h3>
              <p className="text-gray-600">
                Develop your project with our support
              </p>
            </div>

            {/* Step 2: Engage */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Engage</h3>
              <p className="text-gray-600">
                Connect with community and supporters
              </p>
            </div>

            {/* Step 3: Launch */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Launch</h3>
              <p className="text-gray-600">
                Launch your token with our guidance
              </p>
            </div>

            {/* Step 4: Grow */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grow</h3>
              <p className="text-gray-600">
                Expand your project with community backing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Success Stories */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Featured Success Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Project Alpha */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Project Alpha: Revolutionizing Education
              </h3>
              <p className="text-blue-600 font-semibold mb-4">
                Launched with $50K in community support
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Weekly Updates: 12</div>
                <div className="text-sm text-gray-600">Community Score: 95/100</div>
              </div>
            </div>

            {/* Project Beta */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Project Beta: Empowering Local Businesses
              </h3>
              <p className="text-green-600 font-semibold mb-4">
                Gained 200+ active community members
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Weekly Updates: 8</div>
                <div className="text-sm text-gray-600">Community Score: 88/100</div>
              </div>
            </div>
          </div>

          {/* Recent Project Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Recent Project Highlights
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Project Gamma: Sustainable Energy Solutions
                </h4>
                <p className="text-blue-600 font-semibold">
                  $20K raised, 100+ supporters
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Project Delta: Community Health Initiative
                </h4>
                <p className="text-green-600 font-semibold">
                  $30K raised, 150+ supporters
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="text-sm text-gray-600 mb-2">Active Builders</div>
              <div className="text-4xl font-bold text-gray-900">50+</div>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="text-sm text-gray-600 mb-2">Tokens Launched</div>
              <div className="text-4xl font-bold text-green-600">$100K+</div>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-lg md:col-span-3 lg:col-span-1">
              <div className="text-sm text-gray-600 mb-2">Community Supporters</div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <p className="text-gray-400">Community</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            @2024 Talent Incubator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}