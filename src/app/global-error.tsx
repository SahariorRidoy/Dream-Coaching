"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            {/* Critical Error Icon */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Critical Error
              </h1>
              
              <p className="text-xl text-slate-300 max-w-md mx-auto">
                Dream Coaching encountered a critical error. We&apos;re working to fix this issue.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button 
                  onClick={reset}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Reload Application
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Start Fresh
                </Button>
              </div>

              {/* Error ID */}
              {error.digest && (
                <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-400">
                    Error Reference: <span className="font-mono text-slate-300">{error.digest}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}