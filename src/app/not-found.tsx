"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, BookOpen, ArrowLeft, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track to your learning journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/courses">
              <Button variant="outline" className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Popular destinations:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/courses", label: "All Courses" },
                { href: "/about-us", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Login" }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 left-1/4 w-4 h-4 bg-accent rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 right-1/4 w-3 h-3 bg-secondary rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  )
}