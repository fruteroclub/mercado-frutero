# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built as a Farcaster Mini App template, specifically for the "kiwik MVP" - a talent incubator platform with blockchain integration and token launch capabilities.

## Essential Commands

```bash
# Development
npm run dev          # Start Next.js development server on port 3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks

# Package Management
bun install          # Install dependencies (project uses Bun)
```

## Architecture Overview

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Blockchain**: Wagmi + Viem for Ethereum interactions
- **Farcaster Integration**: @farcaster/frame-sdk + MiniKit
- **Database**: Upstash Redis for notifications
- **Styling**: Tailwind CSS

### Key Directory Structure

- `app/` - Next.js App Router pages and API routes
  - `api/notify/` - Notification endpoint
  - `api/webhook/` - Webhook handling
  - `components/` - React components
  - `providers.tsx` - App-wide providers (MiniKit, Wagmi, etc.)
- `lib/` - Utility modules for Redis and notifications
- `docs/` - Project documentation including PRD and Project Vision

### Important Patterns

1. **Providers Architecture**: The app uses a nested provider pattern in `app/providers.tsx` wrapping the entire application with MiniKit, Wagmi, and React Query providers.

2. **API Routes**: Located in `app/api/`, following Next.js 15 route handler conventions.

3. **Component Structure**: Components are stored in `app/components/` with the main layout defined in `app/layout.tsx`.

4. **Environment Variables**: The app requires specific environment variables for Redis and blockchain connections (check `.env.example` if available).

## Key Implementation Details

### Farcaster Mini App Integration

The application is configured as a Farcaster Mini App with:

- Frame SDK integration for Farcaster functionality
- MiniKit provider for wallet connections
- Webhook endpoints for Farcaster events

### Blockchain Configuration

- Uses Wagmi for wallet connections
- Configured for Base network (chain ID 8453)
- Supports OnchainKit for blockchain UI components

### Redis Integration

The app uses Upstash Redis for notification storage and retrieval, with utilities in `lib/redis.ts` and `lib/notification.ts`.

## Development Notes

- The project uses Bun as the package manager (note the `bun.lock` file)
- TypeScript is configured with strict mode
- No test framework is currently configured
- The app includes comprehensive documentation in the `docs/` directory about the kiwik platform requirements
