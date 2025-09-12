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
import { ArrowLeft, Phone, CheckCircle, Shield, KeyRound, Send, Mail } from "lucide-react"
import Link from "next/link"

interface ForgotPasswordData {
  phone_number: string
}

export default function ForgotPasswordPage(): React.JSX.Element {
  const [smsSent, setSmsSent] = useState<boolean>(false)
  const [sentPhone, setSentPhone] = useState<string>("")
  const router = useRouter()
  const { forgetPassword, error, loading } = useAuth()
  const { formData, errors, isSubmitting, updateField, handleSubmit } = useAuthForm()

  const onSubmit = async (data: ForgotPasswordData): Promise<void> => {
    await forgetPassword(data.phone_number)
    setSentPhone(data.phone_number)
    setSmsSent(true)
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await handleSubmit(onSubmit, ["phone_number"], {
      phone_number: { required: true },
    })
  }

  if (smsSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Success Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                    Dream Coaching
                  </h1>
                  <p className="text-xs text-muted-foreground">SMS Code Sent</p>
                </div>
              </div>
            </div>

            <Card className="backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
              
              <CardHeader className="text-center pb-6 pt-8 px-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30">
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Check Your Phone
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  We&apos;ve sent a password reset code to
                  <br />
                  <span className="font-semibold text-foreground">{sentPhone}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Next Steps:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Check your SMS messages</li>
                        <li>• Enter the 6-digit code on the next page</li>
                        <li>• Create your new secure password</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => router.push(`/reset-password?phone_number=${encodeURIComponent(sentPhone)}`)}
                  className="w-full h-12 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Continue to Reset Password
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <KeyRound className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                  Dream Coaching
                </h1>
                <p className="text-xs text-muted-foreground">Password Recovery</p>
              </div>
            </div>
          </div>

          {/* Forgot Password Card */}
          <Card className="backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
            
            <CardHeader className="text-center pb-6 pt-8 px-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                No worries! Enter your phone number and we&apos;ll send you a reset code
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
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="Enter your registered phone number"
                      value={(formData as any).phone_number || ""}
                      onChange={(e) => updateField("phone_number", e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-accent focus:bg-background transition-all duration-200 rounded-xl"
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

                {/* Security Notice */}
                <div className="bg-muted/30 rounded-xl p-4 text-xs text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Shield className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />
                    We&apos;ll send a secure 6-digit code to your phone via SMS. This code expires in 10 minutes for your security.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending Code...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Reset Code
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground">Remember your password?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact our support team at{" "}
              <span className="text-accent font-medium">support@dreamcoaching.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
