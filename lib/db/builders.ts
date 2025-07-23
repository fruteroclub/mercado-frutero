import { prisma } from '../prisma'

export async function getAllBuilders(limit = 20) {
  return prisma.builderProfile.findMany({
    include: {
      user: true,
      projects: {
        include: {
          _count: {
            select: {
              follows: true,
              reactions: true,
              updates: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}

export async function getBuilderStats(builderId: string) {
  const builder = await prisma.builderProfile.findUnique({
    where: { id: builderId },
    include: {
      user: true, // Include the user relation
      projects: {
        include: {
          _count: {
            select: {
              follows: true,
              reactions: true,
              updates: true,
            },
          },
        },
      },
    },
  })

  if (!builder) return null

  // Calculate stats
  const totalFollowers = builder.projects.reduce(
    (acc, project) => acc + project._count.follows,
    0
  )
  
  const totalUpdates = builder.projects.reduce(
    (acc, project) => acc + project._count.updates,
    0
  )

  // Mock consistency score for now (could be calculated based on update frequency)
  const consistencyScore = Math.min(95, 60 + (totalUpdates * 5))
  
  // Mock community rating (could be calculated from reactions/follows ratio)
  const communityRating = Math.min(5.0, 3.5 + (totalFollowers * 0.01))

  return {
    ...builder,
    stats: {
      totalFollowers,
      totalUpdates,
      consistencyScore,
      communityRating: Math.round(communityRating * 10) / 10,
    },
  }
}