"use client";

import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary to-primary/85 py-12 sm:py-16 md:py-20 lg:py-24 text-primary-foreground">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
            For Class 6–12 & University Admission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-primary-foreground mb-4 leading-tight">
            Empowering Students to Ace Exams and Admissions
          </h1>
          <p className="text-base sm:text-lg text-primary-foreground/80 mb-6 max-w-xl mx-auto lg:mx-0">
            Personalized coaching, expert instructors, and proven results to help you achieve academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center lg:justify-start">
            <a
              href="courses"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              Explore Courses
            </a>
            <a
              href="contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold shadow hover:bg-accent/90 transition-colors text-sm sm:text-base"
            >
              Join Now
            </a>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
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
        <div className="relative order-first lg:order-last">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-primary/30">
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
          <div className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-0 lg:w-72 xl:w-80 backdrop-blur bg-primary-foreground/10 text-primary-foreground border border-primary/30 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div>
                <div className="font-bold text-base sm:text-lg">18k+</div>
                <div className="text-xs opacity-90">Students</div>
              </div>
              <div>
                <div className="font-bold text-base sm:text-lg">27</div>
                <div className="text-xs opacity-90">Courses</div>
              </div>
              <div>
                <div className="font-bold text-base sm:text-lg">95%</div>
                <div className="text-xs opacity-90">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
