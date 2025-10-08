import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
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
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
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
          <div className="lg:hidden bg-black/90 backdrop-blur-md border-t border-white/20 shadow-lg">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-white font-medium py-2 transition-colors border-b border-white/20 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
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