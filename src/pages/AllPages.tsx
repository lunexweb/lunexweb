import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Building, 
  Star, 
  FileText, 
  Users, 
  HelpCircle, 
  MessageSquare, 
  MapPin, 
  BarChart3,
  Home,
  Package,
  ArrowLeft
} from "lucide-react";

const AllPages = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Check if there's a previous page in browser history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no previous page, go to home
      navigate('/');
    }
  };

  const mainPages = [
    { label: "Home", href: "/", icon: Home, description: "Main landing page" },
    { label: "Services", href: "/services", icon: Building, description: "Our web development services" },
    { label: "Portfolio", href: "/portfolio", icon: Star, description: "Showcase of our work" },
    { label: "Blog", href: "/blog", icon: FileText, description: "Latest articles and insights" },
    { label: "Packages", href: "/packages", icon: Package, description: "Service packages and pricing" },
    { label: "About", href: "/about", icon: Users, description: "Learn about our team" },
    { label: "FAQ", href: "/faq", icon: HelpCircle, description: "Frequently asked questions" },
    { label: "Contact", href: "/contact", icon: MessageSquare, description: "Get in touch with us" },
    { label: "Dashboard", href: "/dashboard", icon: BarChart3, description: "Admin dashboard" },
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

  const testPages = [
    { label: "Simple Test", href: "/simple-test", description: "Basic functionality test" },
    { label: "Test Supabase", href: "/test-supabase", description: "Database connection test" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 scroll-smooth overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 w-full overflow-hidden">
        {/* Header */}
        <div className="mb-12">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Previous Page
            </Button>
          </div>
          
          {/* Title and Description */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-words">
              All Website Pages
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto break-words">
              Navigate to any page on the Lunexweb website. This overview shows all available pages and their purposes.
            </p>
          </div>
        </div>

        {/* Main Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Main Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {mainPages.map((page) => (
              <Card key={page.href} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <page.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{page.label}</CardTitle>
                      <CardDescription className="text-sm">{page.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link
                    to={page.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Visit Page →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Location Pages
            <Badge variant="secondary">{locationPages.length} cities</Badge>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 w-full">
            {locationPages.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{page.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Province Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Building className="h-6 w-6" />
            Province Pages
            <Badge variant="secondary">{provincePages.length} provinces</Badge>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {provincePages.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <Building className="h-8 w-8 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-900">{page.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Test Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Test Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {testPages.map((page) => (
              <Card key={page.href} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{page.label}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={page.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Visit Page →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Website Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{mainPages.length}</div>
              <div className="text-sm text-gray-600">Main Pages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{locationPages.length}</div>
              <div className="text-sm text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{provincePages.length}</div>
              <div className="text-sm text-gray-600">Provinces</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{testPages.length}</div>
              <div className="text-sm text-gray-600">Test Pages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPages;
