export interface LocationData {
  province: string;
  city: string;
  population: string;
  description: string;
  majorIndustries: string[];
  localCompetitors: string[];
  testimonials: Array<{
    name: string;
    company: string;
    quote: string;
    rating: number;
  }>;
  stats: {
    businesses: string;
    avgRevenue: string;
    growthRate: string;
  };
}

export const locationData: Record<string, LocationData> = {
  // Western Cape
  "cape-town": {
    province: "Western Cape",
    city: "Cape Town",
    population: "4.6 million",
    description: "Cape Town is South Africa's tech capital and premier business destination. With a thriving economy and growing digital sector, businesses here need websites that stand out from the competition.",
    majorIndustries: ["Tourism & Hospitality", "Technology", "Finance", "Real Estate", "Legal Services", "Consulting"],
    localCompetitors: ["Local web agencies", "Freelance developers", "International agencies"],
    testimonials: [
      {
        name: "Sarah Mitchell",
        company: "Cape Town Legal Group",
        quote: "Lunexweb transformed our online presence. We went from 2 leads per month to 15+ qualified inquiries. Professional service throughout the entire project.",
        rating: 5
      },
      {
        name: "David Chen",
        company: "Table Mountain Consulting",
        quote: "The professionalism and results speak for themselves. Our website now converts much better than our previous developer's work.",
        rating: 5
      },
      {
        name: "Lisa van der Merwe",
        company: "V&A Real Estate",
        quote: "Finally, a web agency that understands Cape Town's luxury market. Our property listings now generate serious inquiries, not tire-kickers.",
        rating: 5
      }
    ],
    stats: {
      businesses: "45,000+",
      avgRevenue: "+340%",
      growthRate: "85%"
    }
  },
  "stellenbosch": {
    province: "Western Cape", 
    city: "Stellenbosch",
    population: "155,000",
    description: "Stellenbosch is the heart of South Africa's wine industry and home to world-class universities. Local businesses need sophisticated websites to compete globally.",
    majorIndustries: ["Wine & Agriculture", "Education", "Tourism", "Technology", "Research", "Hospitality"],
    localCompetitors: ["Local agencies", "Student developers", "Cape Town agencies"],
    testimonials: [
      {
        name: "Johan van Zyl",
        company: "Stellenbosch Wine Estate",
        quote: "Our wine sales increased 280% after Lunexweb redesigned our website. The quality and professionalism exceeded our expectations.",
        rating: 5
      },
      {
        name: "Dr. Maria Santos",
        company: "Stellenbosch Research Institute",
        quote: "Professional, results-driven, and understands our academic market. Our research grants increased significantly.",
        rating: 5
      }
    ],
    stats: {
      businesses: "8,500+",
      avgRevenue: "+280%",
      growthRate: "75%"
    }
  },
  "paarl": {
    province: "Western Cape",
    city: "Paarl", 
    population: "112,000",
    description: "Paarl is a major wine-producing region with growing business districts. Local companies need professional websites to attract both local and international clients.",
    majorIndustries: ["Wine Production", "Manufacturing", "Agriculture", "Tourism", "Retail", "Services"],
    localCompetitors: ["Local developers", "Cape Town agencies", "Freelancers"],
    testimonials: [
      {
        name: "Pieter Botha",
        company: "Paarl Manufacturing Co.",
        quote: "Our B2B leads tripled after working with Lunexweb. The quality and professionalism exceeded our expectations.",
        rating: 5
      }
    ],
    stats: {
      businesses: "6,200+",
      avgRevenue: "+250%",
      growthRate: "70%"
    }
  },

  // Gauteng
  "johannesburg": {
    province: "Gauteng",
    city: "Johannesburg",
    population: "5.6 million",
    description: "Johannesburg is South Africa's economic powerhouse and financial capital. With fierce competition, businesses need websites that convert visitors into clients.",
    majorIndustries: ["Finance & Banking", "Mining", "Manufacturing", "Technology", "Legal Services", "Real Estate", "Consulting"],
    localCompetitors: ["Large agencies", "International firms", "Freelance developers"],
    testimonials: [
      {
        name: "Thabo Mthembu",
        company: "Johannesburg Legal Partners",
        quote: "Lunexweb understands the Johannesburg market. Our client acquisition increased 400% with their professional approach.",
        rating: 5
      },
      {
        name: "Jennifer Smith",
        company: "Sandton Financial Group",
        quote: "Professional, reliable, and delivers results. Our website now generates qualified leads daily instead of weekly.",
        rating: 5
      },
      {
        name: "Michael Brown",
        company: "Rosebank Consulting",
        quote: "The difference in quality is night and day. Lunexweb delivers unmatched professionalism and results.",
        rating: 5
      }
    ],
    stats: {
      businesses: "85,000+",
      avgRevenue: "+420%",
      growthRate: "90%"
    }
  },
  "pretoria": {
    province: "Gauteng",
    city: "Pretoria",
    population: "2.5 million",
    description: "Pretoria is South Africa's administrative capital with a strong government and corporate presence. Local businesses need authoritative websites that build trust.",
    majorIndustries: ["Government", "Education", "Research", "Manufacturing", "Legal Services", "Consulting", "Healthcare"],
    localCompetitors: ["Government contractors", "Local agencies", "Freelancers"],
    testimonials: [
      {
        name: "Dr. Amanda Pretorius",
        company: "Pretoria Medical Practice",
        quote: "Our patient bookings increased 300% after Lunexweb redesigned our website. The professionalism shows in every detail.",
        rating: 5
      },
      {
        name: "Robert van der Walt",
        company: "Tshwane Legal Services",
        quote: "Finally, a web agency that understands Pretoria's professional market. Our client base has grown exponentially.",
        rating: 5
      }
    ],
    stats: {
      businesses: "35,000+",
      avgRevenue: "+350%",
      growthRate: "80%"
    }
  },
  "sandton": {
    province: "Gauteng",
    city: "Sandton",
    population: "222,000",
    description: "Sandton is Africa's richest square mile and home to major corporations. Businesses here need world-class websites that reflect their premium positioning.",
    majorIndustries: ["Finance", "Corporate Services", "Real Estate", "Legal", "Consulting", "Technology", "Luxury Services"],
    localCompetitors: ["International agencies", "Premium developers", "Corporate contractors"],
    testimonials: [
      {
        name: "James Wilson",
        company: "Sandton Financial Advisors",
        quote: "In Sandton, image is everything. Lunexweb delivered a website that matches our premium positioning and generates serious leads.",
        rating: 5
      },
      {
        name: "Sarah Johnson",
        company: "Rivonia Legal Group",
        quote: "Our corporate clients expect excellence. Lunexweb delivered a website that exceeds those expectations and generates results.",
        rating: 5
      }
    ],
    stats: {
      businesses: "12,000+",
      avgRevenue: "+450%",
      growthRate: "95%"
    }
  },

  // KwaZulu-Natal
  "durban": {
    province: "KwaZulu-Natal",
    city: "Durban",
    population: "3.9 million",
    description: "Durban is South Africa's busiest port city and a major business hub. With diverse industries, local businesses need websites that appeal to both local and international markets.",
    majorIndustries: ["Shipping & Logistics", "Manufacturing", "Tourism", "Agriculture", "Technology", "Healthcare"],
    localCompetitors: ["Local agencies", "Port contractors", "Freelancers"],
    testimonials: [
      {
        name: "Nomsa Dlamini",
        company: "Durban Shipping Solutions",
        quote: "Our international clients now find us easily online. The website Lunexweb created is professional and generates serious inquiries.",
        rating: 5
      },
      {
        name: "Raj Patel",
        company: "Umhlanga Medical Centre",
        quote: "Patient bookings increased 250% after our website redesign. The quality and results are remarkable.",
        rating: 5
      }
    ],
    stats: {
      businesses: "42,000+",
      avgRevenue: "+320%",
      growthRate: "85%"
    }
  },
  "pietermaritzburg": {
    province: "KwaZulu-Natal",
    city: "Pietermaritzburg",
    population: "750,000",
    description: "Pietermaritzburg is KZN's capital city with strong government and educational sectors. Local businesses need professional websites to compete regionally.",
    majorIndustries: ["Government", "Education", "Agriculture", "Manufacturing", "Services", "Healthcare"],
    localCompetitors: ["Local developers", "Government contractors", "Freelancers"],
    testimonials: [
      {
        name: "Dr. Sipho Mthembu",
        company: "Pietermaritzburg Clinic",
        quote: "Our patient base grew significantly after Lunexweb improved our online presence. Professional service throughout.",
        rating: 5
      }
    ],
    stats: {
      businesses: "15,000+",
      avgRevenue: "+280%",
      growthRate: "75%"
    }
  },

  // Eastern Cape
  "port-elizabeth": {
    province: "Eastern Cape",
    city: "Port Elizabeth",
    population: "1.3 million",
    description: "Port Elizabeth is a major automotive and manufacturing hub. Local businesses need robust websites to support their industrial and commercial operations.",
    majorIndustries: ["Automotive", "Manufacturing", "Shipping", "Agriculture", "Tourism", "Services"],
    localCompetitors: ["Local agencies", "Industrial contractors", "Freelancers"],
    testimonials: [
      {
        name: "John Anderson",
        company: "PE Manufacturing Solutions",
        quote: "Our B2B leads increased 300% after working with Lunexweb. The website quality far exceeds our expectations.",
        rating: 5
      }
    ],
    stats: {
      businesses: "18,000+",
      avgRevenue: "+290%",
      growthRate: "78%"
    }
  },
  "east-london": {
    province: "Eastern Cape",
    city: "East London",
    population: "400,000",
    description: "East London is a growing industrial and port city. Local businesses need modern websites to attract investment and customers.",
    majorIndustries: ["Manufacturing", "Port Services", "Agriculture", "Tourism", "Education", "Services"],
    localCompetitors: ["Local developers", "Industrial contractors", "Freelancers"],
    testimonials: [
      {
        name: "Lisa Thompson",
        company: "East London Services",
        quote: "Lunexweb transformed our online presence. We're now getting inquiries from across the Eastern Cape region.",
        rating: 5
      }
    ],
    stats: {
      businesses: "8,500+",
      avgRevenue: "+260%",
      growthRate: "72%"
    }
  },

  // Free State
  "bloemfontein": {
    province: "Free State",
    city: "Bloemfontein",
    population: "520,000",
    description: "Bloemfontein is South Africa's judicial capital with strong legal and educational sectors. Local businesses need authoritative websites that build credibility.",
    majorIndustries: ["Legal Services", "Education", "Government", "Agriculture", "Healthcare", "Services"],
    localCompetitors: ["Government contractors", "Local agencies", "Freelancers"],
    testimonials: [
      {
        name: "Advocate Maria van der Berg",
        company: "Bloemfontein Legal Chambers",
        quote: "Our legal practice grew significantly after Lunexweb redesigned our website. The professionalism reflects our high standards.",
        rating: 5
      }
    ],
    stats: {
      businesses: "12,000+",
      avgRevenue: "+270%",
      growthRate: "74%"
    }
  },

  // Mpumalanga
  "nelspruit": {
    province: "Mpumalanga",
    city: "Nelspruit",
    population: "110,000",
    description: "Nelspruit is the gateway to Kruger National Park and a growing business center. Local businesses need websites that attract both tourists and business clients.",
    majorIndustries: ["Tourism", "Agriculture", "Mining", "Healthcare", "Services", "Real Estate"],
    localCompetitors: ["Tourism agencies", "Local developers", "Freelancers"],
    testimonials: [
      {
        name: "Pieter Kruger",
        company: "Nelspruit Tourism Services",
        quote: "Our tourist bookings increased 350% after Lunexweb improved our website. The quality is outstanding.",
        rating: 5
      }
    ],
    stats: {
      businesses: "4,500+",
      avgRevenue: "+310%",
      growthRate: "80%"
    }
  },

  // Limpopo
  "polokwane": {
    province: "Limpopo",
    city: "Polokwane",
    population: "130,000",
    description: "Polokwane is Limpopo's capital with growing mining and agricultural sectors. Local businesses need professional websites to compete regionally.",
    majorIndustries: ["Mining", "Agriculture", "Government", "Education", "Healthcare", "Services"],
    localCompetitors: ["Mining contractors", "Local agencies", "Freelancers"],
    testimonials: [
      {
        name: "Thabo Ramaphosa",
        company: "Polokwane Mining Services",
        quote: "Our website now attracts serious business inquiries. Lunexweb understands our market perfectly.",
        rating: 5
      }
    ],
    stats: {
      businesses: "5,200+",
      avgRevenue: "+250%",
      growthRate: "70%"
    }
  },

  // North West
  "rustenburg": {
    province: "North West",
    city: "Rustenburg",
    population: "550,000",
    description: "Rustenburg is a major mining center with growing business sectors. Local companies need robust websites to support their industrial operations.",
    majorIndustries: ["Mining", "Agriculture", "Manufacturing", "Services", "Real Estate", "Healthcare"],
    localCompetitors: ["Mining contractors", "Local developers", "Freelancers"],
    testimonials: [
      {
        name: "David van Wyk",
        company: "Rustenburg Industrial Solutions",
        quote: "Our B2B leads tripled after Lunexweb redesigned our website. The professionalism shows in every detail.",
        rating: 5
      }
    ],
    stats: {
      businesses: "6,800+",
      avgRevenue: "+280%",
      growthRate: "76%"
    }
  },

  // Northern Cape
  "kimberley": {
    province: "Northern Cape",
    city: "Kimberley",
    population: "225,000",
    description: "Kimberley is famous for diamonds and has a growing business sector. Local businesses need websites that reflect their heritage while attracting modern clients.",
    majorIndustries: ["Mining", "Agriculture", "Tourism", "Services", "Healthcare", "Education"],
    localCompetitors: ["Mining contractors", "Local agencies", "Freelancers"],
    testimonials: [
      {
        name: "Anna de Klerk",
        company: "Kimberley Heritage Tours",
        quote: "Our tour bookings increased 200% after Lunexweb improved our website. The quality is exceptional.",
        rating: 5
      }
    ],
    stats: {
      businesses: "3,500+",
      avgRevenue: "+240%",
      growthRate: "68%"
    }
  }
};
