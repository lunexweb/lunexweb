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
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "Packages", href: "/packages", icon: Users },
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
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold tracking-tight">
                <span className="text-white">Lunexweb</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Main Pages */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group flex items-center gap-1"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
              
              {/* Locations Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white/90 hover:text-white font-medium transition-colors duration-200 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Locations
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                  <DropdownMenuLabel>Cities</DropdownMenuLabel>
                  {locationPages.map((page) => (
                    <DropdownMenuItem key={page.href} asChild>
                      <Link to={page.href} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {page.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Provinces</DropdownMenuLabel>
                  {provincePages.map((page) => (
                    <DropdownMenuItem key={page.href} asChild>
                      <Link to={page.href} className="flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        {page.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dashboard Link */}
              <Link
                to="/dashboard"
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group flex items-center gap-1"
              >
                <Users className="h-4 w-4" />
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>

              {/* All Pages Link */}
              <Link
                to="/all-pages"
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                All Pages
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Button 
                size="sm"
                className="text-white font-medium"
                style={{ backgroundColor: '#22C55E' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                asChild
              >
                <Link to="/contact">Get Started</Link>
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
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col space-y-4">
                {/* Main Pages */}
                <div className="space-y-2">
                  <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide">Main Pages</h3>
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/90 hover:text-white font-medium py-2 transition-colors flex items-center gap-2 border-b border-white/10 last:border-b-0"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Dashboard & All Pages */}
                <div className="space-y-2">
                  <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide">Admin</h3>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-white font-medium py-2 transition-colors flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/all-pages"
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-white font-medium py-2 transition-colors flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    All Pages
                  </Link>
                </div>

                {/* Locations */}
                <div className="space-y-2">
                  <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide">Cities</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {locationPages.slice(0, 12).map((page) => (
                      <Link
                        key={page.href}
                        to={page.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white text-sm py-1 transition-colors flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {page.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Provinces */}
                <div className="space-y-2">
                  <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide">Provinces</h3>
                  {provincePages.map((page) => (
                    <Link
                      key={page.href}
                      to={page.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white text-sm py-1 transition-colors flex items-center gap-1"
                    >
                      <Building className="h-3 w-3" />
                      {page.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4">
                  <Button 
                    className="w-full text-white font-medium"
                    style={{ backgroundColor: '#22C55E' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link to="/contact">Get Started</Link>
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