"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, Edit, Settings, LogOut, Heart, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage(): React.JSX.Element | null {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const getInitials = (): string => {
    if (user?.full_name) {
      const names = user.full_name.split(' ')
      if (names.length >= 2) {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
      }
      return user.full_name.charAt(0).toUpperCase()
    }
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    }
    return user?.phone_number?.charAt(0)?.toUpperCase() || "U"
  }

  const getDisplayName = (): string => {
    if (user?.full_name) {
      return user.full_name
    }
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return "User Profile"
  }

  const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return "Not provided"
    // Format phone number (assuming it's in format like "01712345678")
    if (phone.length === 11 && phone.startsWith("01")) {
      return `+880 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`
    }
    return phone
  }

  const handleLogout = (): void => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-800/10 dark:to-purple-800/10" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Manage your account information and settings</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-white cursor-pointer hover:text-white bg-orange-400/80 hover:bg-destructive">
              <LogOut className="h-4 w-4 " />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 border-4 border-blue-100 shadow-lg">
                    {user?.profile_image && (
                      <AvatarImage src={user.profile_image} alt={getDisplayName()} className="object-cover" />
                    )}
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-2xl font-bold">{getDisplayName()}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2 mt-2">
                      <Phone className="h-4 w-4" />
                      {formatPhoneNumber(user.phone_number)}
                    </CardDescription>
                    <Badge variant="outline" className="mt-3">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Account
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/profile/edit" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-6 w-6 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <label className="text-sm font-semibold text-blue-700 dark:text-blue-300">Full Name</label>
                      <p className="text-lg font-medium mt-1">{user?.full_name || getDisplayName()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <label className="text-sm font-semibold text-green-700 dark:text-green-300">Gender</label>
                      <div className="mt-1">
                        {user?.gender ? (
                          <Badge variant="secondary" className="capitalize bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            {user.gender}
                          </Badge>
                        ) : (
                          <p className="text-muted-foreground">Not provided</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg">
                      <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Email Address</label>
                      <p className="text-lg font-medium mt-1 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                      <label className="text-sm font-semibold text-orange-700 dark:text-orange-300">Date of Birth</label>
                      <p className="text-lg font-medium mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {user?.birth_date ? new Date(user.birth_date).toLocaleDateString() : "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Settings className="h-6 w-6 text-green-600" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" asChild className="h-auto p-4 justify-start">
                    <Link href="/change-password" className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Change Password</div>
                        <div className="text-xs text-muted-foreground">Update your security credentials</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="h-auto p-4 justify-start">
                    <Link href="/dashboard" className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Dashboard</div>
                        <div className="text-xs text-muted-foreground">Return to main dashboard</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                  <Heart className="h-6 w-6" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Your account is active and verified</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">All features are available</p>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}