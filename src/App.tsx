import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { LiveChat } from "@/components/LiveChat";
import { SimpleContactButton } from "@/components/SimpleContactButton";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { SmartContactPrompt } from "@/components/SmartContactPrompt";
import { useAnalytics } from "@/hooks/useAnalytics";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

// Location pages
import CapeTown from "./pages/locations/CapeTown";
import Johannesburg from "./pages/locations/Johannesburg";
import Durban from "./pages/locations/Durban";
import Pretoria from "./pages/locations/Pretoria";
import Sandton from "./pages/locations/Sandton";
import Stellenbosch from "./pages/locations/Stellenbosch";
import Paarl from "./pages/locations/Paarl";
import Pietermaritzburg from "./pages/locations/Pietermaritzburg";
import PortElizabeth from "./pages/locations/PortElizabeth";
import Bloemfontein from "./pages/locations/Bloemfontein";
import Nelspruit from "./pages/locations/Nelspruit";
import Polokwane from "./pages/locations/Polokwane";
import Rustenburg from "./pages/locations/Rustenburg";
import Kimberley from "./pages/locations/Kimberley";
import EastLondon from "./pages/locations/EastLondon";
import WesternCape from "./pages/locations/WesternCape";
import Gauteng from "./pages/locations/Gauteng";
import KwaZuluNatal from "./pages/locations/KwaZuluNatal";

const queryClient = new QueryClient();

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useAnalytics(); // Initialize analytics tracking

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.25, 0, 1],
  duration: 0.4
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Index />
              </motion.div>
            } />
            <Route path="/services" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Services />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/packages" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Packages />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Contact />
              </motion.div>
            } />
            <Route path="/faq" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <FAQ />
              </motion.div>
            } />
            
            {/* Location Routes */}
            <Route path="/cape-town" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CapeTown />
              </motion.div>
            } />
            <Route path="/johannesburg" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Johannesburg />
              </motion.div>
            } />
            <Route path="/durban" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Durban />
              </motion.div>
            } />
            <Route path="/pretoria" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Pretoria />
              </motion.div>
            } />
            <Route path="/sandton" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Sandton />
              </motion.div>
            } />
            <Route path="/stellenbosch" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Stellenbosch />
              </motion.div>
            } />
            <Route path="/paarl" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Paarl />
              </motion.div>
            } />
            <Route path="/pietermaritzburg" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Pietermaritzburg />
              </motion.div>
            } />
            <Route path="/port-elizabeth" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PortElizabeth />
              </motion.div>
            } />
            <Route path="/bloemfontein" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Bloemfontein />
              </motion.div>
            } />
            <Route path="/nelspruit" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Nelspruit />
              </motion.div>
            } />
            <Route path="/polokwane" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Polokwane />
              </motion.div>
            } />
            <Route path="/rustenburg" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Rustenburg />
              </motion.div>
            } />
            <Route path="/kimberley" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Kimberley />
              </motion.div>
            } />
            <Route path="/east-london" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <EastLondon />
              </motion.div>
            } />
            
            {/* Province Routes */}
            <Route path="/western-cape" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <WesternCape />
              </motion.div>
            } />
            <Route path="/gauteng" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Gauteng />
              </motion.div>
            } />
            <Route path="/kwazulu-natal" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <KwaZuluNatal />
              </motion.div>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NotFound />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        <LiveChat />
        <SimpleContactButton />
        <ExitIntentPopup />
        <SmartContactPrompt onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;