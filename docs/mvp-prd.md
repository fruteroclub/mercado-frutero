# PRD: kiwik MVP - Talent Incubator with Token Launch

## 1. Product Overview

### 1.1 Document Information

- **Product**: kiwik MVP - Talent Incubator Launchpad
- **Version**: 1.0 MVP
- **Date**: July 2025
- **Team**: Frutero Club Engineering

### 1.2 Product Summary

kiwik MVP is a streamlined talent incubator that transforms builders into "Hackers de Alto Impacto" through community-driven progress tracking and milestone-based token launches. The platform creates a marketplace where builders demonstrate consistent progress, receive community support, and launch tokens when they achieve predetermined milestones.

**Core Value Proposition**: Transform the traditional "build in public" approach into a structured journey with tangible rewards for both builders and early supporters.

### 1.3 MVP Scope Reduction

This MVP focuses on the essential flow:

```
Builder → Weekly Goals → Community Tracking → Milestone Achievement → Token Launch → Community Rewards
```

## 2. Goals & Success Metrics

### 2.1 Business Goals

- Validate product-market fit for token-based talent incubation
- Generate initial revenue through platform fees (2-3% of token launches)
- Build sustainable community of 100+ active members
- Achieve 5+ successful token launches in first 6 months
- Establish foundation for regional talent pipeline

### 2.2 User Goals

- **Builders**: Get accountability, community support, and funding through consistent progress
- **Community Members**: Discover promising projects early and earn rewards for support
- **Mentors**: Share expertise while building reputation and earning tokens

### 2.3 Success Metrics

**Builder Metrics:**

- 70%+ weekly update rate
- 50%+ achieve first major milestone
- 25%+ qualify for token launch

**Community Metrics:**

- 100+ active community members
- 10+ qualified builders simultaneously
- 20%+ average ROI for community supporters

**Platform Metrics:**

- $10K+ average token launch size
- $5K+ monthly platform revenue by month 6
- 80%+ user satisfaction rating

## 3. User Personas (MVP)

### 3.1 Primary Personas

**María la Builder** (Primary Focus)

- 25-35 years old developer/entrepreneur
- Has project idea but needs accountability and funding
- Wants to "build in public" with structured support
- Located in Latin America

**Carlos el Supporter** (Secondary)

- 30-45 years old professional with disposable income
- Wants to support emerging talent and earn returns
- Enjoys following entrepreneurial journeys
- Has $500-5000 to invest in multiple projects

**Ana la Mentor** (Tertiary)

- 35-50 years old experienced entrepreneur
- Wants to give back and build reputation
- Has 2-5 hours/week to dedicate
- Interested in token rewards for guidance

## 4. MVP Feature Set

### 4.1 Core Features (Must Have)

**Builder Profile & Project Setup**

- Basic project profile (problem, solution, team)
- 8-12 week milestone roadmap
- Weekly goal setting interface
- Progress tracking dashboard

**Weekly Update System**

- Mandatory Friday progress posts
- Structured update template (wins, metrics, challenges, next week goals)
- Photo/video upload capability
- Streak counter and penalty system

**Community Engagement**

- Follow/unfollow builders
- React and comment on updates
- Simple reputation scoring system
- Leaderboards (builders and supporters)

**Milestone & Token Launch**

- Predefined qualification criteria
- Community voting on readiness
- Basic token creation on Base L2
- Allocation system for early supporters

### 4.2 Nice-to-Have Features (Future)

- Advanced analytics dashboard
- Mentor booking system
- Mobile app
- Video call integration
- Advanced tokenomics

### 4.3 Explicitly Out of Scope

- Complex DeFi integrations
- Multi-chain support
- Advanced social features
- Sophisticated investment tools
- Enterprise features

## 5. User Experience

### 5.1 Builder Journey (Primary Flow)

**Day 1: Onboarding**

