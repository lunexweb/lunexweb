import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    role: "Managing Partner, Law Firm",
    text: "Lunexweb worked with us on creating a sophisticated website for our law firm. It was a complex project with many moving parts, but they were always professional and handled all the technical details extremely well. They kept us updated throughout the process and delivered an exceptional result that perfectly represents our brand."
  },
  {
    role: "CEO, Consulting Agency",
    text: "Lunexweb is incredible to work with and delivers amazing results. I highly recommend working with them - they are not only thorough and dedicated but also approachable and friendly. It was a pleasure working with their team and I really think they are one of the best web development companies in the market."
  },
  {
    role: "Marketing Director, Corporate Organization",
    text: "Lunexweb are incredibly knowledgeable, professional and easy to work with. They listen carefully and worked to ensure the right solutions were presented. This was undoubtedly a result of their industry and technical knowledge, which sets them apart in the web development industry. They are also pragmatic, underpromise and overdeliver. I'd use them again."
  },
  {
    role: "Founder, Luxury Brand",
    text: "The Lunexweb team were brilliant in walking us through their detailed knowledge of web technologies and taking the time to really understand what we were looking for. The process was smooth throughout - we found their design sessions to be very helpful, and having all the technical aspects handled by their team was fantastic. When it came to choosing between different approaches, we felt they were focused on making sure it was the right choice for our business."
  },
  {
    role: "Operations Director, Financial Services",
    text: "I have worked with Lunexweb extensively over the last few months. They are extremely professional and knowledgeable about web development. But most of all they are adept at creating excellent digital solutions. I think this is because they are willing to invest time getting to know our business and requirements, and are then able to use their technical knowledge to find the right solutions. I highly recommend them."
  },
  {
    role: "E-commerce Manager, Retail Company",
    text: "Very personable and professional team. They took the time to fully understand our requirements and delivered an exceptional e-commerce platform. Great support throughout the development process and excellent post-launch maintenance. Highly recommended."
  },
  {
    role: "Brand Manager, Luxury Fashion",
    text: "Lunexweb was so helpful throughout the whole website development process. They kept us updated on the project timeline and helped us prepare all the content and assets. The final result exceeded our expectations and we couldn't have done it without them!"
  },
  {
    role: "IT Director, Corporate Firm",
    text: "The development process was very smooth and I was impressed with the way Lunexweb conducts themselves. They are top of my list for when we next need web development services and I'd be happy to recommend them to my colleagues in other departments."
  },
  {
    role: "Digital Marketing Manager, Professional Services",
    text: "Lunexweb continually impress us with their understanding of our specific web development needs, together with the quality of service they deliver. It's unusual for web development companies to deliver on both technical excellence and client service consistently. We know that every project landing on their desk is carefully considered and worth reviewing. Their technical knowledge and user-friendly approach has been instrumental in helping us build a market-leading digital presence."
  },
  {
    role: "Managing Director, Boutique Agency",
    text: "Lunexweb have a first-rate understanding of web development and always go the extra mile in finding the right solution. I wholeheartedly recommend them for any professional web development needs."
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-900 text-white overflow-x-hidden" style={{ maxWidth: '100vw' }}>
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="text-sm text-slate-400 tracking-widest uppercase">testimonials</div>
          <h2 className="text-3xl md:text-4xl font-light text-white">What Our Clients Say</h2>
          <div className="text-slate-400 text-lg">// 01</div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-white">{testimonials[currentIndex].role}</h3>
            <p className="text-slate-300 text-xl leading-relaxed">
              {testimonials[currentIndex].text}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-slate-400">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-gray-900"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
