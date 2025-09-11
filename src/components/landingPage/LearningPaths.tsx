import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  BookOpen,
  GraduationCap,
  Calculator,
  Atom,
  Laptop,
  Users,
  LucideIcon,
} from "lucide-react";

interface LearningPath {
  title: string
  desc: string
  lucideIcon: LucideIcon
  students: string
}

const learningPaths: LearningPath[] = [
  {
    title: "Academic Courses",
    desc: "Comprehensive academic preparation for all levels",
    lucideIcon: BookOpen,
    students: "2,500+ students",
  },
  {
    title: "Admission Courses",
    desc: "Specialized courses for university admissions and so on",
    lucideIcon: GraduationCap,
    students: "1,800+ students",
  },
  {
    title: "Mathematics",
    desc: "Advanced math concepts and problem solving",
    lucideIcon: Calculator,
    students: "3,200+ students",
  },
  {
    title: "Science & Physics",
    desc: "Comprehensive science and physics courses",
    lucideIcon: Atom,
    students: "2,100+ students",
  },
  {
    title: "Technology",
    desc: "Modern technology and programming courses",
    lucideIcon: Laptop,
    students: "1,600+ students",
  },
  {
    title: "Community",
    desc: "Join our supportive learning community",
    lucideIcon: Users,
    students: "5,000+ members",
  },
];

export default function LearningPaths() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 px-4">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-0 w-60 h-60 bg-secondary/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-accent/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md">
            <BookOpen className="w-4 h-4" />
            Learning Paths
          </div>
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 drop-shadow-md">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover diverse courses across multiple disciplines designed to
            help you excel in your academic and admission journey with expert
            guidance.
          </p>
        </div>

        {/* Learning Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {learningPaths.map((path, index) => (
            <Card
              key={path.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-2 border-transparent bg-card/80 backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer",
                "hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-background",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-secondary"></div>
              </div>

              <div className="relative p-8">
                {/* Icon Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20"
                      )}
                    >
                      <path.lucideIcon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    )}
                  >
                    {path.students}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:translate-x-1 transition-transform duration-300 group-hover:text-primary">
                    {path.title}
                  </h3>
                  <p className=" text-base leading-relaxed">{path.desc}</p>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  className={cn(
                    "mt-6 w-full justify-between group/btn rounded-xl border-2 border-accent/50",
                    "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20",
                    "backdrop-blur-sm hover:border-accent"
                  )}
                >
                  <span className="font-medium">Explore Courses</span>
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need help choosing the right path?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground transition-opacity duration-200 rounded-xl px-8 py-3 text-lg shadow-lg"
          >
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
}
