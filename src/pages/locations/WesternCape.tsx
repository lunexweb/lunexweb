import { LocationPage } from "@/components/LocationPage";

const WesternCape = () => {
  const data = {
    province: "Western Cape",
    city: "Western Cape",
    population: "7.1 million",
    description: "The Western Cape is South Africa's premier business destination with Cape Town as its economic hub. From tech startups to established corporations, businesses across the province need world-class websites to compete globally.",
    majorIndustries: ["Technology", "Tourism & Hospitality", "Agriculture & Wine", "Finance", "Manufacturing", "Education", "Real Estate"],
    localCompetitors: ["Local agencies", "International firms", "Freelance developers"],
    testimonials: [
      {
        name: "Sarah Mitchell",
        company: "Cape Town Legal Group",
        quote: "Lunexweb transformed our online presence across the Western Cape. We went from 2 leads per month to 15+ qualified inquiries.",
        rating: 5
      },
      {
        name: "Johan van Zyl",
        company: "Stellenbosch Wine Estate",
        quote: "Our wine sales increased 280% after Lunexweb redesigned our website. The quality far exceeds our expectations.",
        rating: 5
      },
      {
        name: "David Chen",
        company: "Table Mountain Consulting",
        quote: "Professional service that understands the Western Cape market. Our website now converts 3x better than before.",
        rating: 5
      }
    ],
    stats: {
      businesses: "180,000+",
      avgRevenue: "+350%",
      growthRate: "85%"
    }
  };

  return <LocationPage {...data} />;
};

export default WesternCape;