1. Sign up with email/wallet
2. Create basic project profile
3. Set 8-12 week milestone roadmap
4. Publish first "Week 0" intro post

**Weekly Cycle**

1. Monday: Set week goals
2. Friday: Publish progress update
3. Weekend: Community engagement
4. Continuous: Work on project

**Milestone Achievement**

1. Community votes on readiness
2. Token launch preparation
3. Allocation distribution
4. Launch celebration

### 5.2 Community Member Journey

**Discovery**

1. Browse active builders
2. Follow promising projects
3. Engage through comments/reactions

**Support & Investment**

1. Track favorite builders
2. Participate in milestone voting
3. Receive token allocations
4. Earn reputation for good picks

### 5.3 Key User Flows

**Builder Signup Flow**

```
Landing Page → Role Selection → Profile Setup → First Goal Setting → Community Introduction
```

**Weekly Update Flow**

```
Dashboard Reminder → Update Creation → Metrics Input → Media Upload → Publish → Community Engagement
```

**Token Launch Flow**

```
Milestone Achievement → Community Validation → Token Setup → Allocation Calculation → Launch → Distribution
```

## 6. Technical Requirements

### 6.1 Architecture Overview

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Blockchain**: Base L2 for token launches
- **Payments**: Stripe for fiat transactions
- **Analytics**: Mixpanel for user behavior
- **Media**: Supabase Storage for images/videos

### 6.2 Core Technical Features

**Authentication & User Management**

- Email/password and wallet connection
- Role-based permissions (Builder, Community, Mentor)
- Profile management and settings

**Content Management**

- Rich text editor for updates
- Image/video upload and compression
- Content moderation and reporting

**Token Infrastructure**

- ERC-20 token factory on Base
- Vesting contract templates
- Allocation calculation engine
- Distribution automation

**Analytics & Tracking**

- User engagement metrics
- Builder progress tracking
- Community interaction analytics
- Token performance monitoring

### 6.3 Performance Requirements

- Page load time: <2 seconds
- Mobile responsiveness: 100%
- Uptime: 99.5%
- Image optimization: Auto-compression
- Real-time updates: WebSocket for comments

### 6.4 Security Requirements

- Input sanitization and validation
- Rate limiting on API endpoints
- Secure token storage
- Content moderation system
- Privacy controls for sensitive data

## 7. Milestone Timeline

### 7.1 Development Phases

**Phase 1: Foundation (Weeks 1-3)**

- User authentication and profiles
- Basic project creation
- Weekly update system
- Simple community features

**Phase 2: Community (Weeks 4-5)**

- Engagement mechanics (likes, comments)
- Reputation system
- Leaderboards and discovery
- Mobile optimization

**Phase 3: Token System (Weeks 6-8)**

- Milestone tracking
- Token creation infrastructure
- Allocation system
- Launch mechanics

**Phase 4: Polish & Launch (Weeks 9-10)**

- Testing and bug fixes
- Performance optimization
- Community onboarding
- Public launch

### 7.2 Success Criteria by Phase

**Phase 1 Success:**

- 10 beta builders creating profiles
- 50+ weekly updates posted
- Basic functionality working

**Phase 2 Success:**

- 100+ community members
- 70%+ weekly update rate
- Active engagement (comments, reactions)

**Phase 3 Success:**

- First successful token launch
- Community allocation distribution
- Positive ROI for early supporters

**Phase 4 Success:**

- 25+ active builders
- 200+ community members
- $10K+ first token launch

## 8. Business Model

### 8.1 Revenue Streams

**Platform Fees (Primary)**

- 2-3% fee on successful token launches
- Estimated $500-1500 per launch
- Target: 5 launches in first 6 months

**Mentor Services (Secondary)**

- 20% commission on mentor bookings
- $20-40 per session commission
- Target: 50 sessions/month by month 6

**Premium Features (Future)**

- $29/month for advanced analytics
- Priority support and features
- Not part of MVP scope

