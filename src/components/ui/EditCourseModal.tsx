"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { courseApi, instructorApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ProfessionalModal } from "@/components/ui/professional-modal"
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
}

interface Instructor {
  id: string
  description: {
    first: string
    Education?: string
  }
  title: string
}

interface EditCourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
  onSuccess: () => void
}

export function EditCourseModal({ isOpen, onClose, course, onSuccess }: EditCourseModalProps) {
  const { toast } = useToast()
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [instructorSearch, setInstructorSearch] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    duration: "",
    instructor_list: [] as string[],
    is_completed: false
  })
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([])
  const [courseImage, setCourseImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchInstructors()
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        name: course.name,
        short_description: course.short_description,
        description: typeof course.description === 'string' ? course.description : course.description?.class || '',
        duration: course.duration.toString(),
        instructor_list: course.instructor_list,
        is_completed: course.is_completed
      })
      setSelectedInstructors(course.instructor_list || [])
      setImagePreview(course.image || null)
    }
  }, [course, isOpen])

  const fetchInstructors = async () => {
    try {
      const data = await instructorApi.getInstructors()
      setInstructors(data)
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
      toast({
        title: "Warning",
        description: "Failed to load instructors for editing.",
        variant: "destructive"
      })
      setInstructors([])
    }
  }

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

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    
    setIsSubmitting(true)

    try {
      await courseApi.updateCourse(course.id, {
        ...formData,
        instructor_list: selectedInstructors,
        image: courseImage
      })
      
      toast({
        title: "Success!",
        description: "Course updated successfully.",
      })
      
      onSuccess()
      onClose()
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
    setInstructorSearch("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <ProfessionalModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Course"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
        <div>
          <Label>Course Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label>Select Instructors</Label>
          <div className="space-y-2">
            <Input
              placeholder="Search instructors..."
              value={instructorSearch}
              onChange={(e) => setInstructorSearch(e.target.value)}
              className="text-sm"
            />
            <div className="border rounded-md p-2 max-h-32 overflow-y-auto bg-background scrollbar-hide">
              {instructors
                .filter(instructor => 
                  instructor.description?.first?.toLowerCase().includes(instructorSearch.toLowerCase()) ||
                  instructor.title?.toLowerCase().includes(instructorSearch.toLowerCase())
                )
                .map((instructor) => (
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
                ))
              }
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
          <Label>Short Description</Label>
          <Textarea
            value={formData.short_description}
            onChange={(e) => updateField('short_description', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label>Duration (hours)</Label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) => updateField('duration', e.target.value)}
          />
        </div>

        <div>
          <Label>Course Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
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
            id="is_completed"
            checked={formData.is_completed}
            onChange={(e) => updateField('is_completed', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="is_completed">Mark as completed</Label>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose} className="btn-touch flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="btn-touch flex-1 sm:flex-none">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isSubmitting ? 'Updating...' : 'Update Course'}
          </Button>
        </div>
      </form>
    </ProfessionalModal>
  )
}