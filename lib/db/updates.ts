import { prisma } from '../prisma'
import type { ReactionType } from '../generated/prisma'

export async function createWeeklyUpdate(data: {
  projectId: string
  weekNumber: number
  content: string
  achievements: string[]
  challenges: string[]
  nextWeekGoals: string[]
  mediaUrls?: string[]
  metrics?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  return prisma.weeklyUpdate.create({
    data,
    include: {
      project: {
        include: {
          builder: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })
}

export async function getWeeklyUpdate(id: string) {
  return prisma.weeklyUpdate.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          builder: {
            include: {
              user: true,
            },
          },
        },
      },
      reactions: {
        include: {
          user: true,
        },
      },
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })
}

export async function getProjectUpdates(projectId: string) {
  return prisma.weeklyUpdate.findMany({
    where: { projectId },
    include: {
      _count: {
        select: {
          reactions: true,
          comments: true,
        },
      },
    },
    orderBy: {
      weekNumber: 'desc',
    },
  })
}

export async function getLatestUpdates(limit = 10) {
  return prisma.weeklyUpdate.findMany({
    include: {
      project: {
        include: {
          builder: {
            include: {
              user: true,
            },
          },
        },
      },
      _count: {
        select: {
          reactions: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}

export async function addReaction(data: {
  userId: string
  projectId?: string
  weeklyUpdateId?: string
  type: ReactionType
}) {
  return prisma.reaction.upsert({
    where: {
      userId_projectId_type: data.projectId
        ? {
            userId: data.userId,
            projectId: data.projectId,
            type: data.type,
          }
        : undefined,
      userId_weeklyUpdateId_type: data.weeklyUpdateId
        ? {
            userId: data.userId,
            weeklyUpdateId: data.weeklyUpdateId,
            type: data.type,
          }
        : undefined,
    },
    update: {},
    create: data,
  })
}

export async function removeReaction(data: {
  userId: string
  projectId?: string
  weeklyUpdateId?: string
  type: ReactionType
}) {
  const where = data.projectId
    ? {
        userId_projectId_type: {
          userId: data.userId,
          projectId: data.projectId,
          type: data.type,
        },
      }
    : {
        userId_weeklyUpdateId_type: {
          userId: data.userId,
          weeklyUpdateId: data.weeklyUpdateId!,
          type: data.type,
        },
      }

  return prisma.reaction.delete({ where })
}

export async function addComment(data: {
  userId: string
  projectId?: string
  weeklyUpdateId?: string
  content: string
}) {
  return prisma.comment.create({
    data,
    include: {
      user: true,
    },
  })
}