### 8.2 Unit Economics

- Customer Acquisition Cost: $25-50
- Lifetime Value: $200-500
- Payback Period: 3-6 months
- Contribution Margin: 60-70%

## 9. Risk Assessment

### 9.1 High-Risk Items

- **Regulatory compliance**: Token launches may face regulation
- **Community building**: Chicken-and-egg problem for early adoption
- **Builder quality**: Ensuring high-quality projects reach token launch
- **Token performance**: Poor performing tokens could hurt platform reputation

### 9.2 Mitigation Strategies

- Start with utility tokens, not securities
- Seed community with Frutero Club members
- Implement strict milestone requirements
- Focus on builder success over token speculation

## 10. Launch Strategy

### 10.1 Beta Phase (Month 1)

- Invite 10 builders from Frutero Club ecosystem
- 50 community members from existing network
- Focus on product feedback and iteration

### 10.2 Public Launch (Month 2)

- First public token launch as marketing event
- Content marketing around success stories
- Gradual expansion to 25 active builders

### 10.3 Growth Phase (Months 3-6)

- Scale to 50+ builders
- Expand to other Latin American markets
- Build partnerships with accelerators and VCs

## 11. Key User Stories

### 11.1 Builder Stories

**US-B001: Create Builder Profile**

- **As a** builder
- **I want to** create a comprehensive project profile
- **So that** the community can understand and follow my journey
- **Acceptance Criteria:**
  - Profile includes problem, solution, and timeline
  - Can upload images and basic metrics
  - Profile is immediately visible in community feed

**US-B002: Post Weekly Update**

- **As a** builder
- **I want to** share my weekly progress
- **So that** I maintain accountability and community engagement
- **Acceptance Criteria:**
  - Structured template for consistent updates
  - Must include metrics and next week goals
  - Automated reminders if update is missed

**US-B003: Launch Project Token**

- **As a** builder who achieved milestones
- **I want to** launch a project token
- **So that** I can reward my community and raise funds
- **Acceptance Criteria:**
  - Milestone verification by community vote
  - Token creation with custom parameters
  - Automatic allocation to supporters

### 11.2 Community Stories

**US-C001: Discover Promising Builders**

- **As a** community member
- **I want to** discover and follow promising builders
- **So that** I can support them early and potentially earn returns
- **Acceptance Criteria:**
  - Browse feed of active builders
  - Filter by category, progress, and timeline
  - Follow/unfollow with notifications

**US-C002: Participate in Token Launch**

- **As a** community supporter
- **I want to** receive tokens from projects I supported
- **So that** I'm rewarded for early belief in builders
- **Acceptance Criteria:**
  - Allocation based on support history
  - Clear communication of token distribution
  - Easy claim process

### 11.3 Mentor Stories

**US-M001: Support Builders**

- **As a** mentor
- **I want to** provide guidance to builders
- **So that** I can help them succeed and build my reputation
- **Acceptance Criteria:**
  - Can comment with mentor badge
  - Track mentored builder success
  - Earn reputation points and potential token rewards

## 12. Appendix

### 12.1 Competitive Analysis

- **Traditional Accelerators**: More structured but less accessible
- **Crowdfunding Platforms**: Focus on funding, not ongoing support
- **Social Platforms**: Engagement without monetary incentives
- **Our Advantage**: Combines ongoing support with token rewards

### 12.2 Technical Dependencies

- Base L2 network stability
- Supabase service reliability
- Stripe payment processing
- Third-party APIs (image processing, notifications)

### 12.3 Compliance Considerations

- Token offerings may require legal review
- User data privacy (GDPR compliance)
- AML/KYC for larger token launches
- Platform liability for user-generated content

---

_This PRD represents the MVP scope for kiwik, focused on validating core assumptions about community-driven talent incubation with token incentives. Success metrics and user feedback will guide future feature development and platform expansion._
