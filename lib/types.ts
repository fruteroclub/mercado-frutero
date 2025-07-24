// Re-export Prisma types for convenience
import type {
  User,
  BuilderProfile,
  Project,
  WeeklyUpdate,
  Follow,
  Reaction,
  Comment,
  UserRole,
  ProjectStatus,
  ReactionType,
} from './generated/prisma'

export type {
  User,
  BuilderProfile,
  Project,
  WeeklyUpdate,
  Follow,
  Reaction,
  Comment,
  UserRole,
  ProjectStatus,
  ReactionType,
}

// Extended types for UI components
export type UserWithProfile = User & {
  builderProfile?: BuilderProfile & {
    projects: Project[]
  }
}

export type ProjectWithBuilder = Project & {
  builder: BuilderProfile & {
    user: User
  }
  _count?: {
    follows: number
    reactions: number
    comments: number
    updates: number
  }
  updates?: WeeklyUpdate[]
}

export type WeeklyUpdateWithDetails = WeeklyUpdate & {
  project: Project & {
    builder: BuilderProfile & {
      user: User
    }
  }
  reactions: (Reaction & { user: User })[]
  comments: (Comment & { user: User })[]
  _count?: {
    reactions: number
    comments: number
  }
}

// Form types for onboarding
export type CreateUserData = {
  walletAddress: string
  username?: string
  avatarUrl?: string
  role: UserRole
}

export type CreateBuilderProfileData = {
  fullName: string
  bio?: string
  twitter?: string
  location?: string
  skills: string[]
}

export type CreateProjectData = {
  name: string
  tagline: string
  problem: string
  solution: string
  targetMarket?: string
  timelineWeeks: number
}

export type CreateWeeklyUpdateData = {
  content: string
  achievements: string[]
  challenges: string[]
  nextWeekGoals: string[]
  mediaUrls?: string[]
  metrics?: Record<string, unknown>
}