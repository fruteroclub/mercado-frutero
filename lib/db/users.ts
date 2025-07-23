import { prisma } from '../prisma'
import type { UserRole } from '../generated/prisma'

export async function createUser(data: {
  walletAddress: string
  username?: string
  avatarUrl?: string
  role?: UserRole
}) {
  return prisma.user.create({
    data: {
      walletAddress: data.walletAddress,
      username: data.username,
      avatarUrl: data.avatarUrl,
      role: data.role || 'COMMUNITY',
    },
  })
}

export async function getUserByWallet(walletAddress: string) {
  return prisma.user.findUnique({
    where: {
      walletAddress,
    },
    include: {
      builderProfile: {
        include: {
          projects: true,
        },
      },
    },
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      builderProfile: {
        include: {
          projects: true,
        },
      },
    },
  })
}

export async function updateUser(id: string, data: {
  username?: string
  avatarUrl?: string
  role?: UserRole
}) {
  return prisma.user.update({
    where: { id },
    data,
  })
}

export async function createBuilderProfile(data: {
  userId: string
  fullName: string
  bio?: string
  twitter?: string
  location?: string
  skills: string[]
}) {
  return prisma.builderProfile.create({
    data,
    include: {
      user: true,
    },
  })
}

export async function getBuilderProfile(userId: string) {
  return prisma.builderProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      projects: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}