// Example usage of PageWrapper component
// This file demonstrates how to integrate the PageWrapper into your pages
// NOTE: The app now uses AppShell in layout.tsx which automatically handles navigation
// Only use PageWrapper directly for special cases or custom layouts

import PageWrapper from './page-wrapper'

// Example 1: Basic usage with navigation
export function ExampleWithNavigation() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page with Navigation
        </h1>
        <p className="text-gray-600">
          This page includes both the top navbar (desktop) and bottom app bar (mobile).
        </p>
      </div>
    </PageWrapper>
  )
}

// Example 2: Page without navigation (e.g., onboarding flows)
export function ExampleWithoutNavigation() {
  return (
    <PageWrapper showNavigation={false}>
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Onboarding Step
        </h1>
        <p className="text-gray-600">
          This page hides the navigation for focused user flows.
        </p>
      </div>
    </PageWrapper>
  )
}

// Example 3: Custom className for specific styling
export function ExampleWithCustomStyling() {
  return (
    <PageWrapper className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Custom Styled Page
        </h1>
        <p className="text-gray-600">
          This page has a custom background gradient applied.
        </p>
      </div>
    </PageWrapper>
  )
}

// Example 4: Integration with existing pages
// Update your existing pages like this:

/*
// app/discover/page.tsx
import PageWrapper from '@/app/components/layout/page-wrapper'

export default function DiscoverPage() {
  return (
    <PageWrapper>
      {// Your existing page content //}
    </PageWrapper>
  )
}
*/