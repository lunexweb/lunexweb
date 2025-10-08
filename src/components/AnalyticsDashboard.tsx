import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Phone, Mail, MousePointer } from "lucide-react";

interface AnalyticsData {
  totalPageViews: number;
  totalLeads: number;
  conversionRate: number;
  topLocations: Array<{
    location: string;
    visits: number;
    leads: number;
  }>;
  topServices: Array<{
    service: string;
    interest: number;
    conversions: number;
  }>;
  contactMethods: {
    phone: number;
    email: number;
    whatsapp: number;
    form: number;
  };
  recentActivity: Array<{
    type: string;
    location: string;
    service: string;
    timestamp: string;
  }>;
}

export const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalPageViews: 0,
    totalLeads: 0,
    conversionRate: 0,
    topLocations: [],
    topServices: [],
    contactMethods: { phone: 0, email: 0, whatsapp: 0, form: 0 },
    recentActivity: []
  });

  useEffect(() => {
    // This would typically fetch from your analytics API
    // For now, we'll simulate some data
    const mockData: AnalyticsData = {
      totalPageViews: 2847,
      totalLeads: 156,
      conversionRate: 5.48,
      topLocations: [
        { location: "Cape Town", visits: 892, leads: 45 },
        { location: "Johannesburg", visits: 756, leads: 38 },
        { location: "Durban", visits: 623, leads: 28 },
        { location: "Pretoria", visits: 445, leads: 22 },
        { location: "Sandton", visits: 387, leads: 18 }
      ],
      topServices: [
        { service: "Law Firm Websites", interest: 234, conversions: 45 },
        { service: "Consulting Agency", interest: 189, conversions: 38 },
        { service: "Luxury Brands", interest: 156, conversions: 28 },
        { service: "Real Estate", interest: 134, conversions: 22 },
        { service: "Financial Services", interest: 98, conversions: 18 }
      ],
      contactMethods: {
        phone: 67,
        email: 34,
        whatsapp: 89,
        form: 156
      },
      recentActivity: [
        { type: "Lead", location: "Cape Town", service: "Law Firm", timestamp: "2 minutes ago" },
        { type: "WhatsApp", location: "Johannesburg", service: "Consulting", timestamp: "5 minutes ago" },
        { type: "Phone", location: "Durban", service: "Real Estate", timestamp: "8 minutes ago" },
        { type: "Lead", location: "Pretoria", service: "Financial", timestamp: "12 minutes ago" },
        { type: "WhatsApp", location: "Sandton", service: "Luxury", timestamp: "15 minutes ago" }
      ]
    };
    setAnalyticsData(mockData);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topLocations.map((location, index) => (
              <div key={location.location} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{location.location}</p>
                    <p className="text-sm text-muted-foreground">{location.visits} visits</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{location.leads} leads</p>
                  <p className="text-sm text-muted-foreground">
                    {((location.leads / location.visits) * 100).toFixed(1)}% conversion
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Phone Calls</span>
                </div>
                <span className="font-medium">{analyticsData.contactMethods.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Email</span>
                </div>
                <span className="font-medium">{analyticsData.contactMethods.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MousePointer className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Contact Forms</span>
                </div>
                <span className="font-medium">{analyticsData.contactMethods.form}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{activity.type}</span> from{" "}
                    <span className="text-muted-foreground">{activity.location}</span>
                  </div>
                  <span className="text-muted-foreground">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Services */}
      <Card>
        <CardHeader>
          <CardTitle>Service Interest & Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topServices.map((service, index) => (
              <div key={service.service} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{service.service}</p>
                  <p className="text-sm text-muted-foreground">{service.interest} interested</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{service.conversions} conversions</p>
                  <p className="text-sm text-muted-foreground">
                    {((service.conversions / service.interest) * 100).toFixed(1)}% rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



