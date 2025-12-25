import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CTASectionSplit = () => {
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

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Contact Info with Gradient Background */}
        <motion.div
          className="relative bg-gradient-to-br from-gold via-primary to-accent p-12 lg:p-16 flex flex-col justify-center text-white overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Let's Start a Conversation
              </h2>
              
              <p className="text-xl text-white/90 mb-12">
                Ready to transform your healthcare facility? Our team is here to help you find the perfect medical solutions.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <a href="tel:+966" className="text-white/90 hover:text-white text-lg">
                    +966 XX XXX XXXX
                  </a>
                  <p className="text-sm text-white/70 mt-1">Mon-Fri 8am-6pm (GMT+3)</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <a href="mailto:info@ric.com.sa" className="text-white/90 hover:text-white text-lg">
                    info@ric.com.sa
                  </a>
                  <p className="text-sm text-white/70 mt-1">24/7 support available</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                  <p className="text-white/90 text-lg">Riyadh, Saudi Arabia</p>
                  <p className="text-sm text-white/70 mt-1">By appointment only</p>
                </div>
              </motion.div>
            </div>

            {/* Response Time Badge */}
            <motion.div
              className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Quick Response Guarantee</h3>
              </div>
              <p className="text-white/80 text-sm">
                We respond to all inquiries within 2-4 business hours. For urgent matters, please call us directly.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          className="bg-background p-12 lg:p-16 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
                <MessageSquare className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-gold">Send us a message</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Get in Touch
              </h3>
              <p className="text-muted-foreground text-lg">
                Fill out the form and we'll get back to you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
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
                <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
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
                <Label htmlFor="company" className="text-base font-medium">Company/Organization</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Hospital/Clinic"
                  className="h-12 border-2 focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  required
                  rows={5}
                  className="resize-none border-2 focus:border-gold transition-colors"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
