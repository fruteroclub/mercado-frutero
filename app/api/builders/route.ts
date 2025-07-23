import { NextResponse } from 'next/server'
import { getAllBuilders, getBuilderStats } from '@/lib/db/builders'

// Mock data for trending builders (fallback)
const mockBuilders = [
  {
    id: 'user-1',
    user: {
      username: 'maria_builder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      role: 'BUILDER',
    },
    fullName: 'María García',
    bio: 'Full-stack developer passionate about solving real-world problems with technology. Building the future of Latin American startups.',
    location: 'Mexico City, Mexico',
    skills: ['React', 'Node.js', 'TypeScript', 'Product Management', 'UI/UX'],
    projects: [
      {
        id: 'sample-project-id',
        name: 'EcoTrack',
        status: 'ACTIVE',
        _count: {
          follows: 23,
          reactions: 45,
          updates: 3,
        }
      }
    ],
    stats: {
      totalFollowers: 156,
      totalUpdates: 12,
      consistencyScore: 95,
      communityRating: 4.8,
    }
  },
  {
    id: 'user-2',
    user: {
      username: 'carlos_entrepreneur',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      role: 'BUILDER',
    },
    fullName: 'Carlos Rodríguez',
    bio: 'Serial entrepreneur focused on hyperlocal solutions. Helping small businesses thrive in the digital age.',
    location: 'Buenos Aires, Argentina',
    skills: ['Business Development', 'Marketing', 'Community Building', 'E-commerce'],
    projects: [
      {
        id: 'project-2',
        name: 'LocalConnect',
        status: 'ACTIVE',
        _count: {
          follows: 31,
          reactions: 67,
          updates: 5,
        }
      }
    ],
    stats: {
      totalFollowers: 203,
      totalUpdates: 15,
      consistencyScore: 88,
      communityRating: 4.6,
    }
  },
  {
    id: 'user-3',
    user: {
      username: 'ana_developer',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      role: 'BUILDER',
    },
    fullName: 'Ana Fernández',
    bio: 'Blockchain developer and educator. Making decentralized technology accessible for everyone.',
    location: 'Bogotá, Colombia',
    skills: ['Blockchain', 'Solidity', 'React', 'EdTech', 'Smart Contracts'],
    projects: [
      {
        id: 'project-3',
        name: 'EduChain',
        status: 'ACTIVE',
        _count: {
          follows: 18,
          reactions: 29,
          updates: 2,
        }
      }
    ],
    stats: {
      totalFollowers: 134,
      totalUpdates: 8,
      consistencyScore: 75,
      communityRating: 4.9,
    }
  },
  {
    id: 'user-4',
    user: {
      username: 'diego_health',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
      role: 'BUILDER',
    },
    fullName: 'Diego Morales',
    bio: 'AI researcher passionate about healthcare accessibility. Using technology to bridge the healthcare gap.',
    location: 'Lima, Peru',
    skills: ['AI/ML', 'Healthcare', 'Python', 'NLP', 'Mobile Development'],
    projects: [
      {
        id: 'project-4',
        name: 'HealthBot',
        status: 'ACTIVE',
        _count: {
          follows: 27,
          reactions: 41,
          updates: 4,
        }
      }
    ],
    stats: {
      totalFollowers: 189,
      totalUpdates: 11,
      consistencyScore: 92,
      communityRating: 4.7,
    }
  },
]

export async function GET() {
  try {
    // Try to get data from database first
    let builders
    try {
      const rawBuilders = await getAllBuilders(20)
      // Enhance with stats
      builders = await Promise.all(
        rawBuilders.map(async (builder) => {
          const builderWithStats = await getBuilderStats(builder.id)
          return builderWithStats
        })
      )
    } catch (dbError) {
      console.warn('Database unavailable, using mock data:', dbError)
      builders = mockBuilders
    }

    // Sort by trending score (engagement + consistency + recent activity)
    const trendingBuilders = builders
      .filter(builder => builder !== null)
      .map(builder => ({
        ...builder,
        trendingScore: 
          (builder.stats.totalFollowers * 0.2) +
          (builder.stats.consistencyScore * 0.4) +
          (builder.stats.communityRating * 20) +
          (builder.projects.reduce((acc, project) => 
            acc + project._count.reactions + project._count.follows, 0) * 0.1)
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)

    return NextResponse.json({
      success: true,
      builders: trendingBuilders,
      source: builders === mockBuilders ? 'mock' : 'database'
    })
  } catch (error) {
    console.error('Error fetching builders:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch builders',
    }, { status: 500 })
  }
}