"use client";

import React, { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

export default function VerifyOtpPage(): React.JSX.Element | null {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [, setRegistrationResponse] = useState<any>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone_number = searchParams.get("phone_number")
  const { verifyOtp, register, error, loading, clearError } = useAuth()

  // Load registration response from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedResponse = localStorage.getItem('registration_response')
      if (storedResponse) {
        try {
          const response = JSON.parse(storedResponse)
          setRegistrationResponse(response)
          console.log('Loaded registration response:', response)
        } catch (e) {
          console.error('Failed to parse registration response:', e)
        }
      }
    }
  }, [])

  // Remove the redirect - allow access to verify OTP page
  // useEffect(() => {
  //   if (!phone_number) {
  //     router.push("/register")
  //   }
  // }, [phone_number, router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await verifyOtp(phone_number!, otpString)
      console.log('OTP Verification Response:', response)
      
      // Clear registration data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('registration_response')
        localStorage.removeItem('registration_phone')
      }
      
      // Redirect to profile completion
      router.push("/complete-profile")
    } catch {
      // Error handled by auth context
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async (): Promise<void> => {
    if (countdown > 0) return

    try {
      // Extract password from previous registration (in real app, you might handle this differently)
      await register(phone_number!, "resend") // This would need to be handled by your API
      setCountdown(60)
      setOtp(["", "", "", "", "", ""])
    } catch {
      // Error handled by auth context
    }
  }

  // Allow access even without phone_number for testing
  // if (!phone_number) {
  //   return null
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">{phone_number || 'your phone'}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

           

            <div className="space-y-2">
              <Label>Enter verification code</Label>
              <div className="flex gap-2 justify-center">
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
                    className="w-12 h-12 text-center text-lg font-semibold"
                    disabled={isSubmitting || loading}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || loading || otp.join("").length !== 6}>
              {isSubmitting || loading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
              <Button
                variant="link"
                onClick={handleResendOtp}
                disabled={countdown > 0}
                className="p-0 h-auto font-medium"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Link
                href="/register"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to registration
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}