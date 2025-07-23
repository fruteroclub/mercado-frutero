import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample users
  const communityUser = await prisma.user.upsert({
    where: { walletAddress: '0x1234567890123456789012345678901234567890' },
    update: {},
    create: {
      walletAddress: '0x1234567890123456789012345678901234567890',
      username: 'carlos_supporter',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      role: 'COMMUNITY',
    },
  })

  const builderUser = await prisma.user.upsert({
    where: { walletAddress: '0x0987654321098765432109876543210987654321' },
    update: {},
    create: {
      walletAddress: '0x0987654321098765432109876543210987654321',
      username: 'maria_builder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      role: 'BUILDER',
    },
  })

  // Create builder profile
  const builderProfile = await prisma.builderProfile.upsert({
    where: { userId: builderUser.id },
    update: {},
    create: {
      userId: builderUser.id,
      fullName: 'María García',
      bio: 'Full-stack developer passionate about solving real-world problems with technology. Building the future of Latin American startups.',
      twitter: '@maria_builds',
      location: 'Mexico City, Mexico',
      skills: ['React', 'Node.js', 'TypeScript', 'Product Management', 'UI/UX'],
    },
  })

  // Create sample project
  const project = await prisma.project.upsert({
    where: { id: 'sample-project-id' },
    update: {},
    create: {
      id: 'sample-project-id',
      builderId: builderProfile.id,
      name: 'EcoTrack',
      tagline: 'Track your carbon footprint and earn rewards for sustainable choices',
      problem: 'Climate change is accelerating, but individuals lack easy ways to track and reduce their carbon footprint in daily life.',
      solution: 'A mobile app that automatically tracks carbon footprint through spending patterns and rewards sustainable choices with tokens.',
      targetMarket: 'Environmentally conscious millennials and Gen Z users in Latin America',
      timelineWeeks: 10,
      status: 'ACTIVE',
    },
  })

  // Create sample weekly update
  await prisma.weeklyUpdate.upsert({
    where: {
      projectId_weekNumber: {
        projectId: project.id,
        weekNumber: 1,
      },
    },
    update: {},
    create: {
      projectId: project.id,
      weekNumber: 1,
      content: `# Week 1 Progress Report

## 🎯 This Week's Focus
Completed initial market research and started building the MVP. Had great conversations with potential users!

## 📊 Key Metrics
- 25 user interviews completed
- 3 key insights documented
- MVP wireframes 60% complete

## 💡 Key Learnings
- Users want automatic tracking, not manual input
- Gamification is crucial for engagement
- Local rewards (coffee shops, etc.) more appealing than abstract credits`,
      achievements: [
        'Completed 25 user interviews',
        'Defined core user personas',
        'Started MVP development',
        'Set up development environment'
      ],
      challenges: [
        'Finding developers for React Native',
        'Validating carbon tracking algorithms',
        'Securing partnerships with local businesses'
      ],
      nextWeekGoals: [
        'Complete MVP wireframes',
        'Start building authentication system',
        'Reach out to 10 potential business partners',
        'Set up analytics tracking'
      ],
      mediaUrls: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      ],
      metrics: {
        userInterviews: 25,
        mvpProgress: 15,
        partnerships: 0,
      },
    },
  })

  // Create follow relationship
  await prisma.follow.upsert({
    where: {
      userId_projectId: {
        userId: communityUser.id,
        projectId: project.id,
      },
    },
    update: {},
    create: {
      userId: communityUser.id,
      projectId: project.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('Sample data:')
  console.log(`- Community User: ${communityUser.username} (${communityUser.walletAddress})`)
  console.log(`- Builder User: ${builderUser.username} (${builderUser.walletAddress})`)
  console.log(`- Project: ${project.name}`)
  console.log(`- Project URL: /projects/${project.id}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })