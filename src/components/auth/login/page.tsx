"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useAuthForm } from "@/hooks/useAuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Phone, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface LoginData {
  phone_number: string
  password: string
}

export default function LoginPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  const { login, error, loading } = useAuth()
  const { formData, errors, isSubmitting, updateField, handleSubmit } = useAuthForm()
  const { toast } = useToast()



  const onSubmit = async (data: LoginData): Promise<void> => {
    try {
      await login(data.phone_number, data.password)
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to your account.",
      })
      router.push("/dashboard")
    } catch {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await handleSubmit(onSubmit, ["phone_number", "password"], {
      phone_number: { required: true },
      password: { required: true },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Dream Coaching
                </h1>
                <p className="text-xs text-muted-foreground">Excellence in Education</p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            
            <CardHeader className="text-center pb-6 pt-8 px-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to access your learning dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="border-destructive/20 bg-destructive/10">
                    <AlertDescription className="text-destructive">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label htmlFor="phone_number" className="text-foreground font-medium">
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={(formData as any).phone_number || ""}
                      onChange={(e) => updateField("phone_number", e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-200 rounded-xl"
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  {(errors as any).phone_number && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 bg-destructive rounded-full" />
                      {(errors as any).phone_number}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={(formData as any).password || ""}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-200 rounded-xl"
                      disabled={isSubmitting || loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting || loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {(errors as any).password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 bg-destructive rounded-full" />
                      {(errors as any).password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground">New to Dream Coaching?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Create your account
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Trust Indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
