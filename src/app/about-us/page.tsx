"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminMember {
  name: string
  role: string
  image: string
  experience: string
  education: string
  email: string
  phone: string
}

// interface Teacher {
//   name: string
//   role: string
//   image: string
//   subjects: string[]
//   experience: string
//   education: string
// }

interface Stat {
  label: string
  value: string
  icon: LucideIcon
}

const adminTeam: AdminMember[] = [
  {
    name: "Dr. Ahmed Rahman",
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",

    experience: "15+ Years",
    education: "PhD in Mathematics, Dhaka University",
    email: "ahmed@dreamcoaching.com",
    phone: "+880 1309270105",
  },
  {
    name: "Fatima Khan",
    role: "Academic Director",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",

    experience: "12+ Years",
    education: "M.Ed in Educational Leadership",
    email: "fatima@dreamcoaching.com",
    phone: "+880 1309270106",
  },
];

// const teachers: Teacher[] = [
//   {
//     name: "Mohammad Ali",
//     role: "Mathematics Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Algebra", "Calculus", "Geometry"],
//     experience: "8 Years",
//     education: "M.Sc in Mathematics",
//   },
//   {
//     name: "Rashida Begum",
//     role: "Physics Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Mechanics", "Thermodynamics", "Optics"],
//     experience: "10 Years",
//     education: "M.Sc in Physics",
//   },
//   {
//     name: "Karim Hassan",
//     role: "Chemistry Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Organic", "Inorganic", "Physical Chemistry"],
//     experience: "7 Years",
//     education: "M.Sc in Chemistry",
//   },
//   {
//     name: "Nasreen Ahmed",
//     role: "Biology Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Botany", "Zoology", "Human Biology"],
//     experience: "9 Years",
//     education: "M.Sc in Biology",
//   },
//   {
//     name: "Rafiq Islam",
//     role: "English Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Grammar", "Literature", "Composition"],
//     experience: "11 Years",
//     education: "M.A in English Literature",
//   },
//   {
//     name: "Salma Khatun",
//     role: "Bangla Teacher",
//     image: "https://i.pravatar.cc/300?img=6",
//     subjects: ["Grammar", "Literature", "Composition"],
//     experience: "6 Years",
//     education: "M.A in Bangla Literature",
//   },
// ];

const stats: Stat[] = [
  { label: "Years of Excellence", value: "15+", icon: Award },
  { label: "Students Taught", value: "18,382", icon: Users },
  { label: "Expert Teachers", value: "25+", icon: GraduationCap },
  { label: "Courses Offered", value: "27", icon: BookOpen },
];

const AboutUsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-6 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-fade-in">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground  px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md">
            <GraduationCap className="w-5 h-5" />
            Bangladesh&#39;s Premier Coaching Center
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 drop-shadow">
            About Dream Coaching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Empowering students to achieve their academic dreams through world-class education, expert guidance, and personalized learning experiences since 2009.
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              // Colorful gradients for each card
              const gradients = [
                "from-pink-400  to-yellow-200",
                "from-blue-400  to-green-300",
                "from-purple-500  to-pink-300",
                "from-orange-400  to-lime-200",
              ];
              return (
                <Card
                  key={stat.label}
                  className={`rounded-2xl p-8 shadow-xl bg-gradient-to-br ${gradients[i % gradients.length]} animate-fade-in border-0`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/30 mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </span>
                    <div className="text-4xl font-extrabold text-white drop-shadow mb-1">
                      {stat.value}
                    </div>
                    <div className="text-base font-medium text-white/90">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To provide exceptional educational support that helps students excel in their academic journey. We believe every student has the potential to succeed with the right guidance and resources.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Quality education for all students
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Personalized learning approaches
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Building confidence and skills
                </li>
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To be the leading coaching center in Bangladesh, recognized for our commitment to academic excellence and student success. We envision a future where every student achieves their educational goals.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Excellence in education delivery
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Innovation in teaching methods
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Community impact and growth
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="relative z-10 py-20 px-4 bg-muted/60">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the visionary leaders who guide Dream Coaching towards excellence in education and student development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {adminTeam.map((admin, i) => (
              <Card
                key={admin.name}
                className="border-0 shadow-lg bg-card overflow-hidden animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mt-6 shadow-md border-4 border-white bg-muted">
                    <Image
                      src={admin.image || "/placeholder.svg"}
                      alt={admin.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 w-full">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {admin.name}
                      </h3>
                      <Badge className="bg-secondary/80 text-secondary-foreground border-secondary/30">
                        {admin.role}
                      </Badge>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {admin.experience} Experience
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.education}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Join thousands of successful students and experience the Dream Coaching difference.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Explore Our Courses
          </Link>
        </div>
      </section>

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

export default AboutUsPage;
