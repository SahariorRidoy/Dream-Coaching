"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useAuthForm } from "@/hooks/useAuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, Phone, Save, Mail, Calendar, Upload, Camera, Edit, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface ProfileData {
  full_name: string
  email: string
  phone_number: string
  gender: string
  birth_date: string
}

export default function EditProfilePage(): React.JSX.Element | null {

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { user, updateProfile, error, loading } = useAuth()
  const { formData, errors, isSubmitting, updateField, handleSubmit } = useAuthForm()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      updateField("full_name", user.full_name || (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : ""))
      updateField("email", user.email || "")
      updateField("phone_number", user.phone_number || "")
      updateField("gender", (user as any).gender || "")
      updateField("birth_date", (user as any).birth_date || "")
      
      // Set existing profile image preview
      if (user.profile_image) {
        setImagePreview(user.profile_image)
      }
    }
  }, [user, updateField])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (): string => {
    if (user?.full_name) {
      const names = user.full_name.split(' ')
      if (names.length >= 2) {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
      }
      return user.full_name.charAt(0).toUpperCase()
    }
    return user?.phone_number?.charAt(0)?.toUpperCase() || "U"
  }

  const onSubmit = async (data: ProfileData): Promise<void> => {
    // Exclude phone_number from update - it's not editable
    const profileData = {
      full_name: data.full_name?.trim() || "",
      email: data.email?.trim() || "",
      gender: data.gender || "",
      birth_date: data.birth_date || "",
    }

    await updateProfile(profileData, profileImage)
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved successfully.",
    })
    router.push("/profile")
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await handleSubmit(onSubmit, ["full_name", "email", "gender", "birth_date"], {
        full_name: { required: true },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
      })
    } catch {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    }
  }

  // const validatePhoneNumber = (phone?: string): boolean => {
  //   if (!phone) return true
  //   const phoneRegex = /^01[3-9]\d{8}$/
  //   return phoneRegex.test(phone)
  // }



  if (!user) {
    return null
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
              href="/profile"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Update your personal information and settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="h-5 w-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-blue-100 shadow-lg">
                    {imagePreview && (
                      <AvatarImage src={imagePreview} alt="Profile" className="object-cover" />
                    )}
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-full shadow-lg">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image"
                  />
                  <label
                    htmlFor="profile-image"
                    className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose New Photo
                  </label>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    JPG, PNG or GIF (max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-6 w-6 text-blue-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your profile details below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                      <AlertDescription className="font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label htmlFor="full_name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Full Name
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                        <Input
                          id="full_name"
                          type="text"
                          placeholder="Enter your full name"
                          value={(formData as any).full_name || ""}
                          onChange={(e) => updateField("full_name", e.target.value)}
                          className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-200"
                          disabled={isSubmitting || loading}
                        />
                      </div>
                      {(errors as any).full_name && (
                        <p className="text-sm text-red-600 dark:text-red-400">{(errors as any).full_name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={(formData as any).email || ""}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-200"
                            disabled={isSubmitting || loading}
                          />
                        </div>
                        {(errors as any).email && (
                          <p className="text-sm text-red-600 dark:text-red-400">{(errors as any).email}</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="phone_number" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Phone Number
                        </Label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone_number"
                            type="tel"
                            value={user?.phone_number || ""}
                            className="pl-10 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            disabled={true}
                            readOnly={true}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Phone number cannot be changed for security reasons
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Gender
                        </Label>
                        <Select
                          value={(formData as any).gender || ""}
                          onValueChange={(value) => updateField("gender", value)}
                          disabled={isSubmitting || loading}
                        >
                          <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {(errors as any).gender && (
                          <p className="text-sm text-red-600 dark:text-red-400">{(errors as any).gender}</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="birth_date" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Date of Birth
                        </Label>
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="birth_date"
                            type="date"
                            value={(formData as any).birth_date || ""}
                            onChange={(e) => updateField("birth_date", e.target.value)}
                            min={new Date(new Date().getFullYear() - 80, 0, 1).toISOString().split('T')[0]}
                            max={new Date(new Date().getFullYear() - 10, 11, 31).toISOString().split('T')[0]}
                            className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-200"
                            disabled={isSubmitting || loading}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Age must be between 10 and 80 years</p>
                        {(errors as any).birth_date && (
                          <p className="text-sm text-red-600 dark:text-red-400">{(errors as any).birth_date}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || loading} 
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isSubmitting || loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" asChild className="flex-1 h-12">
                      <Link href="/profile">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
