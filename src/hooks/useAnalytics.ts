import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackScrollDepth, 
  trackTimeOnPage,
  trackUserJourney 
} from '@/lib/analytics';

export const useAnalytics = () => {
  const location = useLocation();
  const startTime = useRef<number>(Date.now());
  const scrollDepths = useRef<Set<number>>(new Set());

  // Track page views on route change
  useEffect(() => {
    const pageTitle = document.title;
    const pageLocation = window.location.href;
    
    // Extract location from URL path
    const pathParts = location.pathname.split('/');
    const currentLocation = pathParts[pathParts.length - 1] || 'home';
    
    trackPageView(pageTitle, pageLocation);
    trackUserJourney('page_view', {
      page: location.pathname,
      location: currentLocation,
      timestamp: new Date().toISOString()
    });

    // Reset scroll tracking for new page
    scrollDepths.current.clear();
    startTime.current = Date.now();
  }, [location]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (!scrollDepths.current.has(scrollPercent)) {
        scrollDepths.current.add(scrollPercent);
        const pathParts = location.pathname.split('/');
        const currentLocation = pathParts[pathParts.length - 1] || 'home';
        trackScrollDepth(scrollPercent, currentLocation);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Track time on page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      const pathParts = location.pathname.split('/');
      const currentLocation = pathParts[pathParts.length - 1] || 'home';
      const pageType = getPageType(location.pathname);
      
      trackTimeOnPage(timeSpent, pageType, currentLocation);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location]);

  return {
    trackPageView,
    trackScrollDepth,
    trackTimeOnPage,
    trackUserJourney
  };
};

// Helper function to determine page type
const getPageType = (pathname: string): string => {
  if (pathname === '/') return 'home';
  if (pathname === '/services') return 'services';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname.startsWith('/')) {
    const pathParts = pathname.split('/');
    return pathParts[pathParts.length - 1] || 'page';
  }
  return 'other';
};



