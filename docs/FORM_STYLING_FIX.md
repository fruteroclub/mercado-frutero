# Form Input Contrast Fix

## Issue
Form inputs in the builder onboarding flow and search functionality had poor contrast for entered data, making it difficult to read user input.

## Solution
Added explicit text color classes to all form inputs for better accessibility and readability:

### Before
```tsx
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
```

### After
```tsx
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
```

## Changes Made
- **Text Color**: Added `text-gray-900` for high contrast on entered data
- **Placeholder Color**: Added `placeholder-gray-500` for appropriate placeholder contrast
- **Consistency**: Applied to all form inputs across the application

## Files Modified
1. `app/onboarding/builder/page.tsx` - All form inputs and textarea
2. `app/discover/page.tsx` - Search input field

## Accessibility Improvements
- **Contrast Ratio**: Text now meets WCAG AA standards (4.5:1)
- **Readability**: Clear distinction between entered text and placeholders
- **Consistency**: Uniform styling across all form elements