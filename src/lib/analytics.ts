// Analytics tracking functions for Lunexweb
import { supabase } from './supabase';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Generate a session ID for tracking user sessions
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('lunexweb_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('lunexweb_session_id', sessionId);
  }
  return sessionId;
};

// Get user location from URL or default
const getLocationFromUrl = (): string => {
  const pathParts = window.location.pathname.split('/');
  if (pathParts[1] === 'locations' && pathParts[2]) {
    return pathParts[2].replace('-', ' ');
  }
  return 'general';
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...parameters
    });
  }
  
  // Also push to dataLayer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
};

export const trackPageView = async (pageTitle: string, pageLocation: string) => {
  // Track in Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-87CWXWVJM3', {
      page_title: pageTitle,
      page_location: pageLocation,
      send_page_view: true
    });
  }

  // Track in Supabase database
  try {
    const pageType = getPageType(pageLocation);
    const location = getLocationFromUrl();
    const sessionId = getSessionId();

    await supabase.from('page_views').insert({
      page_title: pageTitle,
      page_url: pageLocation,
      page_type: pageType,
      location: location,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      session_id: sessionId
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Helper function to determine page type
const getPageType = (pathname: string): string => {
  if (pathname === '/' || pathname === '/home') return 'home';
  if (pathname === '/services') return 'services';
  if (pathname === '/portfolio') return 'portfolio';
  if (pathname === '/blog') return 'blog';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/packages') return 'packages';
  if (pathname === '/faq') return 'faq';
  if (pathname.startsWith('/locations/')) return 'location';
  if (pathname.startsWith('/portfolio/')) return 'portfolio_detail';
  if (pathname.startsWith('/blog/')) return 'blog_detail';
  return 'other';
};

// Lead tracking functions
export const trackLeadSubmission = async (data: {
  serviceType: string;
  location: string;
  budgetRange: string;
  leadSource: string;
  formType: string;
  leadId?: string;
}) => {
  // Track in Google Analytics
  trackEvent('lead_submission', {
    service_type: data.serviceType,
    location: data.location,
    budget_range: data.budgetRange,
    lead_source: data.leadSource,
    form_type: data.formType,
    event_category: 'lead_generation',
    value: getBudgetValue(data.budgetRange)
  });

  // Track in Supabase database
  try {
    await supabase.from('lead_analytics').insert({
      lead_id: data.leadId || null,
      source: data.leadSource,
      page_visited: window.location.pathname,
      location: data.location,
      service_type: data.serviceType,
      budget_range: data.budgetRange,
      conversion_value: getBudgetValue(data.budgetRange)
    });
  } catch (error) {
    console.error('Error tracking lead submission:', error);
  }
};

export const trackWhatsAppClick = async (location: string, serviceType?: string) => {
  // Track in Google Analytics
  trackEvent('whatsapp_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'whatsapp_contact'
  });

  // Track in Supabase database
  try {
    await supabase.from('contact_tracking').insert({
      contact_method: 'whatsapp',
      page_location: window.location.pathname,
      service_type: serviceType || 'general',
      location: location
    });
  } catch (error) {
    console.error('Error tracking WhatsApp click:', error);
  }
};

export const trackPhoneClick = async (location: string, serviceType?: string) => {
  // Track in Google Analytics
  trackEvent('phone_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'phone_contact'
  });

  // Track in Supabase database
  try {
    await supabase.from('contact_tracking').insert({
      contact_method: 'phone',
      page_location: window.location.pathname,
      service_type: serviceType || 'general',
      location: location
    });
  } catch (error) {
    console.error('Error tracking phone click:', error);
  }
};

export const trackEmailClick = async (location: string, serviceType?: string) => {
  // Track in Google Analytics
  trackEvent('email_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'email_contact'
  });

  // Track in Supabase database
  try {
    await supabase.from('contact_tracking').insert({
      contact_method: 'email',
      page_location: window.location.pathname,
      service_type: serviceType || 'general',
      location: location
    });
  } catch (error) {
    console.error('Error tracking email click:', error);
  }
};

export const trackServiceView = async (serviceType: string, location: string) => {
  // Track in Google Analytics
  trackEvent('service_view', {
    service_type: serviceType,
    location: location,
    event_category: 'engagement',
    event_label: 'service_interest'
  });

  // Track in Supabase database
  try {
    await supabase.from('service_analytics').insert({
      service_type: serviceType,
      page_location: window.location.pathname,
      interest_level: 'viewed',
      location: location
    });
  } catch (error) {
    console.error('Error tracking service view:', error);
  }
};

