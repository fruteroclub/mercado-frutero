import { prisma } from '../prisma'
import type { ProjectStatus } from '../generated/prisma'

export async function createProject(data: {
  builderId: string
  name: string
  tagline: string
  problem: string
  solution: string
  targetMarket?: string
  timelineWeeks?: number
}) {
  return prisma.project.create({
    data: {
      builderId: data.builderId,
      name: data.name,
      tagline: data.tagline,
      problem: data.problem,
      solution: data.solution,
      targetMarket: data.targetMarket,
      timelineWeeks: data.timelineWeeks || 8,
    },
    include: {
      builder: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      builder: {
        include: {
          user: true,
        },
      },
      updates: {
        orderBy: {
          weekNumber: 'desc',
        },
        take: 5,
      },
      _count: {
        select: {
          follows: true,
          reactions: true,
          comments: true,
        },
      },
    },
  })
}

export async function getProjectsByBuilder(builderId: string) {
  return prisma.project.findMany({
    where: { builderId },
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
  })
}

export async function getAllActiveProjects(limit = 20) {
  return prisma.project.findMany({
    where: {
      status: 'ACTIVE',
    },
    include: {
      builder: {
        include: {
          user: true,
        },
      },
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
    take: limit,
  })
}

export async function updateProjectStatus(id: string, status: ProjectStatus) {
  return prisma.project.update({
    where: { id },
    data: { status },
  })
}

export async function followProject(userId: string, projectId: string) {
  return prisma.follow.create({
    data: {
      userId,
      projectId,
    },
  })
}

export async function unfollowProject(userId: string, projectId: string) {
  return prisma.follow.delete({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  })
}

export async function isFollowingProject(userId: string, projectId: string) {
  const follow = await prisma.follow.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  })
  return !!follow
}