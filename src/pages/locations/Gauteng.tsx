import { LocationPage } from "@/components/LocationPage";

const Gauteng = () => {
  const data = {
    province: "Gauteng",
    city: "Gauteng",
    population: "15.8 million",
    description: "Gauteng is South Africa's economic powerhouse, home to Johannesburg, Pretoria, and Sandton. With the highest concentration of businesses in Africa, companies here need websites that dominate their markets.",
    majorIndustries: ["Finance & Banking", "Mining", "Manufacturing", "Technology", "Legal Services", "Real Estate", "Corporate Services"],
    localCompetitors: ["Large agencies", "International firms", "Corporate contractors"],
    testimonials: [
      {
        name: "Thabo Mthembu",
        company: "Johannesburg Legal Partners",
        quote: "Our client acquisition increased 400% after working with Lunexweb. The professionalism is unmatched.",
        rating: 5
      },
      {
        name: "James Wilson",
        company: "Sandton Financial Advisors",
        quote: "In Gauteng, image is everything. Lunexweb delivered a website that matches our premium positioning.",
        rating: 5
      },
      {
        name: "Dr. Amanda Pretorius",
        company: "Pretoria Medical Practice",
        quote: "Our patient bookings increased 300% after Lunexweb redesigned our website. Exceptional service.",
        rating: 5
      }
    ],
    stats: {
      businesses: "320,000+",
      avgRevenue: "+420%",
      growthRate: "90%"
    }
  };

  return <LocationPage {...data} />;
};

export default Gauteng;





