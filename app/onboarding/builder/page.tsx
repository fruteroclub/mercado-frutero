'use client'

import { useState } from 'react'
import { ArrowLeftIcon, PlusIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

type FormData = {
  // Personal Info
  fullName: string
  bio: string
  location: string
  skills: string[]
  
  // Project Info
  projectName: string
  tagline: string
  problemStatement: string
  solution: string
  targetMarket: string
  teamMembers: string[]
  
  // Milestones
  milestones: Array<{
    week: string
    title: string
    description: string
  }>
  
  // Goals
  goals: string[]
  deadline: string
  visibility: 'public' | 'private'
}

export default function BuilderOnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    bio: '',
    location: '',
    skills: [],
    projectName: '',
    tagline: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    teamMembers: [],
    milestones: [
      { week: 'Week 1-2', title: 'Project Setup', description: 'Define project scope and team roles' },
      { week: 'Week 3-6', title: 'Development', description: 'Build core features and integrations' },
      { week: 'Week 7-8', title: 'Testing & Launch', description: 'User testing and final deployment' }
    ],
    goals: [],
    deadline: '',
    visibility: 'public'
  })
  
  const router = useRouter()

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Final step - launch the journey
      handleLaunch()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const handleLaunch = async () => {
    // TODO: Submit to API
    console.log('Launching project:', formData)
    router.push('/dashboard')
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      })
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  const addGoal = (goal: string) => {
    if (goal && !formData.goals.includes(goal)) {
      setFormData({
        ...formData,
        goals: [...formData.goals, goal]
      })
    }
  }

  const removeGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.filter(g => g !== goal)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {step === 1 && 'Welcome'}
            {step === 2 && 'Create Project'}
            {step === 3 && 'Plan your milestones'}
            {step === 4 && 'Set Your First Week Goals'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="w-full max-w-md mx-auto">
          {/* Progress Dots */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === step ? 'bg-blue-600' : i < step ? 'bg-blue-400' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tell us about you
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Juan García"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="I'm a developer passionate about..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Mexico City, Mexico"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add your skills... (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Creation */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Create your project
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    placeholder="Enter project name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    One-line Description *
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                    placeholder="Briefly describe your project"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problem Statement *
                  </label>
                  <textarea
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({...formData, problemStatement: e.target.value})}
                    placeholder="Describe the problem your project addresses"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solution *
                  </label>
                  <textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({...formData, solution: e.target.value})}
                    placeholder="How will you solve this problem?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Market/Users
                  </label>
                  <input
                    type="text"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                    placeholder="Who are your ideal users?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Members
                  </label>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <PlusIcon className="w-4 h-4" />
                    Add Team Member
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <PhotoIcon className="w-5 h-5 text-gray-400" />
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Milestones */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Set your milestones
              </h2>
              <p className="text-gray-600 mb-6">
                Drag and drop milestones to create a timeline for the next 8-12 weeks. Use templates or create your own.
              </p>
              
              <div className="space-y-4 mb-8">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{milestone.week}: {milestone.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Suggested Milestones</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                    Community Building
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                    Product Development
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                    Marketing & Outreach
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: First Week Goals */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Set Your First Week Goals
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Goal 1: Product</h3>
                  <h3 className="font-medium text-gray-900">Goal 2: Users</h3>
                  <h3 className="font-medium text-gray-900">Goal 3: Revenue</h3>
                  <h3 className="font-medium text-gray-900">Goal 4: Product</h3>
                  <h3 className="font-medium text-gray-900">Goal 5: Users</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goals
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.goals.map((goal) => (
                      <span
                        key={goal}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {goal}
                        <button
                          onClick={() => removeGoal(goal)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add your goals... (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addGoal(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Deadline</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visibility
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={formData.visibility === 'public'}
                        onChange={(e) => setFormData({...formData, visibility: e.target.value as 'public' | 'private'})}
                        className="mr-2"
                      />
                      Public
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={formData.visibility === 'private'}
                        onChange={(e) => setFormData({...formData, visibility: e.target.value as 'public' | 'private'})}
                        className="mr-2"
                      />
                      Private
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              {step === 4 ? 'Launch Your Journey' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}