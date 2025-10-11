import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-slate-50 border-b border-slate-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index === 0 ? (
                <Link
                  to={crumb.href}
                  className="flex items-center text-slate-600 hover:text-green-600 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  {crumb.name}
                </Link>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-slate-600 hover:text-green-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};
