'use client';

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CTASectionCentered = () => {
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

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+966 XX XXX XXXX",
      subtitle: "Mon-Fri 8am-6pm",
      href: "tel:+966",
      gradient: "from-gold to-primary",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@ric.com.sa",
      subtitle: "24/7 support",
      href: "mailto:info@ric.com.sa",
      gradient: "from-primary to-accent",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Riyadh, Saudi Arabia",
      subtitle: "By appointment",
      href: "#",
      gradient: "from-accent to-gold",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Minimal Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-padding container mx-auto relative z-10 max-w-5xl">
        {/* Header - Centered */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Contact Us</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ready to </span>
            <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with us today and discover how we can transform your healthcare facility
          </p>
        </motion.div>

        {/* Contact Methods - Horizontal Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border-2 border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${method.gradient} p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{method.title}</h3>
              <p className="text-foreground font-medium mb-1">{method.value}</p>
              <p className="text-sm text-muted-foreground">{method.subtitle}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form - Centered */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Send Us a Message
              </h3>
              <p className="text-muted-foreground">
                Fill out the form below and we'll respond within 24 hours
              </p>
            </div>

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
                    className="h-12 border-2 focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-12 border-2 focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 XX XXX XXXX"
                    required
                    className="h-12 border-2 focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Hospital/Clinic"
                    className="h-12 border-2 focus:border-gold transition-colors"
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
                  className="resize-none border-2 focus:border-gold transition-colors"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-500 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Trust Badge */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>We typically respond within 2-4 business hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
