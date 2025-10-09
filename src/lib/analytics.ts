// Analytics tracking functions for Lunexweb
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

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

export const trackPageView = (pageTitle: string, pageLocation: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-87CWXWVJM3', {
      page_title: pageTitle,
      page_location: pageLocation,
      send_page_view: true
    });
  }
};

// Lead tracking functions
export const trackLeadSubmission = (data: {
  serviceType: string;
  location: string;
  budgetRange: string;
  leadSource: string;
  formType: string;
}) => {
  trackEvent('lead_submission', {
    service_type: data.serviceType,
    location: data.location,
    budget_range: data.budgetRange,
    lead_source: data.leadSource,
    form_type: data.formType,
    event_category: 'lead_generation',
    value: getBudgetValue(data.budgetRange)
  });
};

export const trackWhatsAppClick = (location: string, serviceType?: string) => {
  trackEvent('whatsapp_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'whatsapp_contact'
  });
};

export const trackPhoneClick = (location: string, serviceType?: string) => {
  trackEvent('phone_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'phone_contact'
  });
};

export const trackEmailClick = (location: string, serviceType?: string) => {
  trackEvent('email_click', {
    location: location,
    service_type: serviceType || 'general',
    event_category: 'contact',
    event_label: 'email_contact'
  });
};

export const trackServiceView = (serviceType: string, location: string) => {
  trackEvent('service_view', {
    service_type: serviceType,
    location: location,
    event_category: 'engagement',
    event_label: 'service_interest'
  });
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

// User journey tracking
export const trackUserJourney = (step: string, data: Record<string, any>) => {
  trackEvent('user_journey', {
    journey_step: step,
    event_category: 'user_behavior',
    ...data
  });
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





