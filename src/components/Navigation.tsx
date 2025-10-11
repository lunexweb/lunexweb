import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe, MapPin, Building, Users, FileText, Star, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { label: "Home", href: "/", icon: Globe },
    { label: "Services", href: "/services", icon: Building },
    { label: "Portfolio", href: "/portfolio", icon: Star },
    { label: "Packages", href: "/packages", icon: Users },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "About", href: "/about", icon: Users },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
    { label: "Contact", href: "/contact", icon: MessageSquare },
  ];

  const locationPages = [
    { label: "Cape Town", href: "/cape-town" },
    { label: "Johannesburg", href: "/johannesburg" },
    { label: "Durban", href: "/durban" },
    { label: "Pretoria", href: "/pretoria" },
    { label: "Sandton", href: "/sandton" },
    { label: "Stellenbosch", href: "/stellenbosch" },
    { label: "Paarl", href: "/paarl" },
    { label: "Pietermaritzburg", href: "/pietermaritzburg" },
    { label: "Port Elizabeth", href: "/port-elizabeth" },
    { label: "Bloemfontein", href: "/bloemfontein" },
    { label: "Nelspruit", href: "/nelspruit" },
    { label: "Polokwane", href: "/polokwane" },
    { label: "Rustenburg", href: "/rustenburg" },
    { label: "Kimberley", href: "/kimberley" },
    { label: "East London", href: "/east-london" },
    { label: "Kempton Park", href: "/kempton-park" },
    { label: "Benoni", href: "/benoni" },
    { label: "Randburg", href: "/randburg" },
    { label: "Centurion", href: "/centurion" },
    { label: "Midrand", href: "/midrand" },
  ];

  const provincePages = [
    { label: "Western Cape", href: "/western-cape" },
    { label: "Gauteng", href: "/gauteng" },
    { label: "KwaZulu-Natal", href: "/kwazulu-natal" },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/20" 
          : "bg-black/60 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 w-full overflow-hidden">
          <div className="flex items-center justify-between h-20 w-full">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="text-2xl font-bold tracking-tight whitespace-nowrap">
                <span className="text-white">Lunexweb</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              {/* Main Pages - Professional spacing */}
              {mainNavItems.slice(0, 4).map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white font-medium transition-all duration-300 relative group px-2 py-1.5 rounded-md hover:bg-white/10"
                  title={`${item.label} - Professional Web Development Services`}
                  aria-label={`Navigate to ${item.label} page`}
                >
                  <item.icon className="h-4 w-4 inline mr-1.5" />
                  {item.label}
                  <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </Link>
              ))}
              
              {/* Locations Dropdown - SEO optimized */}
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="text-white/90 hover:text-white font-medium transition-all duration-300 px-2 py-1.5 rounded-md hover:bg-white/10 flex items-center gap-2"
                  title="Location-based Web Development Services"
                  aria-label="Browse web development services by location"
                >
                  <MapPin className="h-4 w-4" />
                  Locations
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 max-h-96 overflow-y-auto">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                    Cities We Serve
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {locationPages.map((page) => (
                      <DropdownMenuItem key={page.href} asChild>
                        <Link 
                          to={page.href} 
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          title={`Web Development Services in ${page.label}`}
                          aria-label={`Web development services in ${page.label}`}
                        >
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{page.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                    Provinces
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {provincePages.map((page) => (
                      <DropdownMenuItem key={page.href} asChild>
                        <Link 
                          to={page.href} 
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          title={`Web Development Services in ${page.label}`}
                          aria-label={`Web development services in ${page.label}`}
                        >
                          <Building className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{page.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="text-white/90 hover:text-white font-medium transition-all duration-300 px-2 py-1.5 rounded-md hover:bg-white/10 flex items-center gap-2"
                  title="Additional Pages and Tools"
                  aria-label="Access additional pages and tools"
                >
                  <Users className="h-4 w-4" />
                  More
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                    Additional Pages
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/all-pages" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                      title="Complete Website Navigation"
                      aria-label="Browse all website pages"
                    >
                      <Globe className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">All Pages</span>
                    </Link>
                  </DropdownMenuItem>
                  {mainNavItems.slice(4).map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link 
                        to={item.href} 
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        title={`${item.label} - Professional Web Development Services`}
                        aria-label={`Navigate to ${item.label} page`}
                      >
                        <item.icon className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                      title="Lunex Team Dashboard - Manage Projects and Leads"
                      aria-label="Access Lunex Team Dashboard"
                    >
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">Lunex Team Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* CTA Button - SEO optimized */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Button 
                size="sm"
                className="text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#22C55E' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                asChild
              >
                <Link 
                  to="/contact" 
                  title="Get Started with Professional Web Development Services"
                  aria-label="Contact us to get started with professional web development"
                >
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-white/80 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-black/90 backdrop-blur-md border-t border-white/20 shadow-lg max-h-96 overflow-y-auto">
              <div className="container mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col space-y-6">
                  {/* Main Pages - Enhanced spacing */}
                  <div className="space-y-3">
                    <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide px-2">Main Pages</h3>
                    <div className="space-y-1">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-white/90 hover:text-white font-medium py-3 px-3 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-white/10"
                          title={`${item.label} - Professional Web Development Services`}
                          aria-label={`Navigate to ${item.label} page`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-base">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Additional Pages */}
                  <div className="space-y-3">
                    <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide px-2">Additional Pages</h3>
                    <div className="space-y-1">
                      <Link
                        to="/all-pages"
                        onClick={() => setIsOpen(false)}
                        className="text-white/90 hover:text-white font-medium py-3 px-3 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-white/10"
                        title="Complete Website Navigation"
                        aria-label="Browse all website pages"
                      >
                        <Globe className="h-5 w-5" />
                        <span className="text-base">All Pages</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-white/90 hover:text-white font-medium py-3 px-3 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-white/10"
                        title="Lunex Team Dashboard - Manage Projects and Leads"
                        aria-label="Access Lunex Team Dashboard"
                      >
                        <Users className="h-5 w-5" />
                        <span className="text-base">Lunex Team Dashboard</span>
                      </Link>
                    </div>
                  </div>

                  {/* Locations - Better organized */}
                  <div className="space-y-3">
                    <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide px-2">Cities We Serve</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {locationPages.slice(0, 12).map((page) => (
                        <Link
                          key={page.href}
                          to={page.href}
                          onClick={() => setIsOpen(false)}
                          className="text-white/80 hover:text-white text-sm py-2 px-2 rounded-md transition-all duration-300 flex items-center gap-2 hover:bg-white/10"
                          title={`Web Development Services in ${page.label}`}
                          aria-label={`Web development services in ${page.label}`}
                        >
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{page.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Provinces */}
                  <div className="space-y-3">
                    <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide px-2">Provinces</h3>
                    <div className="space-y-1">
                      {provincePages.map((page) => (
                        <Link
                          key={page.href}
                          to={page.href}
                          onClick={() => setIsOpen(false)}
                          className="text-white/80 hover:text-white text-sm py-2 px-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-white/10"
                          title={`Web Development Services in ${page.label}`}
                          aria-label={`Web development services in ${page.label}`}
                        >
                          <Building className="h-4 w-4" />
                          <span className="text-base">{page.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* CTA Button */}
                  <div className="pt-4 border-t border-white/20">
                    <Button 
                      className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: '#22C55E' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link 
                        to="/contact"
                        title="Get Started with Professional Web Development Services"
                        aria-label="Contact us to get started with professional web development"
                      >
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </nav>
    </>
  );
};