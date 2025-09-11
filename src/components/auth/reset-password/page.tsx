"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useAuthForm } from "@/hooks/useAuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Lock, Shield, KeyRound, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface ResetPasswordData {
  password: string
  confirmPassword: string
}

export default function ResetPasswordPage(): React.JSX.Element | null {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone_number = searchParams.get("phone_number")
  const { resetPassword, error, loading, clearError } = useAuth()
  const { formData, errors, isSubmitting, updateField, handleSubmit } = useAuthForm()

  useEffect(() => {
    if (!phone_number) {
      router.push("/forgot-password")
    }
  }, [phone_number, router])

  const handleOtpChange = (index: number, value: string): void => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    clearError()

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit = async (data: ResetPasswordData): Promise<void> => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      throw new Error("Please enter the complete 6-digit code")
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match")
    }

    await resetPassword(phone_number!, otpString, data.password)
    router.push("/login")
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await handleSubmit(onSubmit, ["password", "confirmPassword"], {
      password: { required: true, minLength: 6 },
      confirmPassword: { required: true },
    })
  }

  if (!phone_number) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <KeyRound className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Dream Coaching
                </h1>
                <p className="text-xs text-muted-foreground">Secure Password Reset</p>
              </div>
            </div>
          </div>

          {/* Reset Password Card */}
          <Card className="backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            
            <CardHeader className="text-center pb-6 pt-8 px-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Reset Password
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter the 6-digit code sent to
                <br />
                <span className="font-semibold text-foreground">{phone_number}</span>
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
                  <Label className="text-foreground font-medium">Verification Code</Label>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-xl font-bold bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-200 rounded-xl"
                        disabled={isSubmitting || loading}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Code expires in 10 minutes
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    New Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirm New Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={(formData as any).confirmPassword || ""}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-200 rounded-xl"
                      disabled={isSubmitting || loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50 rounded-lg"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSubmitting || loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {(errors as any).confirmPassword && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 bg-destructive rounded-full" />
                      {(errors as any).confirmPassword}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-muted/30 rounded-xl p-4 text-xs text-muted-foreground">
                  <p className="flex items-start gap-2 mb-2">
                    <Shield className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Password Requirements:</span>
                  </p>
                  <ul className="space-y-1 ml-5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-secondary" />
                      At least 6 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-secondary" />
                      Both passwords must match
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                  disabled={isSubmitting || loading || otp.join("").length !== 6}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Resetting Password...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      Reset My Password
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
                    <span className="bg-card px-4 text-muted-foreground">Need help?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to forgot password
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Your password will be encrypted and stored securely
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
