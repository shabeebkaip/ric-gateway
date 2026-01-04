'use client';

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, LucideIcon, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  details: string[];
  link?: string;
  color: string;
}

export const ContactPageContent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Kingdom of Saudi Arabia",
        "Riyadh, Orouba Street",
        "RIC Complex",
        "P.O. Box 223, Riyadh 2324"
      ],
      color: "text-primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+966 11 465 4113"],
      link: "tel:+966114654113",
      color: "text-gold",
    },
    {
      icon: Printer,
      title: "Fax",
      details: ["+966 11 463 0135"],
      color: "text-accent",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@ric.com.sa"],
      link: "mailto:info@ric.com.sa",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Sunday - Thursday", "8:00 AM - 5:00 PM"],
      color: "text-gold",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold/10 to-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Contact <span className="gradient-text">RIC Medical Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our medical equipment or healthcare solutions? 
              We're here to help. Reach out to our team and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container-padding container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 hover:shadow-card transition-all duration-300 border border-border/50 hover:border-gold/30"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      info.link && i === 0 ? (
                        <a
                          key={i}
                          href={info.link}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      )
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Map */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container-padding container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 border border-border/50"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-2 focus:border-gold transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="border-2 focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+966 XX XXX XXXX"
                      className="border-2 focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground font-medium">
                    Company/Organization
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className="border-2 focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    required
                    rows={6}
                    className="border-2 focus:border-gold transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Visit Our Office
                </h2>
                <p className="text-muted-foreground mb-6">
                  Located in the heart of Riyadh, our facility is easily accessible and equipped 
                  with the latest medical technology demonstrations.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">
                        Riyadh International Corporation Medical Equipments & Services, Ltd
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kingdom of Saudi Arabia, Riyadh, Orouba street, RIC Complex
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+966114654113" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        +966 11 465 4113
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-2xl border-4 border-border/50 hover:border-gold/30 transition-colors duration-300"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.030488341401!2d46.68054207543805!3d24.716616850998157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03048c8ab6cd%3A0x37200af5e3ccaffc!2sRIYADH%20INTERNATIONAL%20CORPORATION!5e1!3m2!1sen!2ssa!4v1767512862403!5m2!1sen!2ssa"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="py-12 bg-gradient-to-r from-primary/10 via-gold/5 to-primary/10">
        <div className="container-padding container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our dedicated team is ready to help you with any inquiries about our medical equipment and healthcare solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+966114654113"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href="mailto:info@ric.com.sa"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
