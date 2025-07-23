'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  FireIcon, 
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

type Project = {
  id: string
  name: string
  tagline: string
  problem: string
  solution: string
  targetMarket: string
  timelineWeeks: number
  status: string
  builder: {
    user: {
      id: string
      username: string
      avatarUrl: string
    }
    fullName: string
    location: string
    skills: string[]
  }
  _count: {
    follows: number
    reactions: number
    updates: number
    comments: number
  }
  createdAt: string
  trendingScore?: number
}

type Builder = {
  id: string
  user: {
    username: string
    avatarUrl: string
    role: string
  }
  fullName: string
  bio: string
  location: string
  skills: string[]
  projects: Array<{
    id: string
    name: string
    status: string
    _count: {
      follows: number
      reactions: number
      updates: number
    }
  }>
  stats: {
    totalFollowers: number
    totalUpdates: number
    consistencyScore: number
    communityRating: number
  }
  trendingScore?: number
}

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'builders'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [builders, setBuilders] = useState<Builder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [followedProjects, setFollowedProjects] = useState<Set<string>>(new Set())
  const [dataSource, setDataSource] = useState<'database' | 'mock'>('database')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [projectsRes, buildersRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/builders')
      ])
      
      const projectsData = await projectsRes.json()
      const buildersData = await buildersRes.json()
      
      if (projectsData.success) {
        setProjects(projectsData.projects)
        setDataSource(projectsData.source || 'database')
      }
      if (buildersData.success) {
        setBuilders(buildersData.builders)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = (projectId: string) => {
    const newFollowed = new Set(followedProjects)
    if (newFollowed.has(projectId)) {
      newFollowed.delete(projectId)
    } else {
      newFollowed.add(projectId)
    }
    setFollowedProjects(newFollowed)
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.builder.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBuilders = builders.filter(builder =>
    builder.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    builder.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    builder.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    builder.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FireIcon className="w-8 h-8 text-orange-500" />
                Discover
              </h1>
              <p className="text-gray-600 mt-1">
                Find trending projects and builders in the community
              </p>
              {dataSource === 'mock' && (
                <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  ⚠️ Using demo data
                </div>
              )}
              {dataSource === 'database' && (
                <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  ✅ Live data
                </div>
              )}
            </div>
            
            {/* Search */}
            <div className="relative max-w-md w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, builders, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Projects ({filteredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('builders')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'builders'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Builders ({filteredBuilders.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={project.builder?.user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + project.id}
                        alt={project.builder?.fullName || 'Builder'}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          <Link href={`/projects/${project.id}`} className="hover:text-blue-600">
                            {project.name}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-2">{project.tagline}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center gap-1">
                            <img src={project.builder?.user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + project.id} alt="" className="w-4 h-4 rounded-full" />
                            {project.builder?.fullName || 'Unknown Builder'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            {project.builder?.location || 'Unknown location'}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {project.timelineWeeks || 8} weeks
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleFollow(project.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        followedProjects.has(project.id)
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {followedProjects.has(project.id) ? (
                        <>
                          <HeartSolidIcon className="w-4 h-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <HeartIcon className="w-4 h-4" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    <span className="font-medium">Problem:</span> {project.problem}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.builder?.skills || []).slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {(project.builder?.skills || []).length > 4 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{(project.builder?.skills || []).length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        {project._count?.follows || 0} followers
                      </span>
                      <span className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4" />
                        {project._count?.reactions || 0} reactions
                      </span>
                      <span className="flex items-center gap-1">
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        {project._count?.comments || 0} comments
                      </span>
                      <span className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        {project._count?.updates || 0} updates
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm">
                      <FireIcon className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-600 font-medium">Trending</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'builders' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuilders.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No builders found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredBuilders.map((builder) => (
                <div key={builder.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <img
                      src={builder.user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + builder.id}
                      alt={builder.fullName}
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                    />
                    <h3 className="text-lg font-bold text-gray-900">{builder.fullName}</h3>
                    <p className="text-sm text-gray-600">@{builder.user?.username || 'unknown'}</p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                      <MapPinIcon className="w-4 h-4" />
                      {builder.location || 'Unknown location'}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {builder.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {(builder.skills || []).slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {(builder.skills || []).length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{builder.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    {(builder.projects || []).slice(0, 2).map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-sm text-gray-900">{project.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                          <span>{project._count?.follows || 0} followers</span>
                          <span>{project._count?.updates || 0} updates</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center text-sm border-t border-gray-100 pt-4">
                    <div>
                      <div className="font-bold text-gray-900">{builder.stats?.consistencyScore || 0}%</div>
                      <div className="text-gray-600">Consistency</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{builder.stats?.communityRating || 0}</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}