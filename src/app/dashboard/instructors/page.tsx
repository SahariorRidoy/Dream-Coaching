"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { 
  Plus, 
  Search, 
  Users, 
  Star,
  BookOpen,
  Loader2
} from "lucide-react"

import { instructorApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { InstructorSkeleton } from "@/components/ui/loading-skeleton"
import { instructorSchema } from "@/schemas/instructor"
import { ProfessionalModal } from "@/components/ui/professional-modal"
import { StatsCard } from "@/components/ui/stats-card"
import { InstructorCard } from "@/components/ui/instructor-card"

interface Instructor {
  id: string
  user: string
  title: string
  description: {
    first: string
    Education?: string
    Email?: string
    Mobile?: string
    Facebook?: string
    Youtube?: string
  }
  experience: number
  is_active: boolean
  created_at: string
  updated_at: string
}



export default function InstructorsPage() {
  const { toast } = useToast()
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const data = await instructorApi.getInstructors()
      setInstructors(data)
    } catch {
      setInstructors([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    first: "",
    education: "",
    facebook: "",
    youtube: "",
    experience: ""
  })

  const filteredInstructors = instructors.filter(instructor =>
    (instructor.description?.first?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (instructor.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      setInstructors(prev => prev.filter(instructor => instructor.id !== id))
    }
  }

  

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {

      
      const payload = {
        title: formData.title,
        description: {
          first: formData.first,
          Education: formData.education,
          Facebook: formData.facebook,
          Youtube: formData.youtube
        },
        experience: formData.experience
      }

      // Validate payload
      const validatedData = instructorSchema.parse(payload)
      await instructorApi.addInstructor(validatedData)
      
      toast({
        title: "Success!",
        description: "Instructor added successfully.",
      })
      setShowAddModal(false)
      setFormData({
        title: "",
        first: "",
        education: "",
        facebook: "",
        youtube: "",
        experience: ""
      })
      fetchInstructors() // Refresh the list
    } catch (error: any) {
      console.error("Error adding instructor:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add instructor",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Instructors</h1>
          <p className="text-muted-foreground">Add, edit, and manage your teaching staff</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Instructor
        </Button>
      </div>

      {/* Professional Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Instructors"
          value={instructors.filter(i => i.is_active).length}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Courses"
          value={instructors.length * 3}
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Enrolled Students"
          value={`${(instructors.length * 125).toLocaleString()}+`}
          icon={Users}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value="94.2%"
          icon={Star}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>
      {/* Section Header */}
      <div className="text-center space-y-2 py-8">
        <h2 className="text-3xl font-bold text-foreground">Faculty Management</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your teaching staff, track performance, and maintain quality education standards
        </p>
      </div>
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      

      {/* Instructors Grid */}
      {loading ? (
        <InstructorSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors.map((instructor, index) => (
          <InstructorCard
            key={instructor.id}
            instructor={instructor}
            onViewDetails={(id) => window.location.href = `/dashboard/instructors/${id}`}
            onDelete={handleDelete}
            index={index}
          />
        ))}
        </div>
      )}

      {!loading && filteredInstructors.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Faculty Members Found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchTerm ? 'No instructors match your search criteria. Try different keywords.' : 'Start building your teaching team by adding qualified instructors.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add First Instructor
            </Button>
          )}
        </div>
      )}

      {/* Professional Add Instructor Modal */}
      <ProfessionalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Faculty Member"
      >
              <form onSubmit={handleAddInstructor} className="space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Faculty Information</h3>
                  <p className="text-sm text-muted-foreground">Please provide accurate information for the new faculty member.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title/Subject *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="e.g., ICT Teacher"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience (years) *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => updateField("experience", e.target.value)}
                      placeholder="e.g., 3"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="first">Name *</Label>
                  <Input
                    id="first"
                    value={formData.first}
                    onChange={(e) => updateField("first", e.target.value)}
                    placeholder="e.g., Ridoy"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education *</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => updateField("education", e.target.value)}
                    placeholder="e.g., BUBT"
                    required
                    disabled={isSubmitting}
                  />
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => updateField("facebook", e.target.value)}
                      placeholder="www.facebook.com/profile"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => updateField("youtube", e.target.value)}
                      placeholder="youtube.com/channel"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
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
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Instructor
                      </>
                    )}
                  </Button>
                </div>
              </form>
      </ProfessionalModal>
    </div>
  )
}