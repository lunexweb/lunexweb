import { LocationPage } from "@/components/LocationPage";

const KwaZuluNatal = () => {
  const data = {
    province: "KwaZulu-Natal",
    city: "KwaZulu-Natal",
    population: "11.5 million",
    description: "KwaZulu-Natal is South Africa's manufacturing and logistics hub with Durban as Africa's busiest port. Local businesses need websites that appeal to both domestic and international markets.",
    majorIndustries: ["Manufacturing", "Shipping & Logistics", "Agriculture", "Tourism", "Technology", "Healthcare", "Education"],
    localCompetitors: ["Port contractors", "Local agencies", "Industrial developers"],
    testimonials: [
      {
        name: "Nomsa Dlamini",
        company: "Durban Shipping Solutions",
        quote: "Our international clients now find us easily online. Lunexweb created a professional website that generates serious inquiries.",
        rating: 5
      },
      {
        name: "Dr. Sipho Mthembu",
        company: "Pietermaritzburg Clinic",
        quote: "Our patient base grew significantly after Lunexweb improved our online presence. Professional service throughout.",
        rating: 5
      },
      {
        name: "Raj Patel",
        company: "Umhlanga Medical Centre",
        quote: "Patient bookings increased 250% after our website redesign. The quality difference is remarkable.",
        rating: 5
      }
    ],
    stats: {
      businesses: "85,000+",
      avgRevenue: "+320%",
      growthRate: "82%"
    }
  };

  return <LocationPage {...data} />;
};

export default KwaZuluNatal;