export const trackLocationPageView = (location: string, province: string) => {
  trackEvent('location_page_view', {
    location: location,
    province: province,
    event_category: 'location_targeting',
    event_label: 'local_seo_visit'
  });
};

export const trackBarkComparisonView = (location: string) => {
  trackEvent('bark_comparison_view', {
    location: location,
    event_category: 'competitor_analysis',
    event_label: 'bark_vs_lunexweb'
  });
};

export const trackFormStart = (formType: string, location: string) => {
  trackEvent('form_start', {
    form_type: formType,
    location: location,
    event_category: 'lead_generation',
    event_label: 'form_engagement'
  });
};

export const trackFormAbandon = (formType: string, location: string, step: string) => {
  trackEvent('form_abandon', {
    form_type: formType,
    location: location,
    form_step: step,
    event_category: 'lead_generation',
    event_label: 'form_abandonment'
  });
};

// Helper function to get budget value for conversion tracking
const getBudgetValue = (budgetRange: string): number => {
  const budgetMap: Record<string, number> = {
    'under-10k': 5000,
    '10k-25k': 17500,
    '25k-50k': 37500,
    '50k-100k': 75000,
    'over-100k': 150000
  };
  return budgetMap[budgetRange] || 0;
};

// Conversion tracking for different service types
export const trackConversion = (conversionType: string, data: Record<string, any>) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    event_category: 'conversion',
    ...data
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number, location: string) => {
  const depthRanges = [25, 50, 75, 90];
  if (depthRanges.includes(depth)) {
    trackEvent('scroll_depth', {
      scroll_depth: depth,
      location: location,
      event_category: 'engagement',
      event_label: `scroll_${depth}%`
    });
  }
};

// Time on page tracking
export const trackTimeOnPage = (timeInSeconds: number, pageType: string, location: string) => {
  if (timeInSeconds >= 30) { // Only track if user spent significant time
    trackEvent('time_on_page', {
      time_seconds: timeInSeconds,
      page_type: pageType,
      location: location,
      event_category: 'engagement',
      event_label: 'page_engagement'
    });
  }
};


// Error tracking
export const trackError = (errorType: string, errorMessage: string, location: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    location: location,
    event_category: 'error_tracking',
    event_label: 'site_error'
  });
};

// A/B testing tracking
export const trackABTest = (testName: string, variant: string, location: string) => {
  trackEvent('ab_test', {
    test_name: testName,
    variant: variant,
    location: location,
    event_category: 'ab_testing',
    event_label: 'test_participation'
  });
};

// Portfolio analytics tracking
export const trackPortfolioView = async (projectId: string, viewType: string = 'portfolio_page') => {
  try {
    const location = getLocationFromUrl();
    const sessionId = getSessionId();

    await supabase.from('portfolio_analytics').insert({
      project_id: projectId,
      view_type: viewType,
      location: location,
      referrer: document.referrer || null,
      session_id: sessionId
    });
  } catch (error) {
    console.error('Error tracking portfolio view:', error);
  }
};

// Blog analytics tracking
export const trackBlogView = async (postId: string, viewType: string = 'blog_page') => {
  try {
    const location = getLocationFromUrl();
    const sessionId = getSessionId();

    await supabase.from('blog_analytics').insert({
      post_id: postId,
      view_type: viewType,
      location: location,
      referrer: document.referrer || null,
      session_id: sessionId
    });
  } catch (error) {
    console.error('Error tracking blog view:', error);
  }
};

// User journey tracking
export const trackUserJourney = async (step: string, data: Record<string, any>) => {
  // Track in Google Analytics
  trackEvent('user_journey', {
    journey_step: step,
    event_category: 'user_behavior',
    ...data
  });

  // Track in Supabase database
  try {
    const location = getLocationFromUrl();
    const sessionId = getSessionId();

    await supabase.from('user_journey').insert({
      session_id: sessionId,
      step_name: step,
      page_location: window.location.pathname,
      location: location,
      data: data
    });
  } catch (error) {
    console.error('Error tracking user journey:', error);
  }
};