"use client"

import React from "react"
import ProtectedRoute from "@/components/ui/ProtectedRoute"
import Navigation from "@/components/ui/Navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  Mail, 
  Phone, 
  Settings, 
  Edit, 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Star,
  GraduationCap,
  ChevronRight,
  Bell,
  BarChart3,
  UserCheck,
  BookMarked,
  Trophy
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalStudents?: number
  totalCourses?: number
  completedLessons?: number
  upcomingClasses?: number
  progress?: number
  rank?: number
}

export default function DashboardPage(): React.JSX.Element {
  const { user } = useAuth()
  
  // Mock data - replace with actual API calls
  const isAdmin = (user as any)?.role === 'admin' || 
                  (user as any)?.user_type === 'admin' || 
                  user?.phone_number === '01700000000' // Default admin phone
  
  const stats: DashboardStats = isAdmin ? {
    totalStudents: 156,
    totalCourses: 12,
    completedLessons: 89,
    upcomingClasses: 8
  } : {
    completedLessons: 24,
    upcomingClasses: 3,
    progress: 68,
    rank: 15
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
    return user?.phone_number || "User"
  }

  const recentActivities = [
    { id: 1, action: "Completed Mathematics Quiz", time: "2 hours ago", type: "achievement" },
    { id: 2, action: "Joined Physics Class", time: "1 day ago", type: "class" },
    { id: 3, action: "Submitted Assignment", time: "2 days ago", type: "assignment" }
  ]

  const upcomingClasses = [
    { id: 1, subject: "Advanced Mathematics", time: "Today, 2:00 PM", instructor: "Dr. Smith" },
    { id: 2, subject: "Physics Lab", time: "Tomorrow, 10:00 AM", instructor: "Prof. Johnson" },
    { id: 3, subject: "Chemistry", time: "Wed, 3:00 PM", instructor: "Dr. Brown" }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navigation />

        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome back, {getDisplayName()}!
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {isAdmin ? "Manage your coaching center from your admin dashboard" : "Continue your learning journey"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={isAdmin ? "default" : "secondary"} className="px-3 py-1">
                  {isAdmin ? "Administrator" : "Student"}
                </Badge>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isAdmin ? (
              <>
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Students</p>
                        <p className="text-3xl font-bold">{stats.totalStudents}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Active Courses</p>
                        <p className="text-3xl font-bold">{stats.totalCourses}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Lessons Completed</p>
                        <p className="text-3xl font-bold">{stats.completedLessons}</p>
                      </div>
                      <Award className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Upcoming Classes</p>
                        <p className="text-3xl font-bold">{stats.upcomingClasses}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm font-medium">Lessons Completed</p>
                        <p className="text-3xl font-bold">{stats.completedLessons}</p>
                      </div>
                      <BookMarked className="h-8 w-8 text-indigo-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm font-medium">Overall Progress</p>
                        <p className="text-3xl font-bold">{stats.progress}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-emerald-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100 text-sm font-medium">Class Rank</p>
                        <p className="text-3xl font-bold">#{stats.rank}</p>
                      </div>
                      <Trophy className="h-8 w-8 text-amber-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-rose-100 text-sm font-medium">Upcoming Classes</p>
                        <p className="text-3xl font-bold">{stats.upcomingClasses}</p>
                      </div>
                      <Clock className="h-8 w-8 text-rose-200" />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    {isAdmin ? "Admin Actions" : "Quick Actions"}
                  </CardTitle>
                  <CardDescription>
                    {isAdmin ? "Manage your coaching center" : "Continue your learning journey"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {isAdmin ? (
                      <>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" asChild>
                          <Link href="/admin/students" className="flex items-center gap-3">
                            <UserCheck className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Manage Students</div>
                              <div className="text-xs text-blue-100">View and manage student accounts</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" asChild>
                          <Link href="/admin/courses" className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Manage Courses</div>
                              <div className="text-xs text-green-100">Create and edit courses</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" asChild>
                          <Link href="/admin/schedule" className="flex items-center gap-3">
                            <Calendar className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Class Schedule</div>
                              <div className="text-xs text-purple-100">Manage class timetables</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" asChild>
                          <Link href="/admin/analytics" className="flex items-center gap-3">
                            <BarChart3 className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Analytics</div>
                              <div className="text-xs text-orange-100">View performance reports</div>
                            </div>
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" asChild>
                          <Link href="/student/courses" className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">My Courses</div>
                              <div className="text-xs text-indigo-100">Continue learning</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700" asChild>
                          <Link href="/student/assignments" className="flex items-center gap-3">
                            <Edit className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Assignments</div>
                              <div className="text-xs text-emerald-100">Submit your work</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" asChild>
                          <Link href="/student/schedule" className="flex items-center gap-3">
                            <Calendar className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Class Schedule</div>
                              <div className="text-xs text-amber-100">View your timetable</div>
                            </div>
                          </Link>
                        </Button>
                        <Button className="h-auto p-4 justify-start bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700" asChild>
                          <Link href="/student/progress" className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">My Progress</div>
                              <div className="text-xs text-rose-100">Track your performance</div>
                            </div>
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest actions and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'achievement' ? 'bg-green-100 text-green-600' :
                          activity.type === 'class' ? 'bg-blue-100 text-blue-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {activity.type === 'achievement' ? <Award className="h-4 w-4" /> :
                           activity.type === 'class' ? <GraduationCap className="h-4 w-4" /> :
                           <Edit className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16 border-4 border-blue-100">
                      {user?.profile_image && (
                        <AvatarImage src={user.profile_image} alt={getDisplayName()} />
                      )}
                      <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{getDisplayName()}</h3>
                      <p className="text-sm text-muted-foreground">{user?.phone_number}</p>
                      <Badge variant="outline" className="mt-1">
                        {isAdmin ? "Administrator" : "Student"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile">
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Classes */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingClasses.slice(0, 3).map((classItem) => (
                      <div key={classItem.id} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800">
                        <h4 className="font-medium text-sm">{classItem.subject}</h4>
                        <p className="text-xs text-muted-foreground">{classItem.time}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">{classItem.instructor}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={isAdmin ? "/admin/schedule" : "/student/schedule"}>
                        View All Classes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {!isAdmin && (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Star className="h-5 w-5" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span className="font-medium">{stats.progress}%</span>
                        </div>
                        <Progress value={stats.progress} className="h-2" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Keep up the great work!</p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                          <Link href="/student/courses">
                            Continue Learning
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
