"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Shield, 
  RefreshCw,
  ArrowRight,
  GraduationCap,
  // Award,
  //LucideIcon
} from "lucide-react";

// interface SocialMedia {
//   name: string
//   href: string
//   icon: string
//   bgColor: string
// }

// interface NavLink {
//   href: string
//   label: string
// }

// interface FooterLink {
//   href: string
//   label: string
//   icon: LucideIcon
// }

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary/90 text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    Dream Coaching
                  </h3>
                  <p className="text-sm text-primary-foreground/70">Excellence in Education</p>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Dream Coaching is a comprehensive online learning platform established in 2024, 
                serving over 10,000+ students nationwide. We provide quality education accessible 
                to everyone, including remote areas.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary-foreground/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">10K+</div>
                  <div className="text-xs text-primary-foreground/70">Students</div>
                </div>
                <div className="text-center p-3 bg-primary-foreground/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-xs text-primary-foreground/70">Courses</div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {[
                  { 
                    name: "Facebook", 
                    href: "#", 
                    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png",
                    bgColor: "hover:bg-[#1877F2]"
                  },
                  
                  { 
                    name: "Twitter", 
                    href: "#", 
                    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
                    bgColor: "hover:bg-[#1DA1F2]"
                  },
                  { 
                    name: "Instagram", 
                    href: "#", 
                    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
                    bgColor: "hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#C13584]"
                  },
                  { 
                    name: "LinkedIn", 
                    href: "#", 
                    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
                    bgColor: "hover:bg-[#0077B5]"
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-primary-foreground/10 ${social.bgColor} rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Image 
                      src={social.icon} 
                      alt={social.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-accent">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/courses", label: "Courses" },
                  { href: "/instructors", label: "Instructors" },
                  { href: "/about-us", label: "About Us" },
                  { href: "/contact", label: "Contact Us" }
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors duration-200 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-accent">Popular Courses</h4>
              <ul className="space-y-3">
                {[
                  "Academic Preparation",
                  "University Admission",
                  "Mathematics Mastery",
                  "Science & Physics",
                  "Technology & Programming",
                  "Language Learning"
                ].map((course) => (
                  <li key={course}>
                    <a 
                      href="#"
                      className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors duration-200 group"
                    >
                      <GraduationCap className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                      {course}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-accent">Stay Connected</h4>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-xs text-primary-foreground/70">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs text-primary-foreground/70">info@dreamcoaching.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-xs text-primary-foreground/70">123 Education St, Learning City</div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
                <p className="text-xs text-primary-foreground/70 mb-3">
                  Get updates on new courses and offers
                </p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="text-xs bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Mail className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary-foreground/80">Pay With:</span>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Visa", "Mastercard", "PayPal", "Stripe", "Apple Pay", "Google Pay",
                    "American Express", "Discover", "bKash", "Nagad", "Rocket", "Upay",
                    "DBBL", "EBL", "City Bank", "Standard Chartered", "One Money", "Pocket"
                  ].map((method) => (
                    <div 
                      key={method}
                      className="px-3 py-1 bg-primary-foreground/10 rounded-lg text-xs font-medium hover:bg-accent/20 transition-colors duration-200 cursor-pointer"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
                  <Shield className="w-4 h-4" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image 
                    src="https://sslcommerz.com/wp-content/uploads/2021/11/logo.png"
                    alt="Verified by SSLCommerz"
                    width={100}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 bg-primary-foreground/5">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-primary-foreground/70">
                © 2025 Dream Coaching. All Rights Reserved.
              </div>
              
              <div className="flex items-center gap-6 text-xs">
                {[
                  { href: "#", label: "Terms & Conditions", icon: FileText },
                  { href: "#", label: "Privacy Policy", icon: Shield },
                  { href: "#", label: "Refund Policy", icon: RefreshCw }
                ].map((link) => (
                  <a 
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    <link.icon className="w-3 h-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}