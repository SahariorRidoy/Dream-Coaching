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
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 sm:py-16 lg:py-24 px-4">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-0 w-40 h-40 sm:w-60 sm:h-60 bg-secondary/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-96 sm:h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-accent/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-md">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            Learning Paths
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-md">
            Choose Your Learning Path
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Discover diverse courses across multiple disciplines designed to
            help you excel in your academic and admission journey with expert
            guidance.
          </p>
        </div>

        {/* Learning Path Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {learningPaths.map((path, index) => (
            <Card
              key={path.title}
              className={cn(
                "group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-transparent bg-card/80 backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer",
                "hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-background",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-accent"></div>
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-secondary"></div>
              </div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                {/* Icon Section */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="relative">
                    <div
                      className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20"
                      )}
                    >
                      <path.lucideIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-xs font-medium px-2 sm:px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    )}
                  >
                    <span className="hidden sm:inline">{path.students}</span>
                    <span className="sm:hidden">{path.students.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold group-hover:translate-x-1 transition-transform duration-300 group-hover:text-primary">
                    {path.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">{path.desc}</p>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  className={cn(
                    "mt-4 sm:mt-6 w-full justify-between group/btn rounded-lg sm:rounded-xl border-2 border-accent/50 text-sm sm:text-base",
                    "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20",
                    "backdrop-blur-sm hover:border-accent h-10 sm:h-11"
                  )}
                >
                  <span className="font-medium">Explore Courses</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            Need help choosing the right path?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground transition-opacity duration-200 rounded-xl px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Get Personalized Recommendations</span>
            <span className="sm:hidden">Get Recommendations</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
