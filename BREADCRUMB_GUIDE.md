# Breadcrumb System Guide

## Overview

The breadcrumb system has been updated to provide consistent positioning and appealing visual design across all pages. The system includes:

- **BreadcrumbSection**: A wrapper component for consistent positioning
- **Breadcrumb**: The core breadcrumb component with multiple variants
- **Responsive design**: Works seamlessly across all device sizes
- **Animations**: Smooth Framer Motion animations for enhanced UX
- **SEO optimization**: Includes structured data for search engines

## Components

### BreadcrumbSection

A wrapper component that provides consistent positioning and styling for breadcrumbs.

```tsx
import BreadcrumbSection from '@/components/BreadcrumbSection'

// Basic usage
<BreadcrumbSection items={[{ label: 'Services' }]} />

// With dark variant (for pages with dark backgrounds)
<BreadcrumbSection items={[{ label: 'Contact' }]} variant="dark" />

// With minimal variant (no border)
<BreadcrumbSection items={[{ label: 'About' }]} variant="minimal" />
```

### Breadcrumb

The core breadcrumb component with multiple styling variants.

```tsx
import Breadcrumb from '@/components/Breadcrumb'

// Basic usage
<Breadcrumb items={[{ label: 'Services' }]} />

// With variant
<Breadcrumb items={[{ label: 'Contact' }]} variant="dark" />
```

## Variants

### Default
- White background with subtle border
- Gray text with black hover states
- Best for standard pages with white backgrounds

### Dark
- Transparent background
- White text with white hover states
- Best for pages with dark backgrounds (like contact page)

### Minimal
- White background without border
- Clean, minimal appearance
- Best for pages where you want less visual separation

## Features

### Animations
- Fade-in animation on page load
- Staggered animation for breadcrumb items
- Hover effects with scale and rotation
- Smooth transitions for all interactive elements

### Responsive Design
- Adapts to different screen sizes
- Proper spacing on mobile and desktop
- Touch-friendly on mobile devices

### SEO Optimization
- Includes structured data (JSON-LD)
- Proper semantic HTML with nav element
- Accessible with proper ARIA labels

### Interactive Elements
- Hover effects on clickable items
- Visual feedback for user interactions
- Smooth transitions between states

## Usage Examples

### Services Page
```tsx
<BreadcrumbSection items={[{ label: 'Services' }]} />
```

### About Page
```tsx
<BreadcrumbSection items={[{ label: 'About' }]} />
```

### Contact Page (with dark variant)
```tsx
<BreadcrumbSection items={[{ label: 'Contact' }]} variant="dark" />
```

### Nested Breadcrumbs
```tsx
<BreadcrumbSection items={[
  { label: 'Services', href: '/services' },
  { label: 'Web Development' }
]} />
```

## Styling

The breadcrumb system uses Tailwind CSS classes and follows the project's design system:

- **Colors**: Uses `primary-black` and `primary-white` from the theme
- **Typography**: Responsive text sizes with proper scaling
- **Spacing**: Consistent padding and margins across variants
- **Borders**: Subtle borders for visual separation
- **Shadows**: Minimal shadows for depth when needed

## Best Practices

1. **Consistent Positioning**: Always use `BreadcrumbSection` for consistent positioning
2. **Appropriate Variants**: Choose the right variant for your page background
3. **Clear Labels**: Use descriptive, user-friendly labels
4. **Proper Hierarchy**: Ensure breadcrumbs reflect the actual page hierarchy
5. **Accessibility**: The system includes proper ARIA labels and semantic HTML

## File Structure

```
components/
├── Breadcrumb.tsx          # Core breadcrumb component
└── BreadcrumbSection.tsx   # Wrapper for consistent positioning
```

## Dependencies

- **Framer Motion**: For animations
- **Lucide React**: For icons (Home, ChevronRight)
- **Next.js Link**: For navigation
- **Tailwind CSS**: For styling 