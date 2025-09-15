"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/10 py-16 px-4 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow">
            <MessageCircle className="w-5 h-5" />
            Contact Dream Coaching
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 drop-shadow">
            Let’s Connect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We’re here to help you succeed. Reach out for course info, support, or
            partnership opportunities. Our team responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 via-card to-secondary/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Mail className="w-7 h-7 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Email</h3>
                    <a
                      href="mailto:dreamcoaching.info@gmail.com"
                      className="text-primary underline"
                    >
                      dreamcoaching.info@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Phone className="w-7 h-7 text-secondary" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Phone</h3>
                    <a href="tel:01309270105" className="text-secondary underline">
                      01309270105
                    </a>
                    <div className="text-xs text-muted-foreground">
                      Mon-Fri, 9am-9pm
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-7 h-7 text-accent" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Office</h3>
                    <div className="text-muted-foreground">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-4 mt-4">
              <a
                href="mailto:dreamcoaching.info@gmail.com"
                className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground font-semibold py-3 rounded-xl shadow transition-all text-center"
              >
                Email Us
              </a>
              <a
                href="tel:01309270105"
                className="flex-1 bg-secondary/90 hover:bg-secondary text-secondary-foreground font-semibold py-3 rounded-xl shadow transition-all text-center"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Send a Message
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm">
                Fill out the form and our team will get back to you soon.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="border-input focus:border-ring focus:ring-ring"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@email.com"
                      className="border-input focus:border-ring focus:ring-ring"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="border-input focus:border-ring focus:ring-ring"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className="h-32 border-input focus:border-ring focus:ring-ring resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground py-3 text-base font-semibold transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl shadow-lg border p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to Start Learning?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students already achieving their goals with Dream Coaching.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-xl shadow">
              Explore Our Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
