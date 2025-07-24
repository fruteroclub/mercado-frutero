import { NextResponse } from 'next/server'
import { getAllActiveProjects, createProject } from '@/lib/db/projects'
import { createUser, getUserByWallet, createBuilderProfile } from '@/lib/db/users'

// Mock data for development (fallback if DB is unavailable)
const mockProjects = [
  {
    id: 'sample-project-id',
    name: 'EcoTrack',
    tagline: 'Track your carbon footprint and earn rewards for sustainable choices',
    problem: 'Climate change is accelerating, but individuals lack easy ways to track and reduce their carbon footprint in daily life.',
    solution: 'A mobile app that automatically tracks carbon footprint through spending patterns and rewards sustainable choices with tokens.',
    targetMarket: 'Environmentally conscious millennials and Gen Z users in Latin America',
    timelineWeeks: 10,
    status: 'ACTIVE',
    builder: {
      user: {
        id: 'user-1',
        username: 'maria_builder',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      },
      fullName: 'María García',
      location: 'Mexico City, Mexico',
      skills: ['React', 'Node.js', 'TypeScript', 'Product Management', 'UI/UX'],
    },
    _count: {
      follows: 23,
      reactions: 45,
      updates: 3,
      comments: 12,
    },
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'project-2',
    name: 'LocalConnect',
    tagline: 'Connecting local businesses with their communities through social commerce',
    problem: 'Small local businesses struggle to compete with large e-commerce platforms and lack digital presence.',
    solution: 'A hyperlocal marketplace that connects neighbors with local businesses through social recommendations and community features.',
    targetMarket: 'Local businesses and community-focused consumers in Latin American cities',
    timelineWeeks: 12,
    status: 'ACTIVE',
    builder: {
      user: {
        id: 'user-2',
        username: 'carlos_entrepreneur',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      },
      fullName: 'Carlos Rodríguez',
      location: 'Buenos Aires, Argentina',
      skills: ['Business Development', 'Marketing', 'Community Building', 'E-commerce'],
    },
    _count: {
      follows: 31,
      reactions: 67,
      updates: 5,
      comments: 18,
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'project-3',
    name: 'EduChain',
    tagline: 'Blockchain-verified educational certificates for remote learning',
    problem: 'Remote education lacks credible certification and verification systems that employers trust.',
    solution: 'A blockchain-based platform that issues tamper-proof educational certificates and creates a decentralized learning network.',
    targetMarket: 'Remote learners, educational institutions, and employers seeking verified skills',
    timelineWeeks: 16,
    status: 'ACTIVE',
    builder: {
      user: {
        id: 'user-3',
        username: 'ana_developer',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      },
      fullName: 'Ana Fernández',
      location: 'Bogotá, Colombia',
      skills: ['Blockchain', 'Solidity', 'React', 'EdTech', 'Smart Contracts'],
    },
    _count: {
      follows: 18,
      reactions: 29,
      updates: 2,
      comments: 8,
    },
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'project-4',
    name: 'HealthBot',
    tagline: 'AI-powered healthcare assistant for underserved communities',
    problem: 'Rural and underserved communities lack access to basic healthcare information and preliminary diagnosis.',
    solution: 'An AI chatbot that provides health information, symptom checking, and connects users with nearby healthcare resources.',
    targetMarket: 'Underserved communities, rural populations, and healthcare-conscious individuals',
    timelineWeeks: 14,
    status: 'ACTIVE',
    builder: {
      user: {
        id: 'user-4',
        username: 'diego_health',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
      },
      fullName: 'Diego Morales',
      location: 'Lima, Peru',
      skills: ['AI/ML', 'Healthcare', 'Python', 'NLP', 'Mobile Development'],
    },
    _count: {
      follows: 27,
      reactions: 41,
      updates: 4,
      comments: 15,
    },
    createdAt: new Date('2024-01-20'),
  },
]

export async function GET() {
  try {
    // Try to get data from database first
    let projects
    try {
      projects = await getAllActiveProjects(20)
    } catch (dbError) {
      console.warn('Database unavailable, using mock data:', dbError)
      projects = mockProjects
    }
    
    // Sort by trending (combination of recent activity and engagement)
    const trendingProjects = projects
      .map(project => ({
        ...project,
        trendingScore: 
          (project._count.follows * 0.3) +
          (project._count.reactions * 0.2) +
          (project._count.updates * 0.5) +
          (new Date().getTime() - new Date(project.createdAt).getTime() > 30 * 24 * 60 * 60 * 1000 ? 0 : 10) // Recent bonus
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)

    return NextResponse.json({
      success: true,
      projects: trendingProjects,
      source: projects === mockProjects ? 'mock' : 'database'
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch projects',
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    const {
      // Personal Info
      fullName,
      bio,
      location,
      skills,
      
      // Project Info
      projectName,
      tagline,
      problemStatement,
      solution,
      targetMarket,
      
      // Metadata
      walletAddress = '0x' + Math.random().toString(16).substring(2), // Mock wallet for testing
      username = fullName?.toLowerCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(7)
    } = data

    // Validate required fields
    if (!fullName || !projectName || !tagline || !problemStatement || !solution) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: fullName, projectName, tagline, problemStatement, solution'
      }, { status: 400 })
    }

    // Try to create the project in database
    try {
      // 1. Create or get user
      let user = await getUserByWallet(walletAddress)
      if (!user) {
        await createUser({
          walletAddress,
          username,
          role: 'BUILDER'
        })
        // Fetch the complete user with builderProfile relation
        user = await getUserByWallet(walletAddress)
        if (!user) {
          throw new Error('Failed to create user')
        }
      }

      // 2. Create or get builder profile
      let builderProfile = user.builderProfile
      if (!builderProfile) {
        await createBuilderProfile({
          userId: user.id,
          fullName,
          bio,
          location,
          skills: skills || []
        })
        // Re-fetch user to get the complete builderProfile with projects
        const updatedUser = await getUserByWallet(walletAddress)
        if (!updatedUser?.builderProfile) {
          throw new Error('Failed to create builder profile')
        }
        builderProfile = updatedUser.builderProfile
      }

      // 3. Create project
      const project = await createProject({
        builderId: builderProfile.id,
        name: projectName,
        tagline,
        problem: problemStatement,
        solution,
        targetMarket,
        timelineWeeks: 8 // Default timeline
      })

      return NextResponse.json({
        success: true,
        project,
        message: 'Project created successfully!'
      })

    } catch (dbError) {
      console.warn('Database unavailable, returning success for testing:', dbError)
      
      // Return a mock response for testing when DB is not available
      const mockProject = {
        id: 'test-project-' + Date.now(),
        name: projectName,
        tagline,
        problem: problemStatement,
        solution,
        targetMarket,
        status: 'ACTIVE',
        timelineWeeks: 8,
        createdAt: new Date(),
        builder: {
          id: 'test-builder-' + Date.now(),
          fullName,
          bio,
          location,
          skills: skills || [],
          user: {
            id: 'test-user-' + Date.now(),
            username,
            walletAddress,
            role: 'BUILDER'
          }
        }
      }

      return NextResponse.json({
        success: true,
        project: mockProject,
        message: 'Project created successfully! (using mock data)',
        source: 'mock'
      })
    }

  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create project'
    }, { status: 500 })
  }
}