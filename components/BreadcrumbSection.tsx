'use client'

import Breadcrumb from './Breadcrumb'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbSectionProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'dark' | 'minimal'
  className?: string
}

export default function BreadcrumbSection({ 
  items, 
  variant = 'default',
  className = ''
}: BreadcrumbSectionProps) {
  const baseClasses = "w-full"
  
  const variantClasses = {
    default: "bg-primary-white border-b border-gray-100",
    dark: "bg-transparent",
    minimal: "bg-primary-white"
  }

  return (
    <section className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="container-custom">
        <Breadcrumb items={items} variant={variant} />
      </div>
    </section>
  )
} 