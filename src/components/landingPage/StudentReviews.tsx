'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Tasnuva Tarin",
    text: "এইখানে পড়াশোনা করে আমার অনেক উপকার হয়েছে। সবাইকে রিকমেন্ড করবো।",
    rating: 5,
  },
  {
    name: "Mukiva Khanom",
    text: "কোর্সগুলো খুবই helpful এবং instructors দারুন। ধন্যবাদ Redwan's Method!",
    rating: 5,
  },
  {
    name: "Shamin Shohan",
    text: "Math series টা খুবই effective ছিল! Thanks Redwan Hossain ভাইয়া!",
    rating: 5,
  },
  {
    name: "Rafiul Islam",
    text: "Physics concepts গুলো এত clear করে বুঝিয়েছেন যে exam এ অনেক help পেয়েছি।",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    text: "Admission preparation এর জন্য perfect! Highly recommended for all students.",
    rating: 5,
  },
  {
    name: "Abdullah Al Mamun",
    text: "Community support এবং course quality দুটোই exceptional। Great experience!",
    rating: 5,
  },
];

export default function StudentReviews() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-accent to-background min-h-[100vh]">
      {/* Teal gradients and shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-0 w-56 h-56 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight drop-shadow">
            What Our Students Say
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-medium">
            Discover the transformative experiences of students who have
            achieved success with{" "}
            <span className="text-primary font-semibold">
              Redwan&apos;s Method
            </span>
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-primary fill-accent drop-shadow"
                />
              ))}
              <span className="ml-2 text-foreground font-semibold">
                5.0 from 500+ reviews
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className={`
                bg-card border shadow-xl rounded-2xl 
                transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl animate-fade-in
              `}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardContent className="p-6 relative flex flex-col h-full">
                {/* Quote decoration */}
                <Quote className="absolute top-4 right-4 text-accent w-8 h-8" />

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-primary fill-accent animate-scale-in"
                      style={{ animationDelay: `${idx * 0.1 + i * 0.05}s` }}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-foreground text-base leading-relaxed mb-6 relative z-10 font-medium">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-base
                      bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg border-2 border-accent
                    `}
                  >
                    <span>{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="block text-foreground font-semibold text-sm">
                      {review.name}
                    </span>
                    <span className="block text-muted-foreground text-xs">
                      Student • Redwan&apos;s Method
                    </span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div
          className="text-center mt-16 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-primary mb-4 font-semibold">
            Join thousands of successful students
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-lg border-0 transition-all cursor-pointer">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>Start your learning journey today</span>
          </div>
        </div>
      </div>

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
        @keyframes scale-in {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
