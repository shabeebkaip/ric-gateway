import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CTASection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-padding max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get In Touch
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Let's Transform Healthcare Together
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to get started? Fill out the form below and our team will reach out to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 shadow-xl border-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+966 XX XXX XXXX"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-base">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Hospital/Clinic"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary hover:from-gold hover:to-primary transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-gold/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gold/30 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-gold/20 group-hover:to-primary/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <a
                    href="tel:+966"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +966 XX XXX XXXX
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mon-Fri 8am-6pm
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gold/30 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-gold/20 group-hover:to-primary/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:info@ric.com.sa"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    info@ric.com.sa
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    24/7 support available
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gold/30 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-gold/20 group-hover:to-primary/20 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    Riyadh, Saudi Arabia
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visit us by appointment
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg bg-gradient-to-br from-gold/5 via-primary/5 to-primary/10 border-gold/20 hover:border-gold/40 transition-all duration-300">
              <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">Quick Response</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team typically responds within 2-4 business hours. For urgent matters, please call us directly.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-green-500 animate-pulse shadow-lg shadow-gold/50"></div>
                Available Now
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
