"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Edit, 
  Clock,
  User,
  BookOpen,
  Calendar,
  Loader2
} from "lucide-react"
import { courseApi, instructorApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import ProtectedRoute from "@/components/ui/ProtectedRoute"
import AdminRoute from "@/components/ui/AdminRoute"
import { EditCourseModal } from "@/components/ui/EditCourseModal"
import Image from "next/image"

interface Course {
  id: string
  name: string
  short_description: string
  description: { class: string } | string
  duration: number
  instructor_list: string[]
  image?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

interface Instructor {
  id: string
  name: string
  education?: string
  subject: string
}

export default function CourseDetailsPage() {
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCourse(params.id as string)
    }
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCourse = async (id: string) => {
    try {
      const data = await courseApi.getSingleCourse(id)
      setCourse(data)
      
      if (data.instructor_list && data.instructor_list.length > 0) {
        const instructorResults = await Promise.allSettled(
          data.instructor_list.map((instructorId: string) => 
            instructorApi.getSingleInstructor(instructorId)
          )
        )
        const formattedInstructors = instructorResults
          .filter(result => result.status === 'fulfilled')
          .map(result => {
            const inst = (result as PromiseFulfilledResult<any>).value
            return {
              id: inst.id,
              name: inst.description?.first || 'Unknown',
              education: inst.description?.Education || '',
              subject: inst.title || ''
            }
          })

        setInstructors(formattedInstructors)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast({
        title: "Error",
        description: "Failed to load course details",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!course) return
    
    setUpdatingStatus(true)
    try {
      await courseApi.updateCourse(course.id, {
        is_completed: !course.is_completed
      })
      setCourse(prev => prev ? {...prev, is_completed: !prev.is_completed} : null)
      toast({
        title: "Success!",
        description: `Course marked as ${!course.is_completed ? 'completed' : 'active'}.`
      })
    } catch (error) {
      console.error('Failed to update course status:', error)
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive"
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminRoute>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading course details...</p>
            </div>
          </div>
        </AdminRoute>
      </ProtectedRoute>
    )
  }

  if (!course) {
    return (
      <ProtectedRoute>
        <AdminRoute>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h2>
              <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist.</p>
              <Button onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </AdminRoute>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="min-h-screen bg-background">
          <div className="container-responsive mx-auto py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="mb-6 hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-foreground">{course.name}</h1>
                    <Badge variant={course.is_completed ? "secondary" : "default"}>
                      {course.is_completed ? "Completed" : "Active"}
                    </Badge>
                  </div>
                  {course.short_description && (
                    <p className="text-lg text-muted-foreground mb-6">{course.short_description}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Course Image */}
                {course.image && (
                  <Card>
                    <CardContent className="p-0">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Course Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Course Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {typeof course.description === 'object' && course.description.class 
                          ? `Class: ${course.description.class}` 
                          : String(course.description)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Instructors */}
                {instructors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Instructors ({instructors.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {instructors.map((instructor) => (
                          <div key={instructor.id} className="p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-sm text-foreground truncate">{instructor.name}</h4>
                                <p className="text-xs text-primary font-medium">{instructor.subject}</p>
                                {instructor.education && (
                                  <p className="text-xs text-muted-foreground truncate">Education: {instructor.education}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Course Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Duration</span>
                      </div>
                      <span className="font-semibold">{course.duration} hours</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Instructors</span>
                      </div>
                      <span className="font-semibold">{instructors.length}</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Created</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {new Date(course.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Updated</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {new Date(course.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowEditModal(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Course
                    </Button>
                    
                    <Button 
                      variant={course.is_completed ? "secondary" : "default"}
                      className="w-full btn-touch"
                      onClick={handleStatusUpdate}
                      disabled={updatingStatus}
                    >
                      {updatingStatus ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      {course.is_completed ? 'Mark as Active' : 'Mark as Completed'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <EditCourseModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            course={course}
            onSuccess={() => {
              if (params.id) {
                fetchCourse(params.id as string)
              }
            }}
          />
        </div>
      </AdminRoute>
    </ProtectedRoute>
  )
}