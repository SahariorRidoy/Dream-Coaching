"use client";

import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary to-primary/85 py-16 md:py-24 text-primary-foreground">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold mb-4">
            For Class 6–12 & University Admission
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground mb-4">
            Empowering Students to Ace Exams and Admissions
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-6 max-w-xl">
            Personalized coaching, expert instructors, and proven results to help you achieve academic excellence.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="courses"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition-colors"
            >
              Explore Courses
            </a>
            <a
              href="contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold shadow hover:bg-accent/90 transition-colors"
            >
              Join Now
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-secondary" />
              <span className="text-primary-foreground/80">Trusted by 5,000+ students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-primary-foreground/80">95% admission success rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              <span className="text-primary-foreground/80">10+ years of excellence</span>
            </div>
          </div>
        </div>

        {/* Right: Feature image */}
        <div className="relative">
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-primary/30">
            <Image
              src="/images/student.png"
              alt="Students learning at Dream Coaching"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
          </div>
          {/* Floating mini-stats card */}
          <div className="absolute -bottom-6 left-6 right-6 md:left-auto md:right-0 md:w-80 backdrop-blur bg-primary-foreground/10 text-primary-foreground border border-primary/30 rounded-2xl shadow-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-bold text-lg">18k+</div>
                <div className="text-xs opacity-90">Students</div>
              </div>
              <div>
                <div className="font-bold text-lg">27</div>
                <div className="text-xs opacity-90">Courses</div>
              </div>
              <div>
                <div className="font-bold text-lg">95%</div>
                <div className="text-xs opacity-90">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
