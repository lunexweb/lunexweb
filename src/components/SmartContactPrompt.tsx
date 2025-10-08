import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, MessageCircle, Phone, Mail, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface SmartContactPromptProps {
  onContactClick: () => void;
}

export const SmartContactPrompt: React.FC<SmartContactPromptProps> = ({ onContactClick }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastShown, setLastShown] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Pages where the contact prompt should NOT appear
  // Excludes: Dashboard, Login, Auth, and any admin/internal pages
  const excludedPages = ['/dashboard', '/login', '/auth', '/admin'];
  const shouldShowPrompt = !excludedPages.some(page => location.pathname.startsWith(page));

  // Reset state when navigating to a new page
  useEffect(() => {
    setIsVisible(false);
    setIsMinimized(false);
    setUserInteracted(false);
  }, [location.pathname]);

  // Smart timing logic
  useEffect(() => {
    const checkShowPrompt = () => {
      const now = Date.now();
      const timeSinceLastShown = now - lastShown;
      const timeOnPage = now - window.performance.timing.navigationStart;
      
      // Don't show if user has interacted recently or if it's been shown too recently
      const shouldShow = 
        !userInteracted && 
        timeSinceLastShown > 300000 && // 5 minutes since last shown
        timeOnPage > 60000 && // At least 1 minute on page
        timeOnPage < 1800000 && // Less than 30 minutes on page
        !localStorage.getItem('contactPromptDismissed');

      if (shouldShow) {
        setIsVisible(true);
        setLastShown(now);
        
        // Auto-hide after 15 seconds if not interacted with
        setTimeout(() => {
          if (!isMinimized) {
            setIsVisible(false);
          }
        }, 15000);
      }
    };

    // Check after 1 minute on page
    const timer = setTimeout(checkShowPrompt, 60000);
    return () => clearTimeout(timer);
  }, [lastShown, userInteracted, isMinimized]);

  // Track user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      setIsVisible(false);
    };

    // Listen for various user interactions
    const events = ['click', 'scroll', 'keydown', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  const handleContactClick = () => {
    onContactClick();
    setIsVisible(false);
    setUserInteracted(true);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
    setUserInteracted(true);
    localStorage.setItem('contactPromptDismissed', 'true');
  };

  // Don't render if on excluded pages - moved after all hooks
  if (!shouldShowPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 max-w-sm"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl border-l-4 border-l-green-500">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Need Help?</h4>
                    <p className="text-xs text-slate-500">Website Expert Available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMinimize}
                    className="h-6 w-6 p-0 hover:bg-slate-100"
                  >
                    <div className="w-3 h-0.5 bg-slate-400"></div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-6 w-6 p-0 hover:bg-slate-100"
                  >
                    <X className="w-3 h-3 text-slate-400" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Looking to create a professional website? Our experts are here to help you succeed online.
                </p>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={handleContactClick}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm py-2"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Website Expert
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('tel:+27789992503', '_self')}
                      className="flex-1 text-xs py-1 border-slate-200 hover:border-green-300 hover:bg-green-50"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('mailto:info@lunexweb.com', '_self')}
                      className="flex-1 text-xs py-1 border-slate-200 hover:border-green-300 hover:bg-green-50"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center">
                  Free consultation • No obligation
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};