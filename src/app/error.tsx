"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-destructive/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Error Icon Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
              <AlertTriangle className="w-12 h-12 text-destructive animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-destructive rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-destructive/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-muted-foreground">
              We encountered an unexpected error. Don&apos;t worry, our team has been notified.
            </p>
          </div>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-muted/30 rounded-xl p-4 text-left max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Development Error</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              onClick={reset}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="bg-muted/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If this error persists, please contact our support team with the error details.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/contact'}
                  className="text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                >
                  Contact Support
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.history.back()}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 left-1/4 w-2 h-2 bg-destructive rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-10 right-1/4 w-3 h-3 bg-destructive/60 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}