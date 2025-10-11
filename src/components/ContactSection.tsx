import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Zap, Headphones } from "lucide-react";
import { db } from "@/lib/supabase";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    service: "",
    budget: "",
    message: "",
    remoteWork: "",
    remoteWorkDetails: ""
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location,
        service_type: formData.service,
        budget_range: formData.budget,
        message: formData.message,
        remote_work: formData.remoteWork,
        remote_work_details: formData.remoteWorkDetails,
        lead_score: 50, // Default score
        status: 'new' as const,
        source: 'website_contact_form',
        priority: 'medium' as const,
        estimated_value: null,
        notes: null,
        timeline: null,
        website_url: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        assigned_to: null,
        last_contacted_at: null
      };

      await db.createLead(leadData);
      
      toast({
        title: "🎉 Thank you! We'll contact you as soon as possible",
        description: "Our team will analyze your requirements and send you a detailed proposal for your professional website project.",
      });
      
      setFormData({ name: "", email: "", phone: "", company: "", location: "", service: "", budget: "", message: "", remoteWork: "", remoteWorkDetails: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your web development services. I'm ready to get started - your team is waiting to help me!";
    const whatsappUrl = `https://wa.me/27789992503?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLiveChatClick = () => {
    toast({
      title: "💬 Live Chat Available",
      description: "Our support team is online and ready to help you right now! Click the WhatsApp button below to start chatting.",
    });
  };

  const services = [
    "Law Firm Website Development",
    "Consulting Agency Websites", 
    "Financial Services Websites",
    "Real Estate Agency Websites",
    "Luxury Brand Websites",
    "E-commerce Development",
    "Corporate Websites",
    "Professional Service Websites"
  ];

  const budgetRanges = [
    "R5,000 - R15,000",
    "R15,000 - R30,000",
    "R30,000 - R50,000",
    "R50,000 - R100,000",
    "R100,000+",
    "Not sure yet"
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Contact us today and let's build something amazing together.
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-light mb-2 text-gray-900">Get Your Free Strategy Session</h3>
                <p className="text-gray-600 text-sm">Professional web development consultation</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Location (City, Province/State) *"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Service Needed *" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Budget Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Tell us about your project goals and requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[120px]"
                  />
                </div>

                {/* Remote Work Question */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-gray-900">
                    Are you interested in working remotely?
                  </Label>
                  <RadioGroup 
                    value={formData.remoteWork} 
                    onValueChange={(value) => setFormData({ ...formData, remoteWork: value, remoteWorkDetails: "" })}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="yes" id="remote-yes" />
                      <Label htmlFor="remote-yes" className="text-sm font-normal cursor-pointer">
                        Yes, I prefer remote work
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="no" id="remote-no" />
                      <Label htmlFor="remote-no" className="text-sm font-normal cursor-pointer">
                        No, I prefer in-person meetings
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="other" id="remote-other" />
                      <Label htmlFor="remote-other" className="text-sm font-normal cursor-pointer">
                        Other (please specify)
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {/* Conditional text input for "Other" */}
                  {formData.remoteWork === "other" && (
                    <div className="mt-3">
                      <Input
                        type="text"
                        placeholder="Please specify your preference..."
                        value={formData.remoteWorkDetails}
                        onChange={(e) => setFormData({ ...formData, remoteWorkDetails: e.target.value })}
                        className="w-full"
                        maxLength={100}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.remoteWorkDetails.length}/100 characters
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-white text-lg py-6"
                    style={{ backgroundColor: '#22C55E' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Send to a professional
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-muted-foreground text-sm font-medium">Or</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="text-lg py-6 border-green-500 text-green-600 hover:bg-green-50"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat on WhatsApp
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="text-lg py-6 border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={handleLiveChatClick}
                    >
                      <Headphones className="w-5 h-5 mr-2" />
                      Live Chat Support
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
