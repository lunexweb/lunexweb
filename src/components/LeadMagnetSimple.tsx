import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SimpleLeadMagnetProps {
  title: string;
  description: string;
  className?: string;
}

export const SimpleLeadMagnet = ({ title, description, className = "" }: SimpleLeadMagnetProps) => {
  return (
    <Card className={`h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 ${className}`}>
      <CardContent className="p-6 h-full flex flex-col justify-center text-center">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export const SimpleWebsiteAuditMagnet = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Free Website Audit"
    description="Get a comprehensive analysis of your current website with actionable recommendations."
    className={className}
  />
);

export const SimpleLeadGenerationGuide = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Website Conversion Guide"
    description="Download our exclusive 47-page guide with proven strategies."
    className={className}
  />
);

export const SimpleROICalculator = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="ROI Calculator"
    description="Calculate exactly how much revenue a professional website will generate."
    className={className}
  />
);

export const SimpleWebsiteTemplate = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Professional Template"
    description="Get our premium website template designed specifically for professional service businesses."
    className={className}
  />
);



