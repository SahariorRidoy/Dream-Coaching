"use client"

import React, { useState } from 'react';
//import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthForm } from '@/hooks/useAuthForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Phone, Lock, UserPlus, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface RegisterData {
  phone_number: string
  password: string
}

export default function RegisterPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [registrationPhone, setRegistrationPhone] = useState<string>('');
  // const router = useRouter();
  const { register, error, loading } = useAuth();
  const { formData, errors, isSubmitting, updateField, handleSubmit } = useAuthForm();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterData): Promise<void> => {
    try {
      const response = await register(data.phone_number, data.password);
      // Registration successful - response processed
      
      // Store registration response in localStorage for verify page
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('registration_response', JSON.stringify(response));
          localStorage.setItem('registration_phone', data.phone_number);
        } catch {
          // Handle localStorage quota exceeded or unavailable
          console.warn('Failed to store registration data locally');
        }
      }
      
      // setRegistrationPhone(data.phone_number);
      
      // Force redirect to verify OTP page
      const verifyUrl = `/verify-otp?phone_number=${encodeURIComponent(data.phone_number)}`;
      // Redirecting to OTP verification
      
      toast({
        title: "Account Created!",
        description: "Please check your phone for the OTP verification code.",
      });
      
      // Use window.location for guaranteed redirect
      window.location.href = verifyUrl;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await handleSubmit(onSubmit, ['phone_number', 'password'], {
      phone_number: { required: true },
      password: { required: true, minLength: 6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                  Dream Coaching
                </h1>
                <p className="text-xs text-muted-foreground">Join Our Learning Community</p>
              </div>
            </div>
          </div>

          {/* Register Card */}
          <Card className="backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
            
            <CardHeader className="text-center pb-6 pt-8 px-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Create Account
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Start your learning journey with Dream Coaching
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
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={(formData as any).phone_number || ''}
                      onChange={(e) => updateField('phone_number', e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all duration-200 rounded-xl"
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
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={(formData as any).password || ''}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all duration-200 rounded-xl"
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
                  <div className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long
                  </div>
                </div>

                {/* Terms & Privacy */}
                <div className="bg-muted/30 rounded-xl p-4 text-xs text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Shield className="w-3 h-3 mt-0.5 text-secondary flex-shrink-0" />
                    By creating an account, you agree to our Terms of Service and Privacy Policy. Your data is secure and encrypted.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create My Account
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
                    <span className="bg-card px-4 text-muted-foreground">Already have an account?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-semibold transition-colors"
                  >
                    Sign in to your account
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Benefits Section */}
          <div className="mt-6 text-center">
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Free Access</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Expert Teachers</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
