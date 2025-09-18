"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  BookOpen, 
  Users,
  User,
  Clock,
  Star,
  Loader2,
  Upload,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { courseApi, instructorApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ProfessionalModal } from "@/components/ui/professional-modal"
import { StatsCard } from "@/components/ui/stats-card"
import ProtectedRoute from "@/components/ui/ProtectedRoute"
import AdminRoute from "@/components/ui/AdminRoute"
import Link from "next/link"
import Image from "next/image"

interface Course {
  id: string
  name: string
  short_description: string
  description: { classs: string } | string
  duration: number
  instructor_list: string[]
  image?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

interface Instructor {
  id: string
  description: {
    first: string
    Education?: string
  }
  title: string
}

interface CourseWithInstructors extends Course {
  instructorDetails: { name: string; subject: string; education: string }[]
}

export default function CoursesPage() {
  const { toast } = useToast()
  const [courses, setCourses] = useState<CourseWithInstructors[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courseImage, setCourseImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    duration: "",
    instructor_list: [] as string[],
    is_completed: false
  })
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([])
  const [instructorSearch, setInstructorSearch] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<CourseWithInstructors | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    duration: "",
    instructor_list: [] as string[],
    is_completed: false
  })
  const [editSelectedInstructors, setEditSelectedInstructors] = useState<string[]>([])
  const [editCourseImage, setEditCourseImage] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)
  const [editInstructorSearch, setEditInstructorSearch] = useState("")

  useEffect(() => {
    fetchCourses()
    fetchInstructors()
  }, [])

  const fetchCourses = async () => {
    try {
      const data = await courseApi.getCourses()
      
      // Fetch instructor details for each course
      const coursesWithInstructors = await Promise.all(
        data.map(async (course: Course) => {
          if (course.instructor_list && course.instructor_list.length > 0) {
            const instructorPromises = course.instructor_list.map(instructorId => 
              instructorApi.getSingleInstructor(instructorId).catch(() => null)
            )
            const instructorData = await Promise.all(instructorPromises)
            const instructorDetails = instructorData
              .filter(inst => inst !== null)
              .map(inst => ({
                name: inst.description?.first || 'Unknown',
                subject: inst.title || '',
                education: inst.description?.Education || ''
              }))
            return { ...course, instructorDetails }
          }
          return { ...course, instructorDetails: [] }
        })
      )
      
      setCourses(coursesWithInstructors)
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const fetchInstructors = async () => {
    try {
      const data = await instructorApi.getInstructors()
      setInstructors(data)
    } catch {
      setInstructors([])
    }
  }

  const filteredCourses = useMemo(() => 
    courses.filter(course =>
      course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.short_description?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [courses, searchTerm]
  )

  const filteredInstructors = useMemo(() => 
    instructors.filter(instructor => 
      instructor.description?.first?.toLowerCase().includes(instructorSearch.toLowerCase()) ||
      instructor.title?.toLowerCase().includes(instructorSearch.toLowerCase())
    ), [instructors, instructorSearch]
  )

  const courseStats = useMemo(() => ({
    total: courses.length,
    active: courses.filter(c => !c.is_completed).length,
    completed: courses.filter(c => c.is_completed).length,
    totalDuration: courses.reduce((acc, c) => acc + (c.duration || 0), 0)
  }), [courses])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCourseImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await courseApi.createCourse({
        ...formData,
        instructor_list: selectedInstructors,
        image: courseImage
      })
      
      toast({
        title: "Success!",
        description: "Course created successfully.",
      })
      setShowAddModal(false)
      resetForm()
      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      short_description: "",
      description: "",
      duration: "",
      instructor_list: [],
      is_completed: false
    })
    setSelectedInstructors([])
    setCourseImage(null)
    setImagePreview(null)
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateEditField = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEditCourse = (course: CourseWithInstructors) => {
    setEditingCourse(course)
    setEditFormData({
      name: course.name,
      short_description: course.short_description,
      description: typeof course.description === 'string' ? course.description : course.description?.classs || '',
      duration: course.duration.toString(),
      instructor_list: course.instructor_list,
      is_completed: course.is_completed
    })
    setEditSelectedInstructors(course.instructor_list || [])
    setEditImagePreview(course.image || null)
    setShowEditModal(true)
  }

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditCourseImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCourse) return
    
    setIsSubmitting(true)

    try {
      await courseApi.updateCourse(editingCourse.id, {
        ...editFormData,
        instructor_list: editSelectedInstructors,
        image: editCourseImage
      })
      
      toast({
        title: "Success!",
        description: "Course updated successfully.",
      })
      
      setShowEditModal(false)
      resetEditForm()
      fetchCourses()
    } catch (error: any) {
      const errorMsg = error.data ? Object.values(error.data).flat().join(', ') : error.message
      toast({
        title: "Error",
        description: errorMsg || "Failed to update course",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetEditForm = () => {
    setEditFormData({
      name: "",
      short_description: "",
      description: "",
      duration: "",
      instructor_list: [],
      is_completed: false
    })
    setEditSelectedInstructors([])
    setEditCourseImage(null)
    setEditImagePreview(null)
    setEditingCourse(null)
    setEditInstructorSearch("")
  }

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
              <p className="text-muted-foreground">Create and manage your courses</p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Courses"
              value={courseStats.total}
              icon={BookOpen}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Active Courses"
              value={courseStats.active}
              icon={Star}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Completed Courses"
              value={courseStats.completed}
              icon={Users}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Total Duration"
              value={`${courseStats.totalDuration}h`}
              icon={Clock}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <Card key={course.id} className={`group bg-gradient-to-br from-card to-card/80 border-0 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden ${index < 3 ? 'animate-fade-in' : index < 6 ? 'animate-fade-in-delay-1' : 'animate-fade-in-delay-2'}`}>
                  {/* Image Section */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-primary/60" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge 
                      className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium border-0 ${
                        course.is_completed 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-blue-500/90 text-white'
                      }`}
                    >
                      {course.is_completed ? 'Completed' : 'Active'}
                    </Badge>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-5 space-y-4">
                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg leading-tight line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.short_description || 'No description available'}
                      </p>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-primary/80">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{course.duration}h</span>
                      </div>
                      <div className="flex items-center gap-1 text-secondary/80">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{course.instructorDetails.length}</span>
                      </div>
                    </div>

                    {/* Instructors Preview */}
                    {course.instructorDetails.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {course.instructorDetails.slice(0, 3).map((_, idx) => (
                              <div key={idx} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background flex items-center justify-center">
                                <User className="w-3 h-3 text-primary/60" />
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">
                            {course.instructorDetails[0]?.name}
                            {course.instructorDetails.length > 1 && ` +${course.instructorDetails.length - 1}`}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        asChild 
                        className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 border-0 shadow-sm"
                      >
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditCourse(course)}
                        className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Courses Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchTerm ? 'No courses match your search criteria.' : 'Start building your course catalog by adding your first course.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-primary to-secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Course
                </Button>
              )}
            </div>
          )}

          {/* Add Course Modal */}
          <ProfessionalModal
            isOpen={showAddModal}
            onClose={() => {
              setShowAddModal(false)
              resetForm()
            }}
            title="Create New Course"
          >
            <form onSubmit={handleAddCourse} className="space-y-6">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-foreground mb-2">Course Information</h3>
                <p className="text-sm text-muted-foreground">Fill in the details for your new course.</p>
              </div>

              {/* Course Image */}
              <div className="space-y-3">
                <Label>Course Image</Label>
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="course-image"
                  />
                  <label
                    htmlFor="course-image"
                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Course Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g., Advanced React Development"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (hours) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                    placeholder="e.g., 40"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="short_description">Short Description *</Label>
                <Input
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => updateField("short_description", e.target.value)}
                  placeholder="Brief course overview"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="instructor_list">Instructors *</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search instructors..."
                    value={instructorSearch}
                    onChange={(e) => setInstructorSearch(e.target.value)}
                    className="text-sm"
                  />
                  <div className="border rounded-md p-2 max-h-32 overflow-y-auto bg-background scrollbar-hide">
                    {filteredInstructors.map((instructor) => (
                      <div key={instructor.id} className="flex items-center space-x-2 py-1 hover:bg-muted/50 rounded px-1">
                        <input
                          type="checkbox"
                          id={`instructor-${instructor.id}`}
                          checked={selectedInstructors.includes(instructor.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInstructors(prev => [...prev, instructor.id])
                            } else {
                              setSelectedInstructors(prev => prev.filter(id => id !== instructor.id))
                            }
                          }}
                          className="rounded"
                        />
                        <label 
                          htmlFor={`instructor-${instructor.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          <span className="font-medium">{instructor.description?.first}</span>
                          <span className="text-muted-foreground ml-1">- {instructor.title}</span>
                        </label>
                      </div>
                    ))}
                    {filteredInstructors.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-2">No instructors found</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {selectedInstructors.map((instructorId) => {
                      const instructor = instructors.find(i => i.id === instructorId)
                      return (
                        <Badge key={instructorId} variant="secondary" className="text-xs">
                          {instructor?.description?.first}
                          <button
                            type="button"
                            onClick={() => setSelectedInstructors(prev => prev.filter(id => id !== instructorId))}
                            className="ml-1 text-xs hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Detailed course description..."
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Course
                    </>
                  )}
                </Button>
              </div>
            </form>
          </ProfessionalModal>

          {/* Edit Course Modal */}
          <ProfessionalModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false)
              resetEditForm()
            }}
            title="Edit Course"
          >
            <form onSubmit={handleUpdateCourse} className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
              <div>
                <Label>Course Name *</Label>
                <Input
                  value={editFormData.name}
                  onChange={(e) => updateEditField('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label>Select Instructors</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search instructors..."
                    value={editInstructorSearch}
                    onChange={(e) => setEditInstructorSearch(e.target.value)}
                    className="text-sm"
                  />
                  <div className="border rounded-md p-2 max-h-32 overflow-y-auto bg-background scrollbar-hide">
                    {instructors
                      .filter(instructor => 
                        instructor.description?.first?.toLowerCase().includes(editInstructorSearch.toLowerCase()) ||
                        instructor.title?.toLowerCase().includes(editInstructorSearch.toLowerCase())
                      )
                      .map((instructor) => (
                        <div key={instructor.id} className="flex items-center space-x-2 py-1 hover:bg-muted/50 rounded px-1">
                          <input
                            type="checkbox"
                            id={`edit-instructor-${instructor.id}`}
                            checked={editSelectedInstructors.includes(instructor.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditSelectedInstructors(prev => [...prev, instructor.id])
                              } else {
                                setEditSelectedInstructors(prev => prev.filter(id => id !== instructor.id))
                              }
                            }}
                            className="rounded"
                          />
                          <label 
                            htmlFor={`edit-instructor-${instructor.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            <span className="font-medium">{instructor.description?.first}</span>
                            <span className="text-muted-foreground ml-1">- {instructor.title}</span>
                          </label>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {editSelectedInstructors.map((instructorId) => {
                      const instructor = instructors.find(i => i.id === instructorId)
                      return (
                        <Badge key={instructorId} variant="secondary" className="text-xs">
                          {instructor?.description?.first}
                          <button
                            type="button"
                            onClick={() => setEditSelectedInstructors(prev => prev.filter(id => id !== instructorId))}
                            className="ml-1 text-xs hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <Label>Short Description</Label>
                <Textarea
                  value={editFormData.short_description}
                  onChange={(e) => updateEditField('short_description', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={editFormData.description}
                  onChange={(e) => updateEditField('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Duration (hours)</Label>
                <Input
                  type="number"
                  value={editFormData.duration}
                  onChange={(e) => updateEditField('duration', e.target.value)}
                />
              </div>

              <div>
                <Label>Course Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                {editImagePreview && (
                  <div className="mt-2">
                    <Image
                      src={editImagePreview}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit_is_completed"
                  checked={editFormData.is_completed}
                  onChange={(e) => updateEditField('is_completed', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="edit_is_completed">Mark as completed</Label>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false)
                    resetEditForm()
                  }}
                  className="btn-touch flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="btn-touch flex-1 sm:flex-none">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {isSubmitting ? 'Updating...' : 'Update Course'}
                </Button>
              </div>
            </form>
          </ProfessionalModal>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  )
}